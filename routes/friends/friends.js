module.exports = () => {
    const { User, PendingFriends, Friends } = require("../../models/user");
    const utils = require('../../utils')();

    return require("./friends.factory")({
        User,
        PendingFriends,
        Friends,
        utils
    });
}