const User = require("../../models/userModel");


const login = async(req, res) => {
    try{
        let keys = Object.keys(req.body);
        let validKeys = ["email", "password"];
        let isValid = validKeys.every((key) => keys.includes(key))
        console.log(isValid)
        if(!isValid) {
            return res.status(400).send({message: "please enter valid fields"});
        } 

        const user = await User.find({email: req.body.email, password: req.body.password});
        //user will be the array with data in 0 index
        let myUser = new User(user[0]);
        const token = await myUser.generateAuthToken();

        res.status(200).send({user, token});
    } catch (err) {
        console.log(err);
        res.status(400).send({message: "Something went wrong.", error: err});
    }
}

module.exports = login;