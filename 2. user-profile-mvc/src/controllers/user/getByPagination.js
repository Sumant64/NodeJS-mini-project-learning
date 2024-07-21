const User = require("../../models/userModel");


// @desc - get user pagination
// @route - GET - /api/user/pagination?page=1&row-per-page=10
// @access - Public
const getPagination = async (req, res) => {
    try{
        let pageNo = parseInt(req.query.page);
        let rowPerPage = parseInt(req.query["row-per-page"]);
        let skip = pageNo * rowPerPage - rowPerPage;
        let result = await User.find({}).limit(rowPerPage).skip(skip);
        let count = await User.find({}).countDocuments();
        let pages = Math.ceil(count / rowPerPage);

        let pagination = {
            totalCount: count,
            page: pageNo,
            rowPerPage: rowPerPage,
            totalPages: pages
        }

        res.status(200).send({result: result, pagination});
    } catch(err) {
        console.log(err);

    }
}

module.exports = getPagination;