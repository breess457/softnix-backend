const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    newDate: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('User', userSchema);