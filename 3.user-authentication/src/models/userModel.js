const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error("Email is invalid");
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        trim: true,
        validate(value) {
            if(value.toLowerCase().includes("password")) {
                throw new Error("Password cannot contain 'password' ")
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if(value < 0) {
                throw new Error("Age must be a positive number")
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: String
    }
}, {
    timestamps: true
})

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
}

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, "thisisthesecretkey");

    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
}

const User = mongoose.model("Userauth", userSchema);
module.exports = User;