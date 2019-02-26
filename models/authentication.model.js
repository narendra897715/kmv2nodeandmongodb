const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let AuthenticationSchema = new Schema({
   
    xAuth: String
   
});


// Export the model

module.exports =  mongoose.model('authtoken', AuthenticationSchema);