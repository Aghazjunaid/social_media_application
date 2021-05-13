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
                return_response.message = "State added successfully";
                return_response.data = doc;
            } else {
                pendingFriends._doc.pendingFriends.push(req.params.id)
                let doc = await pendingFriends.save();
                return_response.status = 200;
                return_response.message = "State added successfully";
                return_response.data = doc;
            }
        } catch (error) {
            return_response.status = 400;
            return_response.message = String(error);
        }
        res.json(return_response);
    }

    


    return {
        sendFriendRequest
    }
}