module.exports = () => {
    const { User, Post } = require("../../models/user");
    const utils = require('../../utils')();

    return require("./post.factory")({
        User,
        Post,
        utils
    });
}