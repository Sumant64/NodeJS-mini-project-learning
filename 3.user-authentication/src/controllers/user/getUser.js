const User = require("../../models/userModel");


// @desc - get the users
// @route - GET - api/user?page=2&row-per-page=5
// @access - public
const getUsers = async(req, res) => {
    try{
        let page = parseInt(req.query.page);
        let rowPerPage = parseInt(req.query["row-per-page"]);
        let skip = page * rowPerPage - rowPerPage;
        let result;

        result = await User.find({}).limit(rowPerPage).skip(skip);
        let totalCount = await User.find({}).countDocuments();
        let pages = Math.ceil(totalCount / rowPerPage);

        let pagination = {
            totalCount: totalCount,
            pages: pages,
            page: page,
            rowPerPage: rowPerPage
        }

        res.send({result: result, pagination: pagination})
    } catch(err) {
        console.log(err);
        res.status(400).send({message: "Something went wrong.", error: err})
    }
}

module.exports = getUsers;