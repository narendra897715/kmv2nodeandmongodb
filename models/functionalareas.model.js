const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let FunctionalAreasSchema = new Schema({
    _id:Number,
    functionalAreaId: Number,
    functionalAreaName: String,
});


// Export the model

module.exports =  mongoose.model('functional_area', FunctionalAreasSchema);;