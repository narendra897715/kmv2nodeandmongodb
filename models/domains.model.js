const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let DomainSchema = new Schema({
    _id:Number,
    domainId: Number,
    domainName: String,
    domainDescription: String
});


// Export the model

module.exports =  mongoose.model('domain', DomainSchema);;