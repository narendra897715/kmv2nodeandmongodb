const Domain = require('../models/domains.model');
const Categories = require('../models/category.model');
const FunctionalAreas = require('../models/functionalareas.model');
const newpostmodel = require('../models/newpost.model');
const managesubmodel = require('../models/manageSubscription.model');
var newpostDao = require('../dao/newPost');
var EmployeeDetailsdao = require('../dao/employeedetailsDAO');
var msDAo = require('../dao/managesubscriptionDAO');
var responds = require('../models/likesRepliesFollowers.model');
//Simple version, without validation or sanitation
exports.domainlist = function (req, res) {
    Domain.find({}, { "_id": 0 })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            console.log(err);
            res.status(404).json(`${err}`);
        })

};
exports.categorieslist = function (req, res) {
    Categories.find({}, { "_id": 0 })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            console.log(err);
            res.status(404).json(`${err}`);
        })

};
exports.functionalArealist = function (req, res) {

    FunctionalAreas.find({}, { "_id": 0 })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            console.log(err);
            res.status(404).json(`${err}`);
        })

};
exports.newPostAddandUpdate = function (postdata) {
    return new Promise((resolve, reject) => {
        newpostDao.insertNewPost(postdata).then((data) => {
            console.log(data);
            resolve(data)
        }, (err) => {
            reject(err);
        })
    })
};
exports.managesubscriptionAddandUpdate = function(MSdata) {
    return new Promise((resolve, reject) => {
        msDAo.insertmanagesubscription(MSdata).then((data) => {
          //  console.log(data);
            resolve(data)
        }, (err) => {
            reject(err);
        })
    })
}
// exports.addorupdatesingledomainsubscription = function(SDSData) {
//     return new Promise((resolve, reject) => {
//         msDAo.insertmanagesubscription(SDSData).then((data) => {
//           //  console.log(data);
//             resolve(data)
//         }, (err) => {
//             reject(err);
//         })
//     })
// }
exports.getMyPosts = function (postdata) {
    return new Promise((resolve, reject) => {
          if (postdata.categoryId == 1) {
            findrelavantposts({'createdById':postdata.employeeId},postdata).then((relavantPosts)=>{
                resolve(relavantPosts);
            },(err) => {
                reject(err)
            })
               } else {
            findrelavantposts({ 'categoryId': postdata.categoryId,'createdById':postdata.employeeId },postdata).then((relavantPosts)=>{
                resolve(relavantPosts);
            },(err) => {
                reject(err)
            })
            }
})
};

exports.getpostsdetailsById = function(readmoreparams) {
    console.log()
    return new Promise((resolve, reject) => {
      
        newpostmodel.find({'postId':readmoreparams.postid},{ "_id": 0 }).populate('categoryId', 'categoryImagePath')
        .populate('domainIds')
        .populate('functionalareaIds')
        .exec(function (err, data) {
            if (err) {
                reject(err);
                console.log(err);
            } else {
                addingLRFdata(data, readmoreparams.employeeId).then((finaldata) => {
                      
                    resolve(finaldata);
                },(err)=>{
                    reject(err);
                });
                   
            }
        });
           
    })
}

exports.getAllPosts = function (postdata) {
    return new Promise((resolve, reject) => {
          if (postdata.categoryId == 1) {
            findrelavantposts({},postdata).then((relavantPosts)=>{
                resolve(relavantPosts);
            },(err) => {
                reject(err)
            })
               } else {
            findrelavantposts({ 'categoryId': postdata.categoryId},postdata).then((relavantPosts)=>{
                resolve(relavantPosts);
            },(err) => {
                reject(err)
            })
            }
})
};

var findrelavantposts = function(relavantparams,postdata){
    return new Promise((resolve,reject)=>{
        newpostmodel.find(relavantparams,{ "_id": 0 }).populate('categoryId', 'categoryImagePath')
        .populate('domainIds')
        .populate('functionalareaIds')
        .exec(function (err, data) {
            if (err) {
                reject(err);
                console.log(err);
            } else {
                
                   addingLRFdata(data, postdata.employeeId).then((finaldata) => {
                      
                    resolve(finaldata);
                },(err)=>{
                    reject(err);
                });
    
            }
        });
    })
  }

