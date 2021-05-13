const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {type: String, required: true, },
    email: {type: String, required: true, unique: true},
    phone: {type: Number },
    password: {type: String, required: true },
    profilePhoto: {type: String, default: "https://www.dropbox.com/s/9gjddxm7uqw6uew/726323_user.png?raw=1" },
},{ timestamps:true })


const PendingFriendsSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref:"user"},
    pendingFriends:  [
        {type: Schema.Types.ObjectId, ref:"user"}
    ]
},{ timestamps:true })


const FriendsSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref:"user"},
    friends:  [
        {type: Schema.Types.ObjectId, ref:"user"}
    ]
},{ timestamps:true })


const OtpSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref:"user"},
    otp: {type: Number},
    created: {type: Date, default: Date},
    expired: {type: Date, default: Date.now, index: { expires: '15m' }},
});

User = mongoose.model("user", UserSchema); 
// user will be fields in our database
Otp = mongoose.model("otp", OtpSchema); 
PendingFriends = mongoose.model("pendingFriends", PendingFriendsSchema); 
Friends = mongoose.model("friends", FriendsSchema); 



module.exports={ 
    User,
    Otp,
    PendingFriends,
    Friends
}