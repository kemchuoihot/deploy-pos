const router = require("express").Router();
const Account = require("../models/Account");
const bcrypt = require('bcrypt')


router.post('/', async (req, res) => {
    try {
        const account = await Account.findOne({username: req.body.user});
        console.log(account);
        const hashPassword = await bcrypt.hash(req.body.newPassword,10);
        account.password = hashPassword;
        await account.save(); 
        res.json({Status: true, message: "Change password successfully"});
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
})

module.exports = router;
