const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoute = require("./routes/userRoutes");


dotenv.config();
connectDB();
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

//router
app.use("/api/user", userRoute);


app.listen(port, () => {
    console.log(`app is running in port ${port}`);
})