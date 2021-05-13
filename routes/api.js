var express = require('express'),
apiRouter = express.Router();
var multer  = require('multer');
const upload = multer()

utils = require('../utils')();
user = require('./user/user')();
friend = require('./friends/friends')();
post = require('./post/post')();

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
apiRouter.put('/rejectFriendRequest/:id', utils.authenticateToken, friend.rejectFriendRequest);
apiRouter.put('/removeFriend/:id', utils.authenticateToken, friend.removeFriend);
apiRouter.get('/friendsList', utils.authenticateToken, friend.viewMyFriends);

//===============post api===========================
apiRouter.post('/post', utils.authenticateToken, post.addPost);
apiRouter.get('/post', utils.authenticateToken, post.getPost);
apiRouter.delete('/post/:id', utils.authenticateToken, post.deletePost);


module.exports = apiRouter;
