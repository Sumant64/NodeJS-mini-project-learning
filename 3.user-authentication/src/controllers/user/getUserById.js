const User = require("../../models/userModel");

// @desc - get particular user by id
// @route - GET - api/user/:id
// @access - private
const getUserById = async(req, res) => {
    try{
        const id = req.params.id;
        const authUser = req.user;
        
        
        if(authUser._id.toString() !== req.params.id){
            if(authUser.role !== "admin"){
                return res.status(401).send({message: "unauthorized"})
            }
        }

        let user = await User.findById(id);

        if(!user) {
            return res.status(404).send({message: "User not found"})
        }

        return res.status(200).send({result: user});

    } catch(err) {
        console.log(err);
        res.status(400).send({message: "Something went wrong", error: err});
    }
}

module.exports = getUserById;