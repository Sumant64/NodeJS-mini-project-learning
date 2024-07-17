const express = require('express');
require('./db/conn');
const userRouter = require('./routers/user');

const app = express();
const port = 5001;

app.use(express.json());
app.use('/api/user' ,userRouter)


app.get('/', (req, res) => {
    res.send({message: 'hello world'});
})


app.listen(port, () => {
    console.log('port is running in ', port);
})