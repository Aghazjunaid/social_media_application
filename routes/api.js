var express = require('express'),
apiRouter = express.Router();
var multer  = require('multer');
const upload = multer()

utils = require('../utils')();
user = require('./user/user')();
friend = require('./friends/friends')();

apiRouter.get('', (req, res) => {
    res.status(200).send("Node api demo")
})

//============user api============================
apiRouter.post('/register', user.registerUser);
apiRouter.get('/login', user.loginUser);
apiRouter.post('/user/resendOtp', user.resendOtp);
apiRouter.post('/user/forgotPassword', user.forgotPassword);
apiRouter.post('/user/resetPassword', user.resetPassword);
apiRouter.post('/user/profileImage/:id', utils.authenticateToken, upload.single('image'), user.uploadUserProfileImage);


//==============state api===============================
apiRouter.post('/friendRequest/:id', utils.authenticateToken, friend.sendFriendRequest);
apiRouter.post('/acceptFriendRequest/:id', utils.authenticateToken, friend.acceptFriendRequest);
apiRouter.get('/friendsList', utils.authenticateToken, friend.viewMyFriends);

// //===============district api===========================
// apiRouter.post('/district', utils.authenticateToken, upload.none(), people.postDistrict);
// apiRouter.get('/district', utils.authenticateToken, people.getDistrict);

// //==============child api===============================
// apiRouter.post('/child', utils.authenticateToken, people.postChild);
// apiRouter.get('/child', utils.authenticateToken, people.getChild);
// apiRouter.post('/child/image/:id', utils.authenticateToken, upload.single('image'), people.updateChildImage);



module.exports = apiRouter;