var addingLRFdata = function (data, loginId) {
    return new Promise(async (resolve, reject) =>  {
        var i;
        var samplearray = JSON.parse(JSON.stringify(data))
        var alluserdata = await EmployeeDetailsdao.getEmployeeDetailsWithToken(null);
     //   console.log("dfskdfl",alluserdata);
        for (i = 0; i < samplearray.length; i++) {
            var foundEmployeelikestatus = samplearray[i].likes.filter(item => item.employeeId == loginId);
           // console.log(samplearray[i].createdById);
            var postrelatedemployeedetails = alluserdata.filter(item => item.user_id == samplearray[i].createdById);
           
            samplearray[i].skype = "sip:" + postrelatedemployeedetails[0].email_id;
            samplearray[i].mail = "mailto:" + postrelatedemployeedetails[0].email_id;
            samplearray[i].createdByName = postrelatedemployeedetails[0].user_name;
            if (foundEmployeelikestatus.length == 0) {
              samplearray[i].likeStatus = false;
              samplearray[i].likebutton = 'not-liked.svg';
            } else {
              samplearray[i].likeStatus = foundEmployeelikestatus[0].status;
              samplearray[i].likebutton = 'like_filled.svg';
           }
            var foundEmployeefollowstatus = samplearray[i].followers.filter(item => item.employeeId == loginId);
            if (foundEmployeefollowstatus.length == 0) {
         samplearray[i].followStatus = false;
         samplearray[i].followbutton = 'followers.svg';
            } else {
       samplearray[i].followStatus = foundEmployeefollowstatus[0].status;
       samplearray[i].followbutton = 'follow_filled.svg';
      }
        }
        resolve(samplearray);
    })
}

var addingRepliesToReadmore = function(readmoredata,log) {
   
}
exports.insertImages = function(imagedata) {

    return new Promise((resolve,reject)=>{
        newpostDao.insertImages(imagedata).then((data) => {
            console.log(data);
            resolve(data)
        }, (err) => {
            reject(err);
        })
    })
}
exports.likesthepost = function (likedData) {
    return new Promise((resolve, reject) => {
        // responds.likes.estimatedDocumentCount()
        // .then(count => {
        //     var likessave = new responds.likes({
        //         _id:count + 1,
        //         userId: likedData.likedBy,
        // postId: likedData.likedpost,
        // status: likedData.likesstatus
        //     });
        //     likessave.save(function (err,docsInserted) {
        //         if (err) {
        //            reject(err);
        //         } else{
        //             console.log(docsInserted)
        //             resolve('success')
        //         }

        //     })
        // })
        newpostDao.insertlikesdata(likedData).then((data) => {
            console.log(data);
            resolve(data)
        }, (err) => {
            reject(err);
        })

    })
}
exports.followthepost = function (followData) {
    return new Promise((resolve, reject) => {
        newpostDao.insertfollowData(followData).then((data) => {
            console.log(data);
            resolve(data)
        }, (err) => {
            reject(err);
        })

    })
}

exports.fetchEmployeeDetailsWithToken = async (token) => {
    try {

        var data = await EmployeeDetailsdao.getEmployeeDetailsWithToken(token);
        // for (var i = 0; i < data.length; i++) {
        //     data[i].dateOfJoining = convertFromObjToTimestamp(data[i].dateOfJoining);
        // }
        return data;

    } catch (error) {
      //  logger.fatal(error);
        throw new Error(error);
    }

};

var getRelavantDomainPost = function(relavantdata,selectedData) {
    return new Promise((resolve,reject)=>{
        newpostmodel.find(relavantdata)
        .populate('categoryId', 'categoryImagePath')
        .populate('domainIds')
        .populate('functionalareaIds')
        .exec(function (err, data) {
            if(err) {
                reject(err);
            } else {
              
                if(data.length == 0) {
                    var CompleteData = [];
                    var subObject = {};
                    Domain.find({"domainId":selectedData.domainId}).exec(async (err,domainData) => {
                        if(err){
                            reject(err);
                        } else {
                            // subObject.domaindescription = domainData[0].domainDescription;
                            // subObject.domainname = domainData[0].domainName;
                            subObject.domainData = domainData[0];
                            subObject.postdata = data;
                            subObject.subscribed = await checkfordomainsubscription({'employeeId':selectedData.employeeId,'subscriptionIds':selectedData.domainId})
                            CompleteData.push(subObject);
                            resolve(CompleteData);
                            
                            
                        }
                    })
                   
                } else {
                 
                    var CompleteData = [];
                    var subObject = {};
                  
                  
                    Domain.find({"domainId":selectedData.domainId}).exec(async (err,domainData)=>{
                        if(err){
                            reject(err);
                        } else {
                            // subObject.domaindescription = domainData[0].domainDescription;
                            // subObject.domainname = domainData[0].domainName;
                            subObject.domainData = domainData[0];
                            subObject.subscribed = await checkfordomainsubscription({'employeeId':selectedData.employeeId,'subscriptionIds':selectedData.domainId})
                             addingLRFdata(data, selectedData.employeeId).then((finaldata) => {
                              subObject.postdata = finaldata;
                              CompleteData.push(subObject);
                                //    console.log(CompleteData);
                                resolve(CompleteData);
                            });
                            
                        }
                    })
                }
               
            }
        })
    })
    
}

