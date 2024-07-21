const User = require("../../models/userModel");


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

module.exports = getUser