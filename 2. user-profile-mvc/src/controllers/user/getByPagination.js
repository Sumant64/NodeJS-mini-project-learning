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

        if(result) {
            res.status(200).send({result});
        } else {
            res.status(404).send({message: "No data found"});
        }
    } catch(err) {
        console.log(err);

    }
}

module.exports = getPagination;