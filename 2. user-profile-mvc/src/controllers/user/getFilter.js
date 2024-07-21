const User = require("../../models/userModel");


// @desc - get user using search
// @route - GET - /filter?page=2&row-per-page=5&search=string
// @access - Public
const getByFilter = async (req, res) => {
    try {
        const page = parseInt(req.query.page);
        const rowPerPage = parseInt(req.query["row-per-page"]);
        const skip = page * rowPerPage - rowPerPage;
        const search = (req.query.search);
        let result;
        let count = 0;

        if (search) {
            const keyword = {
                $or: [
                    { name: { $regex: search, $options: "i" } },
                    { hobbies: { $elemMatch: { $regex: search, $options: "i" } } },
                    { "education.university": { $regex: search, $options: "i" } }
                ]
            }
            result = await User.find(keyword).limit(rowPerPage).skip(skip);
            count = await User.countDocuments(keyword);
        } else {
            result = await User.find({}).limit(rowPerPage).skip(skip);
            count = await User.find({}).countDocuments();
        }

        let pages = Math.ceil(count / rowPerPage);

        let pagination = {
            totalCount: count,
            page: page,
            rowPerPage: rowPerPage,
            totalPages: pages 
        }

        res.status(200).send({ result: result, pagination })
    } catch (err) {
        console.log(err);
        res.status(400).send({ message: "Something went wrong", error: err });
    }
}

module.exports = getByFilter