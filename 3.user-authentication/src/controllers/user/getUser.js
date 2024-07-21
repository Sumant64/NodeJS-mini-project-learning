

// @desc - get the users
// @route - GET - api/user/
// @access - public
const getUsers = async(req, res) => {
    try{
        res.send({message: 'hello world'})
    } catch(err) {
        console.log(err);
        res.status(400).send({message: "Something went wrong."})
    }
}

module.exports = getUsers;