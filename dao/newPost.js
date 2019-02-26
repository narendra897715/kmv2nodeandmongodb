const mongoose = require('mongoose');
const newpost = require('../models/newpost.model');

exports.insertNewPost = function (data) {
if(data.postId == null) {
    return new Promise((resolve, reject) => {

        var currentDate = new Date(Date.now());
        newpost
            .estimatedDocumentCount()
            .then(count => {
                var newpostdatasave = new newpost({
                    _id: count + 1,
                    postId: count + 1,
                    body: data.body,
                    subject: data.subject,
                    infoConfidentialChecked: data.infoConfidentialChecked,
                    domainIds: data.domains,
                    functionalareaIds:  data.functionalareas,
                    // domains: data.domains,
                    // functionalareas: data.functionalareas,
                    categoryId: data.categoryId,
                    categoryName: data.categoryName,
                    createdById: 21567,
                    updatedById: 21567,
                    createdDate: currentDate,
                    updatedDate: currentDate,
                    likes: [],
                    replies: [],
                    followers: []
                })
                newpostdatasave.save(function (err, docsInserted) {
                    if (err) {
                        reject(err);
                    } else {
                       // console.log(docsInserted)
                        global.newpostid = docsInserted.postId;  
                        resolve(docsInserted);
                    }

                })
            })
            .catch(err => {
                //handle possible errors
            })


    })
} else {
     return new Promise((resolve, reject) => {
        newpost.findOneAndUpdate(
            {_id: data.postId}, // find a document with that filter
           data, // document to insert 
            {upsert: true, new: true, runValidators: true}, // options
            function (err, updatedBike) { // callback
                if (err) {
                    reject(err);
                } console.log('ERROR '+ err);
               resolve("success");
    
            }
        );
     })
  
}
    
}
exports.insertImages = function(imagedata) {
    return new Promise((resolve,reject) => {
     console.log("newpostid",imagedata);
            //  console.log(foundPostData[0].likes);
          
           
                newpost.findOneAndUpdate(
                    { postId: newpostid },
                    { $push: { ImageData: {imagePath:imagedata} } },{new: true},
                    function (error, success) {
                        if (error) {
                            console.log(error);
                        } else {
                           console.log("success");
                            resolve("success")
                        }
                    });
              
            
    })
}
exports.insertlikesdata = function (data) {
    console.log(data);
    return new Promise((resolve, reject) => {
        var pushingObject = { employeeId: data.likedBy, status: data.likesstatus };
        // var getPostDataById = new newpost({postId:data.likedpostId});
        // newpost.update(
        //     {postId : data.likedpostId},
        //      {$push: {likes: pushingObject}},

        //     );
        // newpost.findOneAndUpdate(
        //     { postId : data.likedpostId }, 
        //     { $push: { likes: pushingObject  } },
        //    function (error, success) {
        //          if (error) {
        //              console.log(error);
        //          } else {
        //              console.log("successfully inserted");
        //             resolve('success')
        //          }
        //      });
        newpost.find({ postId: data.likedpostId }).then((foundPostData) => {
            //  console.log(foundPostData[0].likes);
            var filterarray = foundPostData[0].likes.filter(item => item.employeeId == data.likedBy);
            if (filterarray.length == 0) {
                newpost.findOneAndUpdate(
                    { postId: data.likedpostId },
                    { $push: { likes: pushingObject } },{new: true},
                    function (error, success) {
                        if (error) {
                            console.log(error);
                        } else {
                           
                            resolve({ 'status': true, 'postId': success.postId, 'likesArray': success.likes })
                        }
                    });
            } else {



                // newpost.findOneAndUpdate(
                //      { "postId": data.likedpostId, "likes.employeeId": data.likedBy },

                //     { $set: { "likes.$.status":  data.likesstatus } },
                //    function (error, success) {
                //          if (error) {
                //              console.log(error);
                //          } else {
                //              console.log("successfully updated");
                //             resolve('success')
                //          }
                //      });
                newpost.findOneAndUpdate({
                    postId: data.likedpostId
                }, {
                        $pull: {
                            likes: {
                                employeeId: data.likedBy
                            }
                        },

                    },{new: true},
                    function (error, success) {
                        if (error) {
                            console.log(error);
                        } else {
                            
                            resolve({ 'status': false, 'postId': success.postId, 'likesArray': success.likes })
                        }
                    }
                );
                // newpost.findByIdAndRemove( { "postId": data.likedpostId, "likes.employeeId": data.likedBy });
            }
            //    for(i in foundPostData.likes) {
            //     if(likes[i].employeeId == data.likedBy){
            //         break;
            //     }
            //    }
            // console.log(filterarray);
        })

        // console.log(getPostDataById);
        // getPostDataById.likes.push({
        //     employeeId: data.likedBy, status:data.likesstatus}
        // );
        //     getPostDataById.save(function (err,docsInserted) {
        //     if (err) {
        //         console.log(err);
        //        reject(err);
        //     } else{
        //         console.log(docsInserted)
        //         resolve('success')
        //     }

        // })
    })

}
exports.insertfollowData = function (data) {
    return new Promise((resolve, reject) => {
        var pushingObject = { employeeId: data.followedBy, status: data.followingstatus };
        newpost.find({ postId: data.followingpostId }).then((foundPostData) => {
            //  console.log(foundPostData[0].likes);
            var filterarray = foundPostData[0].followers.filter(item => item.employeeId == data.followedBy);
            if (filterarray.length == 0) {
                newpost.findOneAndUpdate(
                    { postId: data.followingpostId },
                    { $push: { followers: pushingObject } },
                    function (error, success) {
                        if (error) {
                            console.log(error);
                        } else {
                            success.followers.push(pushingObject);
                            resolve({ 'status': true, 'postId': success.postId, 'followersArray': success.followers })
                        }
                    });
            } else {
                newpost.findOneAndUpdate({
                    postId: data.followingpostId
                }, {
                        $pull: {
                            followers: {
                                employeeId: data.followedBy
                            }
                        },
                    },
                    function (error, success) {
                        if (error) {
                            console.log(error);
                        } else {
                            success.followers.pop();
                            resolve({ 'status': false, 'postId': success.postId, 'followersArray': success.followers })
                        }
                    }
                );
            }

        })
    })
}
