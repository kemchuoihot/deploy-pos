const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');

const AccountSchema = new mongoose.Schema({
    name: {type: String, required: true, minLength: 3},
    username: {type: String},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, minLength: 6},
    role:{type: String, enum: ['admin', 'user'], default: 'user'},
    status:{type: String, enum: ['active', 'inactive','block'], default: 'inactive'},
});

const Account = mongoose.model('Account', AccountSchema);

module.exports = Account