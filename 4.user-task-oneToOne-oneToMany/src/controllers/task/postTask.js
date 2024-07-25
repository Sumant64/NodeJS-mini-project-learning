const Task = require("../../models/taskModel");
const User = require("../../models/userModel");



// @desc - save a new task
// @route - POST- api/task
// @access - public
const postTask = async(req, res) => {
    try{
        const keys = Object.keys(req.body);
        const allowedKeys = ["description", "owner"]

        const isValidOperation = allowedKeys.every((key) => keys.includes(key));

        if(!isValidOperation) {
            return res.status(400).send({message: "keys are missing"})
        }

        const userId = req.body.owner;
        const user = User.findById(userId);

        if(!user) {
            return res.status(200).send({message: "User does not exists"})
        }

        const task = new Task(req.body);
        
        task.owner = userId;
        let taskResult = await task.save();
        await User.findByIdAndUpdate(req.body.owner, { $push: { tasks: taskResult._id } });

        res.status(201).send({message: "task created successfully", task})
    } catch (err) {
        console.log(err);
        res.status(400).send({message: "Something went wrong!"})
    }
}

module.exports = postTask;