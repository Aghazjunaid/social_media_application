module.exports = () => {
    const jwt = require('jsonwebtoken');
    const nodemailer = require("nodemailer");


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

    async function emailSend(otp,email) {

        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: "465",
          secure: true,
          service: "Gmail",
          auth: {
            user: appConfig.email,
            pass: appConfig.password
          },
        });

        const info = await transporter.sendMail({
            from: 'Aghaz junaid <@gmail.com>',
            to: email,
            subject: "OTP for verification of your email",
            text: "OTP for account verification is "+otp+"", 
          });
      }


    return{
        authenticateToken,
        emailSend
    }
}