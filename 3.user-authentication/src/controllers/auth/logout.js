

// @desc - logout the user 
// @Route - GET - /api/auth/logout
// @access - Private
const logout = async(req, res) => {
    try{
        const user = req.user;

        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        })

        await req.user.save();
        
        res.status(200).send({message: "Successfully logout", user});
    } catch(err) {
        console.log(err);
        res.status(400).send({message: "Something went wrong", error: err});
    }
}

module.exports = logout;