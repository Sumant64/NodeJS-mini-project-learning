const User = require("../../models/userModel");

const patchUser = async(req, res) => {
    try{
        let id = req.params.id;
        const updates = Object.keys(req.body);
        const allowedUpdates = ["name", "email", "password", "age"];
        const isValidOperation = updates.every((key) => allowedUpdates.includes(key));

        if(!isValidOperation) {
            return res.status(200).send({error: "Invalid Operation"})
        }

        let user = await User.findById(id);
        if(!user) {
            return res.status(200).send({message: "User not found"});
        }

        updates.forEach((update) => user[update] = req.body[update]);

        user.save();

        res.send({message: "User updated successfully", result: user});

    } catch(err) {
        console.log(err);

    }
}

module.exports = patchUser;