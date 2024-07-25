const User = require("../../models/userModel");


// @desc - get all the users
// @route - GET - api/user?page=10&row-per-page=5
// @access - Public
const getUsers = async(req, res) => {
    try{
        let page = parseInt(req.query.page);
        let rowPerPage = parseInt(req.query["row-per-page"]);
        let skip = page * rowPerPage - rowPerPage;

        const result = await User.find({}).limit(rowPerPage).skip(skip);
        const count = await User.find({}).countDocuments();

        let pages = Math.ceil(count / rowPerPage);

        let pagination = {
            totalCount: count,
            page: page,
            rowPerPage: rowPerPage,
            totalPages: pages
        }

        if(!result) {
            return res.status(200).send({message: "No result found"});
        }

        res.status(200).send({result: result, pagination});

    } catch(err) {
        console.log(err);
        res.status(400).send({message: "Something went wrong!"});
    }
}

module.exports = getUsers;