const express = require('express');
const bodyParser = require('body-parser');
const allroutes = require('./routes/routes');
var path = require('path');
var cors = require('cors');
const auth = require('./Authentication/auth');
// initialize our express app
const app = express();
// Set up mongoose connection
const mongoose = require('mongoose');
let dev_db_url = 'mongodb://172.16.10.51:2701/KnowledgeManagementV2';
mongoose.Promise = global.Promise;
mongoose.connect(dev_db_url);
mongoose.connection.once('open', function () {  
    console.log("connected!!!");
   
    
  }); 
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// app.use('/static', express.static('uploadedImages'));
 app.use('/static',express.static(path.join(__dirname, 'uploadedImages')));
//app.use(express.static(path.join(__dirname, 'uploadedImages')));
app.use(cors({
     exposedHeaders: ['x-auth'],
    }));

    app.use(async (req, res, next) => {
        if (req.originalUrl === '/post/getEmployeeDetailsWithToken') {
          var token = req.header('token');
          
          if (token == null) {
            console.log("I am printing when token is");
            res.sendStatus(404);
          }
          var xauth = await auth.createToken(token);
         // console.log(xauth);
          res.header('x-auth', xauth);
          next();
        } else {
          var token = req.header('x-auth');
          if (token == null) {
            console.log("token is null :" + error );
            res.sendStatus(404);
          }
          try {
            var flag = await auth.checkfortoken(token);
            if (!flag) {
            //  console.log("token is:"  + token)
            //  console.log("flag not found:" + flag )
              res.sendStatus(404);
            } else {
              res.header('x-auth', flag);
              next();
            }
      
          } catch (error) {
            console.log("error is :" + error );
            res.sendStatus(404);
            // console.log(error);
          }
      
        }
      
      })

app.use('/post', allroutes);
let port = 3000;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});