const managesubscription = require('../models/manageSubscription.model');
exports.insertmanagesubscription = function (dataFromUi) {

    return new Promise((resolve, reject) => {
        managesubscription
            .estimatedDocumentCount()
            .then(count => {
                if(count == 0){
                    var managesubscriptionsave = new managesubscription({
                        _id: count + 1,
                        employeeId: dataFromUi.employeeId,
                       subscriptionIds: dataFromUi.subscribeddomains,
                      
                    })
                    managesubscriptionsave.save(function (err, docsInserted) {
                        if (err) {
                            reject(err);
                        } else {
                            console.log(docsInserted)
                            resolve('success')
                        }
    
                    })
                } else {
                    managesubscription.find({'employeeId':dataFromUi.employeeId}).then((data)=>{
                          if(data.length == 0){
                            var managesubscriptionsave = new managesubscription({
                                _id: count + 1,
                                employeeId: dataFromUi.employeeId,
                               subscriptionIds: dataFromUi.subscribeddomains,
                              
                            })
                            managesubscriptionsave.save(function (err, docsInserted) {
                                if (err) {
                                    reject(err);
                                } else {
                                    console.log(docsInserted)
                                    resolve('success')
                                }
            
                            })
                          } else {
                              console.log("update data",dataFromUi);
                              if(dataFromUi.singledomainselection == true) {
                                  if(dataFromUi.subscribedornot == false){
                                      console.log("we are in unsubscribed state");
                                    managesubscription.findOneAndUpdate(
                                        {employeeId: dataFromUi.employeeId  },
                                        { $pull: { subscriptionIds: { $in: dataFromUi.subscribeddomains } } },{new: true},
                                        function(error,success) {
                                            if (error) {
                                                console.log(error);
                                            } else {
                                               console.log(success);
                                                resolve('success')
                                            }
                                        }
                                    )
                                  } else {
                                    console.log("we are in subscribed state",dataFromUi);
                                    managesubscription.findOneAndUpdate(
                                        {employeeId: dataFromUi.employeeId  },
                                        { $push: { subscriptionIds: dataFromUi.subscribeddomains[0] } },{new: true},
                                        function (error, success) {
                                            if (error) {
                                                console.log(error);
                                            } else {
                                                console.log(success);
                                               resolve(success);
                                            }
                                        });
                                  }
                             
                              } else {
                                managesubscription.findOneAndUpdate(
                                    { employeeId: dataFromUi.employeeId },
                                    { $set: { subscriptionIds: dataFromUi.subscribeddomains } },{new: true},
                                    function (error, success) {
                                        if (error) {
                                            console.log(error);
                                        } else {
                                           console.log(success);
                                            resolve('success')
                                        }
                                    });
                              }
                            
                          }
                    })
                }
              
            })
            .catch(err => {
                //handle possible errors
            })


    })
}

// exports.insertsingledomainsubscription  = function(dataFromUI) {
//  return new Promise((resolve,reject)=>{
//     managesubscription.find({}).then((data)=>{
//         if(data.length == 0) {
//             var managesubscriptionsave = new managesubscription({
//                 _id: data.length + 1,
//                 employeeId: dataFromUi.employeeId,
//                subscriptionIds: dataFromUi.subscribeddomains,
              
//             })
//             managesubscriptionsave.save(function (err, docsInserted) {
//                 if (err) {
//                     reject(err);
//                 } else {
//                     console.log(docsInserted)
//                     resolve('success')
//                 }

//             })
//         } else {

//         }
//     })
//  })
// }