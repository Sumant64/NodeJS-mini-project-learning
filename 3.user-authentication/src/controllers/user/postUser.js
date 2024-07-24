const User = require("../../models/userModel");



// @desc - post the new user
// @route - POST- api/user/
// @access - Admin
const postUser = async(req, res) => {
    try{
        const keys = Object.keys(req.body);
        const allowedKeys = ["name", "email", "password", "age"];
        const isValidOperation = allowedKeys.every((key) => keys.includes(key));
        let result ;

        if(!isValidOperation) {
            let missingKey = allowedKeys.filter((item) => {
                return !keys.includes(item);
            });

            return res.status(400).send({message: `${missingKey.toString()} keys are missing`})
        } else {
            let obj = new User(req.body);
            result = await obj.save();
        }
        res.status(201).send({ message: "User added successfully", result: result })

    } catch(err) {
        console.log(err);
        res.status(400).send({message: "Something went wrong.", error: err});
    }
}

module.exports = postUser;