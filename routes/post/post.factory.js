module.exports = ({
    User,
    Post,
    utils
}) => {

    //================add post======================================================
    async function addPost(req,res){
        var return_response = { "status": null, "message": null, "data": {} } 
        try {
            let opt = req.body;
            opt.user = req.user.id;
            const post = new Post(opt);
            const doc = await post.save();
            return_response.status = 200;
            return_response.message = "Post added successfully";
            return_response.data = doc;
        } catch (error) {
            return_response.status = 400;
            return_response.message = String(error);
        }
        res.json(return_response);
    }

    return{
        addPost
    }
}