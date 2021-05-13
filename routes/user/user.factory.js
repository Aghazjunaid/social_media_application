module.exports = ({
    User,
    Otp,
    jwt,
    bcrypt,
    utils
}) => {

    //=====================register user api=============================================
    async function registerUser(req, res) {
        var return_response = {
            "status": null,
            "message": null,
            "data": null
        }
        try{
            var user = await User.findOne({email : req.body.email})
            if (user) {
                return_response["message"] = "User already exist!";
                return_response["status"] = 400;
                return res.send(return_response);
            } else {
                var opt = req.body;
                const salt = await bcrypt.genSaltSync(10);
                opt.password = await bcrypt.hashSync(opt.password, salt);
                const token = jwt.sign({
                    email:opt.email,
                }, "dfgjgfr76rur",{
                    expiresIn: "24h"
                });
                user = new User(opt);
                user = await user.save();
                user._doc.token = token;
                return_response["status"] = 200;
                return_response["message"] = "success";
                return_response["data"] = user;
                return res.send(return_response);
            }
        }catch (error) {
            return_response["message"] = String(error);
            return res.status(400).send(return_response);
        }
    }

    //=================login user api====================================================
    async function loginUser(req,res){
        var return_response = {"status": null, "message": null, "data": null}
        try {
            const user = await User.findOne({email:req.body.email});
            if(user) {
                const isMatch = await bcrypt.compare(req.body.password, user.password)
                if(!isMatch){
                    return_response["status"] = 400;
                    return_response["message"] = "Invalid login details";
                }else {
                    const token = jwt.sign({
                        email:user.email,
                        id:user._id,
                        role:user.role,
                    }, "aghazjunaid",{
                        expiresIn: "1h"
                    });
                    user._doc["token"] = token;
                    return_response["status"] = 200;
                    return_response["message"] = "Login Success";
                    return_response["data"] = user;
                }
            }
            else {
                return_response["status"] = 400;
                return_response["message"] = "User not found";
            }
        } catch (error) {
            return_response["message"] =  "Invalid credentials";
            return_response["status"] = 400;
        }
        return res.status(return_response["status"]).json(return_response);
    }

    
//=================resend otp===========================================================
async function resendOtp(req,res){
    var return_response = {
        "status": null,
        "message": null
    }
    try{
        const user = await User.findOne({email : req.body.email});
        if(user){
            var otp = utils.otpGenerator();
            otpObj = {
                userId: user._id,
                otp: otp
            }
            const opt = new Otp(otpObj);
            opt.save();
            utils.emailSend(otp,req.body.email);
            return_response["status"] = 200;
            return_response["message"] = "Success";
            return res.send(return_response);
        }else{
            return_response["status"] = 400;
            return_response["message"] = "User not found";
            return res.status(400).send(return_response);
        }
    }catch (error) {
        return_response["message"] = String(error);
        return res.status(400).send(return_response);
    }
}


//=====================forgot password===================================================
async function forgotPassword(req,res){
    var return_response = {
        "status": null,
        "message": null
    }
    try{
        const user = await User.findOne({email:req.body.email})
        if(!user){
            return_response["status"] = 400;
            return_response["message"] = "User with this email doesn't exist";
            return res.status(400).send(return_response);
        }else{
            var otp = utils.otpGenerator();
            otpObj = {
                otp: otp
            }
            const opt = new Otp(otpObj);
            opt.save();
            utils.emailSend(otp,req.body.email)
            return_response["status"] = 200;
            return_response["message"] = "Success";
            return res.send(return_response);
        }
    }catch (error) {
        return_response["message"] = String(error);
        return res.status(400).send(return_response);
    }
}



//================reset password=========================================================
async function resetPassword(req,res){
    var return_response = {
        "status": null,
        "message": null,
        "data": null
    }
    try{
        let opt = req.body;
        const otp = await Otp.findOne({otp : req.body.otp});
        if(otp){
            const user = await User.findOne({email : req.body.email});
            if(!user){
                return_response["status"] = 400;
                return_response["message"] = "User doesn't exist!";
                return res.status(400).json(return_response);
            }else{
                const salt = await bcrypt.genSaltSync(10);
                const password = await bcrypt.hashSync(opt.newPass, salt);
                user.password = password;
                user.save(function(error,doc){
                    if(error){
                        return_response["status"] = 400;
                        return_response["message"] = String(error);
                        return res.send(return_response);  
                    } else {
                        return_response["status"] = 200;
                        return_response["message"] = "success";
                        return_response["data"] = doc;
                        return res.send(return_response);
                    }
                });
            }
        }else{
            return_response["status"] = 400;
            return_response["message"] = "OTP has been expired";
            return res.send(return_response);
        }
    }catch (error) {
        return_response["message"] = String(error);
        return res.status(400).send(return_response);
    }
}


    return {
        registerUser,
        loginUser,
        resendOtp,
        forgotPassword,
        resetPassword
    }

}