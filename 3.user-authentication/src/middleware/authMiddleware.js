const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authMiddleware = async(req, res, next) => {
    try{
        const token = req.header("Authorization");
        const decoded = jwt.verify(token, "thisisthesecretkey");

        const user = await User.findOne({ _id: decoded._id, "tokens.token": token});
        
        if(!user){
            throw new Error()
        }

        req.token = token;
        req.user = user;

        next();
    } catch(err) {
        console.log(err);
        res.status(400).send({message: "Something went wrong", error: err});
    }
}

module.exports = authMiddleware;