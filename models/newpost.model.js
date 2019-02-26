const mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
const Schema = mongoose.Schema;
const domain123334 = require('./domains.model');
// const AutoIncrement = require('mongoose-sequence')(mongoose);
const NewPostSchema = new Schema({
    _id: Number,
    postId: Number,
    body: String,
    subject: String,
    infoConfidentialChecked: Boolean,
    domainIds : [{type: Number, ref: 'domain'}],
    functionalareaIds: [{type: Number, ref: 'functional_area'}],
    // domains:[{
    //     domainId : Number,
    //     domainName : String
    //      }],
    //      functionalareas: [{
    //         functionalAreaId: Number,
    //         functionalAreaName: String
    //      }],
    categoryId: [{ type: Number, ref: 'categorie' }],
    createdById: Number,
    updatedById: Number,
    createdDate: Date,
    updatedDate: Date,
   likes:[{
      
    employeeId: Number,
    status: Boolean
   }],
   replies:[{
     
    employeeId: Number,
    replyContent: String
   }],
   followers:[{
     
       employeeId: Number,
    status: Boolean 
   }],
   ImageData: [{
       imagePath: String
   }]
});
// NewPostSchema.plugin(AutoIncrement, {inc_field: 'postId'});

const NewPost = mongoose.model('newpost', NewPostSchema);
NewPostSchema.plugin(deepPopulate);
module.exports = NewPost;