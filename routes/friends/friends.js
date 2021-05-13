module.exports = () => {
    const { User, PendingFriends, Friends } = require("../../models/user");
    const utils = require('../../utils')();

    return require("./user.factory")({
        User,
        PendingFriends,
        Friends,
        utils
    });
}