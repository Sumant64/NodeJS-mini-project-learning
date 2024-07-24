

const admin = (req, res, next) => {
    if(req.user && req.user.role === "admin"){
        next();
    } else {
        res.status(401);
        throw new Error("user is not admin")
    }
}

module.exports = admin;