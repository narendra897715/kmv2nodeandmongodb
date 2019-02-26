const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let CommentSchema = new Schema({
   
    commentContent: String,
    commentedBy: String,
    postId : Number
   
});


// Export the model
module.exports =  mongoose.model('comment', CommentSchema);
