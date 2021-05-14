module.exports = ({
    User,
    Post,
    utils
}) => {

    //================add post======================================================
    //This api will get body from postman and save the data in post collection of logged in user
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

    //=====================get post========================================
    //This api will show all the post of logged in user
    async function getPost(req,res){
        var return_response = { "status": null, "message": null, "data": {} } 
        try {
            const doc = await Post.find({});
            return_response.status = 200;
            return_response.message = "Success";
            return_response.data = doc;
        } catch (error) {
            return_response.status = 400;
            return_response.message = String(error);
        }
        res.json(return_response);
    }


    //====================delete post===============================================
    //This api will delete any paricular post by their id
    async function deletePost(req,res){
         return_response = { "status": null, "message": null, "data": {} } 
        try {
            const doc = await Post.findByIdAndDelete({_id:req.params.id})
            return_response.status = 200;
            return_response.message = "Post deleted successfully";
            return_response.data = doc;
        } catch (error) {
            return_response.status = 400;
            return_response.message = String(error);
        }
        res.json(return_response);
    }


    return{
        addPost,
        getPost,
        deletePost
    }
}