module.exports = () => {
    const jwt = require('jsonwebtoken');


    function authenticateToken(req, res, next) {
        const token = req.headers['authorization'];
        if (!token){
            return res.status(401).send("Invalid authorization");
        } else {
            jwt.verify(token, "gsjkah35gsj546b5t", (error, user) => {
                if (error){
                    return res.status(400).send(error);
                }
                req.user = user;
                next();
            })
        }
    }

    function otpGenerator(){
        var otp = Math.random();
        otp = otp*1000000;
        otp = parseInt(otp);
        return otp;
    }


    return{
        authenticateToken
    }
}