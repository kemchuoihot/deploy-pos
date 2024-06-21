const express = require('express');
const router = express.Router();
const Account = require('../models/Account');
const bcrypt = require('bcrypt')
const {validationResult} = require('express-validator');
const signupValidator = require('./validator/signupValidator');
const midAdd = require('../middleware/login');
const jwt = require('jsonwebtoken');
const sendEmail = require('../api/sender');

router.get('/', (req, res) => {
    res.send("Staff page")
});
router.post('/',midAdd,signupValidator,async (req,res) =>{
    try {
        const account = await Account.findOne({email: req.body.email});
        if(account){
            return res.status(409).send({message: "Already exists"});
        }
        
        console.log(req.body)
        const {name,email} = req.body
        const username = email.split('@')[0]
        const defaultPassword = username
        const hashPassword = await bcrypt.hash(defaultPassword,10);
        const user = new Account({name:name,email:email,username:username,password:hashPassword});
        await user.save();
        const token = jwt.sign(user.toJSON(),process.env.JWTPRIVATEKEY,{expiresIn: '1m'});
        await sendEmail(email,'Login',`http://localhost:3000/verify?token=${token}`);

        res.status(201).send({message:"Success to create account!"})

    } catch (error) {
        console.log(error.message)
        res.status(500).send({message: "Server Error", error: error.message})
    }
})

module.exports = router;