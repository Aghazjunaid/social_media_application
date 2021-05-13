const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {type: String, required: true, },
    email: {type: String, required: true, unique: true},
    phone: {type: Number },
    password: {type: String, required: true },
    profilePhoto: {type: String, default: "https://www.dropbox.com/s/9gjddxm7uqw6uew/726323_user.png?raw=1" },
},{ timestamps:true })


User = mongoose.model("user", UserSchema); 
// user will be fields in our database

module.exports={ 
    User
}