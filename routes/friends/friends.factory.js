module.exports = ({
    User,
    PendingFriends,
    Friends,
    utils
}) => {

    //===============send friend request============================================
    //This api will send friend request and those who send request his _id will be stored
    //in the PendingFriends DB.
    async function sendFriendRequest(req,res){
        var return_response = { "status": null, "message": null, "data": {} } 
        try {
            //First check any pending friend request is available or not
            const pendingFriends = await PendingFriends.findOne({user:req.user.id});
            //If not any friend request available then stored in the first index of array
            //by below code
            if (!pendingFriends){
                let opt = {
                    "user": req.user.id,
                    "pendingFriends": req.params.id
                }
                const pendingFriends = new PendingFriends(opt);
                let doc = await pendingFriends.save();
                return_response.status = 200;
                return_response.message = "Friend request send successfully";
                return_response.data = doc;
            //If any prending friend request is present then push the new friend request
            //to the last index of array by below code
            } else {
                pendingFriends._doc.pendingFriends.push(req.params.id)
                let doc = await pendingFriends.save();
                return_response.status = 200;
                return_response.message = "Friend request send successfully";
                return_response.data = doc;
            }
        } catch (error) {
            return_response.status = 400;
            return_response.message = String(error);
        }
        res.json(return_response);
    }

    //======================accept friend request=====================================
    //This api will take user id in params whose friend request is going to accept
    //In this once the friend request is accepted friend is added to both(login user and
    //whose friend request is going to accept) friends list
    //And then remove the friend request from pending friends
    async function acceptFriendRequest(req,res){
        var return_response = { "status": null, "message": null, "data": {} } 
        try {
            //First check any friend is available or not in the friends DB
            const friends = await Friends.findOne({user:req.user.id});
            //If no any friends are available then stored in the first index of array and save it
            if (!friends){
                let opt = {
                    "user": req.user.id,
                    "friends": req.params.id
                }
                const friendObj = new Friends(opt);
                let doc = await friendObj.save();
                return_response.status = 200;
                return_response.message = "Friend request accepted successfully";
                return_response.data = doc;
            //If any prending friend request is present then push the new friend request
            //to the last index of array and save it
            } else {
                friends._doc.friends.push(req.params.id)
                let doc = await friends.save();
                return_response.status = 200;
                return_response.message = "Friend request accepted successfully";
                return_response.data = doc;
            }
            const friend2 = await Friends.findOne({user:req.params.id});
            if (!friend2){
                let opt = {
                    "user": req.params.id,
                    "friends": req.user.id
                }
                const friendObject = new Friends(opt);
                await friendObject.save();
            } else {
                friend2._doc.friends.push(req.params.id)
                await friend2.save();
            }
            //search friend request in the pending friends by id
            const pendingFriends = await PendingFriends.find({user:req.user.id});
            //After finding splice it from the array
            var index = pendingFriends[0]._doc.pendingFriends.indexOf(req.params.id);
            if (index > -1) {
                pendingFriends[0]._doc.pendingFriends.splice(index, 1);
            }
            const opt = {
                pendingFriends : pendingFriends[0]._doc.pendingFriends
            }
            //Then update the PendingFriends DB 
            await PendingFriends.findOneAndUpdate({user:req.user.id}, opt, {new:true})
        } catch (error) {
            return_response.status = 400;
            return_response.message = String(error);
        }
        res.json(return_response);
    }

    //====================reject friend request=====================================
    //This api will take user id in params whose friend request is going to reject
    async function rejectFriendRequest(req,res){
        var return_response = { "status": null, "message": null, "data": {} } 
        try {
            //First check the pending request of user 
            const pendingFriends = await PendingFriends.find({user:req.user.id});
            //Find the user's id which is going to reject by finding its index in array
            //then splice it from  pendingFriends
            var index = pendingFriends[0]._doc.pendingFriends.indexOf(req.params.id);
            if (index > -1) {
                pendingFriends[0]._doc.pendingFriends.splice(index, 1);
            }
            const opt = {
                pendingFriends : pendingFriends[0]._doc.pendingFriends
            }
            //After removing update the PendingFriends DB
            const doc = await PendingFriends.findOneAndUpdate({user:req.user.id}, opt, {new:true})
            return_response.status = 200;
            return_response.message = "Success";
            return_response.data = doc;
        } catch (error) {
            return_response.status = 400;
            return_response.message = String(error);
        }
        res.json(return_response);
    }

    //====================remove friend=============================================
    //This api will take friend's id in params which is need to remove from the friend list
    async function removeFriend(req,res){
        var return_response = { "status": null, "message": null, "data": {} } 
        try {
            const friend = await Friends.find({user:req.user.id});
            //Find the user's id which is going to remove from the logged in user
            //friend list by finding its index in array of friends list
            var index = friend[0]._doc.friends.indexOf(req.params.id);
            if (index > -1) {
                friend[0]._doc.friends.splice(index, 1);
            }
            const opt = {
                friends : friend[0]._doc.friends
            }
            //Then update the friends DB of user.
            const doc = await Friends.findOneAndUpdate({user:req.user.id}, opt, {new:true})
            return_response.status = 200;
            return_response.message = "Success";
            return_response.data = doc;
        } catch (error) {
            return_response.status = 400;
            return_response.message = String(error);
        }
        res.json(return_response);
    }


    //=====================get all my friends========================================
    //This api will get all the friends of logged in user
    async function viewMyFriends(req,res){
        var return_response = { "status": null, "message": null, "data": {} } 
        try {
            const friends = await Friends.find({user:req.user.id});
            return_response.status = 200;
            return_response.message = "Success";
            return_response.data = doc;
        } catch (error) {
            return_response.status = 400;
            return_response.message = String(error);
        }
        res.json(return_response);
    }


    //====================view friends of friend=========================================
    //This api will take friends id whose friend list you want to view
    //Then show his friends list
    async function viewFriendsOfFriend(req,res){
        var return_response = { "status": null, "message": null, "data": {} } 
        try {
            const doc = await Friends.find({user:req.params.id});
            return_response.status = 200;
            return_response.message = "Success";
            return_response.data = doc;
        } catch (error) {
            return_response.status = 400;
            return_response.message = String(error);
        }
        res.json(return_response);
    }



    return {
        sendFriendRequest,
        acceptFriendRequest,
        rejectFriendRequest,
        removeFriend,
        viewMyFriends,
        viewFriendsOfFriend
    }
}