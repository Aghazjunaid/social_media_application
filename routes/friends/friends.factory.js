module.exports = ({
    User,
    PendingFriends,
    Friends,
    utils
}) => {

    //===============send friend request============================================
    async function sendFriendRequest(req,res){
        var return_response = { "status": null, "message": null, "data": {} } 
        try {
            const pendingFriends = await PendingFriends.findOne({user:req.user.id});
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
    async function acceptFriendRequest(req,res){
        var return_response = { "status": null, "message": null, "data": {} } 
        try {
            const friends = await Friends.findOne({user:req.user.id});
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
            const pendingFriends = await PendingFriends.find({user:req.user.id});
            var index = pendingFriends[0]._doc.pendingFriends.indexOf(req.params.id);
            if (index > -1) {
                pendingFriends[0]._doc.pendingFriends.splice(index, 1);
            }
            const opt = {
                pendingFriends : pendingFriends[0]._doc.pendingFriends
            }
            await PendingFriends.findOneAndUpdate({user:req.user.id}, opt, {new:true})
        } catch (error) {
            return_response.status = 400;
            return_response.message = String(error);
        }
        res.json(return_response);
    }

    //====================reject friend request=====================================
    async function rejectFriendRequest(req,res){
        var return_response = { "status": null, "message": null, "data": {} } 
        try {
            const pendingFriends = await PendingFriends.find({user:req.user.id});
            var index = pendingFriends[0]._doc.pendingFriends.indexOf(req.params.id);
            if (index > -1) {
                pendingFriends[0]._doc.pendingFriends.splice(index, 1);
            }
            const opt = {
                pendingFriends : pendingFriends[0]._doc.pendingFriends
            }
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
    async function removeFriend(req,res){
        var return_response = { "status": null, "message": null, "data": {} } 
        try {
            const friend = await Friends.find({user:req.user.id});
            var index = friend[0]._doc.friends.indexOf(req.params.id);
            if (index > -1) {
                friend[0]._doc.friends.splice(index, 1);
            }
            const opt = {
                friends : friend[0]._doc.friends
            }
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




    return {
        sendFriendRequest,
        acceptFriendRequest,
        rejectFriendRequest,
        removeFriend,
        viewMyFriends
    }
}