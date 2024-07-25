const express = require("express");
const connectDb = require("./config/db");
const userRouter = require("./routes/userRoutes");
const taskRouter = require("./routes/taskRoutes");


connectDb();

const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/user", userRouter);
app.use("/api/task", taskRouter);




app.listen(port, () => {
    console.log(`app is running in the port ${port}`);
})