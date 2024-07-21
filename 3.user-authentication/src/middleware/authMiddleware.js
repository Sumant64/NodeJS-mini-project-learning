const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authMiddleware = async(req, res, next) => {
    try{
        const token = req.header("Authorization");
        
    } catch(err) {
        console.log(err);
        res.status(400).send({message: "Something went wrong", error: err});
    }
}