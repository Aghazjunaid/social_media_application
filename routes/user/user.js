module.exports = () => {
    const { User } = require("../../models/user");
    const jwt = require('jsonwebtoken');

    return require("./user.factory")({
        User,
        jwt
    });
}