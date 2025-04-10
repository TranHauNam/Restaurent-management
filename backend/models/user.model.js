const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true
        },
        email: String,
        password: String,
        tokenUser: {
            type: String,
        }, 
        phone: String,
        avatar: String,
        status: {
        type: String,
        default: "active"
        }, 
        deleted: {
            type: Boolean,
            default: false
        },
        deletedAt: Date
    }, 
    {
        timestamps: true // thời gian tạo và cập nhật
    }
);

const User = mongoose.model("User", userSchema, "users"); 

module.exports = User;  