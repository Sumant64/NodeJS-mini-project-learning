const mongoose = require("mongoose");

const educationObj = {
    university: {
        type: String,
        required: true
    },
    startYear: {
        type: Number,
        required: true
    },
    endYear: {
        type: Number,
        required: true
    },
    grade: {
        type: String,
        required: true
    }
}

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true
    },
    hobbies: {
        type: [String],
        required: true,
        validate: {
            validator: (arr) => {
                return arr.length > 0
            },
            message: "At least one hobbie is required"
        }
    },
    education: {
        type: [educationObj],
        required: true,
        validate: {
            validator: (arr) => {
                return arr.length > 0
            },
            message: "At least one education field is required"
        }
    },
    dob: {
        type: Date,
        required: true,
        validate: {
            validator: (value) => {
                let date = new Date(value).getTime();
                let currentDate = new Date().getTime();
                let diff = currentDate - date;
                return diff > 0;
            },
            message: "Date should not be greater than present date"
        }
    }
})

const User = mongoose.model("User", userSchema);

module.exports = User