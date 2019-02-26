const jwt = require('jsonwebtoken');
const authmethods = require('../dao/authentication.DAO')
const authmodel = require('../models/authentication.model');
exports.createToken = async (data) => {
  
  
    var token = jwt.sign({ token: data.toString() }, 'knowledgemanagementv2').toString();
    var result = await authmethods.createToken(token);
    return token;
    //console.log(token);
}

exports.checkfortoken = function(data)  {
return new Promise((resolve,reject)=> {
    authmodel.find({"xAuth":data}).exec(async (err,datafound) => {
        if(err){
            reject(err);
        } else {
          // console.log(datafound)
            resolve(datafound[0].xAuth);
       }
    })
})
  
}