const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likesSchema = new Schema({
    _id:Number,
    userId: Number,
    postId: Number,
    status: Boolean
})

const repliesSchema = new Schema({
    _id:Number,
    userId: Number,
    postId: Number,
    replyContent: String
})

const followersSchema = new Schema({
    _id:Number,
    userId: Number,
    postId: Number,
    followstatus: Boolean 
})

var likes = mongoose.model('like', likesSchema);
var replies = mongoose.model('reply', repliesSchema);
var followers = mongoose.model('follower', followersSchema);

module.exports = {likes:likes,
    replies:replies,
    followers:followers};