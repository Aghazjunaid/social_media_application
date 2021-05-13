var express = require('express'),
apiRouter = express.Router();
var multer  = require('multer');
const upload = multer()

//utils = require('../utils')();
user = require('./user/user')();

apiRouter.get('', (req, res) => {
    res.status(200).send("Node api demo")
})

//============user login api============================
apiRouter.post('/register', user.registerUser);
apiRouter.post('/login', user.loginUser);


//==============state api===============================
// apiRouter.post('/state', utils.authenticateToken, upload.none(), people.postState);
// apiRouter.get('/state', utils.authenticateToken, people.getState);

// //===============district api===========================
// apiRouter.post('/district', utils.authenticateToken, upload.none(), people.postDistrict);
// apiRouter.get('/district', utils.authenticateToken, people.getDistrict);

// //==============child api===============================
// apiRouter.post('/child', utils.authenticateToken, people.postChild);
// apiRouter.get('/child', utils.authenticateToken, people.getChild);
// apiRouter.post('/child/image/:id', utils.authenticateToken, upload.single('image'), people.updateChildImage);



module.exports = apiRouter;
