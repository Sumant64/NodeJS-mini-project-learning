const User = require("../../models/userModel");


// @desc - save new user
// @route - POST - /api/user
// @access - Public
const postUser = async (req, res) => {
    try{
        const keys = Object.keys(req.body);
        const allowedKeys = ["name", "age", "hobbies", "education", "dob"];
        const isValidOperation = allowedKeys.every((key) => keys.includes(key));

        if(isValidOperation) {
            let obj = new User(req.body);
            const result = await obj.save();
            return res.status(201).send({result, message: "New user created successfully"});
        } else {
            let missingKey = allowedKeys.filter((item) => {
                return !keys.includes(item)
            });

            return res.status(400).send({message: `${missingKey.toString()} keys are missing`})
        }

    } catch(err) {
        console.log(err);
        res.status(400).send({message: "Something Went Wrong", err})
    }
}

module.exports = postUser