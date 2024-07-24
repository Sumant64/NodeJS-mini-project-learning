const User = require("../../models/userModel");

// @desc - login and token generation of user
// @route - POST - api/auth/login
// @access - Public
const login = async(req, res) => {
    try{
        let keys = Object.keys(req.body);
        let validKeys = ["email", "password"];
        let isValid = validKeys.every((key) => keys.includes(key))

        if(!isValid) {
            return res.status(400).send({message: "please enter valid fields"});
        } 

        const user = await User.findByCredentials(req.body.email, req.body.password);

        const token = await user.generateAuthToken();

        res.status(200).send({user, token});
    } catch (err) {
        console.log(err);
        res.status(400).send({message: "Something went wrong.", error: err});
    }
}

module.exports = login;