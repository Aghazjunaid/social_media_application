module.exports = () => {
    const { User, Otp } = require("../../models/user");
    const jwt = require('jsonwebtoken')
    bcrypt = require('bcrypt');
    const utils = require('../../utils')();

    return require("./user.factory")({
        User,
        Otp,
        jwt,
        bcrypt,
        utils
    });
}