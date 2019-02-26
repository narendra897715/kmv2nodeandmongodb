const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let CategorySchema = new Schema({
    _id:Number,
    categoryId: Number,
    categoryName: String,
    categoryImagePath: String
   
});


// Export the model

module.exports =  mongoose.model('categorie', CategorySchema);