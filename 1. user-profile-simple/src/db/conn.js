const mongoose = require("mongoose");


mongoose.set("strictQuery", false);

mongoose.connect("mongodb://127.0.0.1:27017/practise").then(() => {
    console.log("connection successfull to db");
}).catch((err) => {
    console.log(err);
})