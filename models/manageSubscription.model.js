const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let manageSubscriptionSchema = new Schema({
    _id:Number,
    employeeId: Number,
    subscriptionIds: [{ type: Number, ref: 'domain' }],
   
});


// Export the model

module.exports =  mongoose.model('manageSubscription', manageSubscriptionSchema);;