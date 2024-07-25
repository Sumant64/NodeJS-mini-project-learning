const User = require("../../models/userModel");


// @desc - save a new user
// @res - POST - /api/user
// @access - Public
const postUser = async(req, res) => {
    try{
        const keys = Object.keys(req.body);
        const allowedKeys = ["name", "password", "age", "email"];
        const isValidOperation = allowedKeys.every((key) => keys.includes(key));

        if(!isValidOperation){
            let missingKey = allowedKeys.filter((item) => !keys.includes(item));
            return res.status(400).send({message: `${missingKey.toString()} keys are missing`})
        }

        let obj = new User(req.body);
        const result = await obj.save();

        res.status(201).send({message: "Successfully saved the user.", result: result})

    } catch(err) {
        console.log(err);
        res.status(400).send({message: "Something went wrong!"})
    }
}

module.exports = postUser;