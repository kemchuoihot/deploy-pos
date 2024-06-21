const express = require('express');
const router = express.Router();
const Account = require('../models/Account');
const bcrypt = require('bcrypt')
const {validationResult} = require('express-validator');
// const signupValidator = require('./validator/signupValidator');
// const midAdd = require('../middleware/login');
const jwt = require('jsonwebtoken');
const sendEmail = require('../api/sender');

router.get('/', (req, res) => {
    res.send("Staff page")
});
router.post('/', (req,res) =>{
    try {
        // Validate request body
        if (!req.body.email || !req.body.name) {
            return res.status(400).send({message: "Name and email are required"});
        }
        
        // const account = await Account.findOne({email: req.body.email});
        // if (account) {
        //     return res.status(409).send({message: "Account already exists"});
        // }
    
        // const {name, email} = req.body;
        // const username = email.split('@')[0];
        // // Generate a strong default password (consider using a library to generate this)
        // const defaultPassword = username;
        // const hashPassword = await bcrypt.hash(defaultPassword, 10);
        // const user = new Account({name, email, username, password: hashPassword});
        // await user.save();
    
        // // Ensure JWTPRIVATEKEY is defined
        // if (!process.env.JWTPRIVATEKEY) {
        //     console.error('JWTPRIVATEKEY is not defined.');
        //     return res.status(500).send({message: "Server error"});
        // }
    
        // const token = jwt.sign(user.toJSON(), process.env.JWTPRIVATEKEY, {expiresIn: '1h'});
        // // Consider implementing a more secure way to verify the account
        // sendEmail(email, 'Token-to-Login', `https://deploy-pos.vercel.app/verify?token=${token}`);
    
        // res.status(201).send({message: "Account created successfully!"});
    } catch (error) {
        console.error(error.message);
        res.status(500).send({message: "Server error"});
    }
})

module.exports = router;