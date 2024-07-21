const User = require('../../models/userModel');

// @desc - it will update the user
// @route - PATCH - /api/user/:id
// @access - Public
const patchUser = async (req, res) => {
    try{
        let id = req.params.id;
        const updates = Object.keys(req.body);
        const allowedUpdates = ["name", "hobbies", "age", "education", "dob"];
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
    patchUser
}