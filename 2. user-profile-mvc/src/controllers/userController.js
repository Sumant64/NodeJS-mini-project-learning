const User = require('../models/userModel');

// @desc - get all the user
// @route - GET - /api/user/
// @access - Public
const getUser = async (req, res) => {
    try{
        const result = await User.find({});
        if(result) {
            res.status(200).send(result)
        } else {
            res.status(400).send({message: "No result found"})
        }
    } catch(err) {
        console.log(err);
        res.status(400).send({message: "Something Went Wrong"})
    }
}


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

// @desc - it will update the user
// @route - PATCH - /api/user/
// @access - Public
const patchUser = async (req, res) => {
    try{
        let id = req.params.id;
        const updates = Object.keys(req.body);
        const allowedUpdates = ["name", "hobbies", "age", "education"];
        const isValidOperation = updates.every((key) => allowedUpdates.includes(key));

        if(!isValidOperation) {
            return res.status(400).send({error: "Invalid Operation"});
        }

        let user = await User.findOne({_id: id});
        if(!user) {
            return res.status(404).send({message: "User not found"});
        }

        let obj = new User(user);
        updates.forEach((update) => obj[update] = req.body[update]);

        obj.save();
        res.send({message: 'User updated successfully', result: obj});

    } catch(err) {
        console.log(err);
        res.status(400).send({message: "Something Went Wrong", err});
    }
}

module.exports = {
    getUser,
    postUser,
    patchUser
}