const jwt = require('jsonwebtoken');
module.exports = (req,res,next) =>{
    const token = req.header('authorization');
    if(!token) return res.status(401).send({message : 'Access Denied'});
    try {
        const verified = jwt.verify(token,process.env.JWTPRIVATEKEY);
        console.log(verified);
        next();
    } catch (error) {
        res.status(400).send({message:'Invalid Token'});
    }
}