exports.getPostswithSelectedDomains = function(selectedData) {
   
    return new Promise((resolve,reject)=>{
        if(selectedData.categoryId == 1) {
            getRelavantDomainPost({"domainIds": selectedData.domainId },selectedData).then((relavantdomainsposts)=>{
                resolve(relavantdomainsposts);
            })
            
        } else {
            getRelavantDomainPost({"categoryId":selectedData.categoryId,"domainIds": selectedData.domainId },selectedData).then((relavantdomainsposts)=>{
                resolve(relavantdomainsposts);
            })
        
        }
      
    })
}

exports.getsubscriptions = function (relavantdata)  {
    return new Promise((resolve, reject) => {
        Domain.find({}, { "_id": 0 })
        .then(async(data) => {
            var subObject = {};
            var dummyObject = [];
            var i, j=data.length;
            for(i=0;i<j;i++) {
                subObject = {};
                subObject.domainname = data[i].domainName;
                subObject.domainId = data[i].domainId;
                  subObject.numberofquestions = await onlynumberofposts({"categoryId":2,"domainIds": data[i].domainId });
                  subObject.numberofarticles = await onlynumberofposts({"categoryId":3,"domainIds": data[i].domainId });
                  subObject.numberofchallenges = await onlynumberofposts({"categoryId":4,"domainIds": data[i].domainId });
                  subObject.subscribed = await checkfordomainsubscription({'employeeId':relavantdata.employeeId,'subscriptionIds':data[i].domainId})
                
        
                dummyObject.push(subObject);
            }
            resolve(dummyObject);
        })
        .catch((err) => {
            console.log(err);
            reject(err);
           
        })
    })
    
   
}

exports.getpostsfiltersbydomains = function(relavantparams) {
    console.log(relavantparams);
    return new Promise((resolve,reject) => {
        if(relavantparams.categoryId == 1) {
            newpostmodel.find({domainIds : {$in:relavantparams.filterdomainids}},{ "_id": 0 }).populate('categoryId', 'categoryImagePath')
            .populate('domainIds')
            .populate('functionalareaIds')
            .exec(function (err, data) {
                if (err) {
                    reject(err);
                    console.log(err);
                } else {
                    console.log("data found for all posts");
                    console.log(data);
                       addingLRFdata(data, relavantparams.employeeId).then((finaldata) => {
                          
                        resolve(finaldata);
                    },(err)=>{
                        reject(err);
                    });
        
                }
            });
        } else {
            newpostmodel.find({domainIds : {$in:relavantparams.filterdomainids},'categoryId':relavantparams.categoryId},{ "_id": 0 }).populate('categoryId', 'categoryImagePath')
        .populate('domainIds')
        .populate('functionalareaIds')
        .exec(function (err, data) {
            if (err) {
                reject(err);
                console.log(err);
            } else {
                console.log("data found for all posts");
                console.log(data);
                   addingLRFdata(data, relavantparams.employeeId).then((finaldata) => {
                      
                    resolve(finaldata);
                },(err)=>{
                    reject(err);
                });
    
            }
        });
        }
        
    })
}

var checkfordomainsubscription = function(subdata) {
    return new Promise((resolve,reject)=>{
        managesubmodel.find(subdata)
        .exec(function (err, data) {
            if(err) {
                reject(err);
            } else {
                if(data.length == 0) {
                    resolve(false); 
                } else {
                    resolve(true);
                }
                
            }
        })
    })
}

var onlynumberofposts = function(filterdata) {
    return new Promise((resolve,reject)=>{
        newpostmodel.find(filterdata)
        .exec(function (err, data) {
            if(err) {
                reject(err);
            } else {
                resolve(data.length); 
            }
        })
    })
}