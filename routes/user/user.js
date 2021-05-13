module.exports = () => {
    const { User } = require("../../models/user");
    const jwt = require('jsonwebtoken')
    bcrypt = require('bcrypt');


    return require("./user.factory")({
        User,
        jwt,
        bcrypt
    });
}