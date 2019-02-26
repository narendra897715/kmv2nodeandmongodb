const express = require('express');
const router = express.Router();
const upload = require('../controllers/multerImageUpload');
// Require the controllers WHICH WE DID NOT CREATE YET!!
const main_controller = require('../controllers/main.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/getDomainList', main_controller.domainlist);
router.get('/getCategoryList', main_controller.categorieslist);
router.get('/getFunctionalAreaList', main_controller.functionalArealist);
router.post('/getsubscriptiondata', (req,res) => {
    try{
        main_controller.getsubscriptions(req.body).then((result) => {
            res.json(result);

        }, (err) => {
            res.status(404).json(`${err}`);
        })
    } catch(err) {
        res.status(404).json(`${err}`);
    }
}
);
router.post('/addorupdatepost', (req, res) => {
    try {
        main_controller.newPostAddandUpdate(req.body).then((result) => {
            res.json(result);

        }, (err) => {
            res.status(404).json(`${err}`);
        })
    } catch (err) {
        res.status(404).json(`${err}`);
    }

})

router.post('/getPostDetailsById', async (req,res) => {
    try {
        console.log(req.body.postid);
        var data = await main_controller.getpostsdetailsById(req.body);
      res.send(data);
  } catch (err) {
      // logger.fatal(err);
      res.status(404).json(`${err}`);
  }
   
})

router.get('/getEmployeeDetailsWithToken', async (req, res) => {
    try {
          console.log("token from ui",req.header('token'));
        var data = await main_controller.fetchEmployeeDetailsWithToken(req.header('token'));
        res.send(data);
    } catch (err) {
        // logger.fatal(err);
        res.status(404).json(`${err}`);
    }
});

router.post('/uploadimages', upload.single('file'), (req, res) => {
    try {
        console.log("i am in uploadimages function")
        main_controller.insertImages(req.file.originalname).then((result) => {
            console.log(result);
            res.json(result);
        }, (err) => {
            res.status(404).json(`${err}`);
        })
    } catch (err) {
        res.status(404).json(`${err}`);
    }
})
router.post('/addmanagesubscriptions', (req, res) => {
    
    try {
        main_controller.managesubscriptionAddandUpdate(req.body).then((result) => {
            res.json(result);

        }, (err) => {
            res.status(404).json(`${err}`);
        })
    } catch (err) {
        res.status(404).json(`${err}`);
    }

})
// router.post('addOrUpdateSingledomainsubscription',(req,res)=>{
//     try{
//         main_controller.addorupdatesingledomainsubscription(req.body).then((result)=>{
//             res.json(result);
//         },
//         (err) => {
//             res.status(404).json(`${err}`);
//         }
//     )
//     }
//     catch(err) {
//         res.status(404).json(`${err}`);
//     }
// })
router.post('/getmyposts',async (req, res) => {

    try {
        var result = await main_controller.getMyPosts(req.body);
        res.send(result);
    } catch (err) {
        res.status(404).json(`${err}`);
    }

})

router.post('/getallposts',async (req, res) => {

    try {
        var result = await main_controller.getAllPosts(req.body);
        res.send(result);
    } catch (err) {
        res.status(404).json(`${err}`);
    }

})

router.post('/getpostsfiltersbydomains',async (req, res) => {

    try {
        var result = await main_controller.getpostsfiltersbydomains(req.body);
        res.send(result);
    } catch (err) {
        res.status(404).json(`${err}`);
    }

})

router.post('/getPostswithSelectedDomains',async (req, res) => {
console.log("calling getdomainpost");
    try {
        var result = await main_controller.getPostswithSelectedDomains(req.body);
        res.send(result);
    } catch (err) {
        res.status(404).json(`${err}`);
    }

})
router.post('/likesthepost', (req, res) => {

    try {
        main_controller.likesthepost(req.body).then((result) => {
            console.log(result);
            res.json(result);
        }, (err) => {
            res.status(404).json(`${err}`);
        })
    } catch (err) {
        res.status(404).json(`${err}`);
    }

})
router.post('/followthepost', (req, res) => {

    try {
        main_controller.followthepost(req.body).then((result) => {
            console.log(result);
            res.json(result);
        }, (err) => {
            res.status(404).json(`${err}`);
        })
    } catch (err) {
        res.status(404).json(`${err}`);
    }

})
module.exports = router;