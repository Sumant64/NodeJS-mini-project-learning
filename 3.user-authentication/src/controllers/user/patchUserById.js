const User = require("../../models/userModel");


const patchUserById = async (req, res) => {
    try{
        let id = req.params.id;
        let authUser = req.user;
        
        if(authUser._id.toString() !== req.params.id){
            if(authUser.role !== "admin"){
                return res.status(401).send({message: "unauthorized"})
            }
        }
        
        const updates = Object.keys(req.body);
        const allowedUpdates = ["name", "email", "age"]
        const isValidOperation = updates.every((key) => allowedUpdates.includes(key));
        
        if(!isValidOperation){
            return res.status(400).send({message: "Invalid Operation"});
        }
        
        let user = await User.findById(id);
        
        if(!user) {
            return res.status(404).send({message: "User not found"})
        }

        updates.forEach((update) => user[update] = req.body[update]);

        user.save();

        res.send({message: "User updated successfully", result: user});

    } catch(err) {
        console.log(err);
        res.status(400).send({message: "Something went wrong"})
    }
}

module.exports = patchUserById;