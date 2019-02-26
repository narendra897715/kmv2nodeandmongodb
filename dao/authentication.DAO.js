const mongoose = require('mongoose');
const authmodel = require('../models/authentication.model');

exports.createToken = function(data) {
   // console.log(data);
    return new Promise((resolve,reject) => {
        var authdatasave = new authmodel({
            
            xAuth: data
        })
        authdatasave.save(function (err, docsInserted) {
            if (err) {
                reject(err);
            } else {
              //  console.log(docsInserted)
              
                resolve(docsInserted);
            }

        })
    })
}