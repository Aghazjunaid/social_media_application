module.exports = () => {
    const jwt = require('jsonwebtoken');




    function otpGenerator(){
        var otp = Math.random();
        otp = otp*1000000;
        otp = parseInt(otp);
        return otp;
    }


    return{

    }
}