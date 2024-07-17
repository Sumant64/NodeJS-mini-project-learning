const express = require('express');
const dotenv = require('dotenv');
const connectDb = require('./config/db');
const userRouter = require('./routes/userRoutes');

dotenv.config();
connectDb();

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/user', userRouter);



app.listen(port, () => {
    console.log(`app is running in the port ${port}`)
})