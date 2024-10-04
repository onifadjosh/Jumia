const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    fullname :{type:String, require:true}
})

const UserModel = mongoose.model('user_collection', UserSchema)


module.exports = {UserModel}