const multer = require('multer');
 
var storage = multer.diskStorage({
	destination: (req, file, cb) => {
	  cb(null, './uploadedImages')
	},
	filename: (req, file, cb) => {
	  cb(null, Date.now().valueOf().toString() + '-' + file.originalname  )
	}
});
 
var upload = multer({storage: storage});
 
module.exports = upload;