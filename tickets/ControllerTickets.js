var express = require('express')
var router = express.Router()
var MainTickets = require('./MainTickets')

var multer = require('multer');
var storage = multer.diskStorage({ 
    destination : function(req,file,callback){
                    callback(null,'./uploads/');
    },
    filename: function(req,file,callback){
                callback(null,new Date().toISOString() +'-'+ file.originalname)
    }
});

var fileFilter = function(req,file,callback){
                  if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg'){
                      callback(null,true);
                  }else{
                      callback("not a image file",false);
                  }

}
var upload = multer({
  storage: storage,
  limits:{
    fileSize :1024 * 1024 * 5 //5mb
  },
  fileFilter: fileFilter
});

module.exports = router

// response handler
function response (res,statuscode,err,data) {
  if (statuscode === 200) {
    var data = data;
  }else if(statuscode === 400){
    if(data == []){
      data = "Bad request";
    }
  }else{
    data = "something went wrong";
  }
  res.status(statuscode).json({ "message": data });
}

// create ticket api
router.post('/create-tickets', function (req, res, next) {
  MainTickets.createtickets(req, next, function (err, data) {
    if (err) {
      response(res, 400, err, [])
    } else {
      response(res, 200, null, data)
    }
  })
})

//get all tickets
router.get('/getall-tickets', function (req, res, next) {
  MainTickets.getalltickets(req, next, function (err, data) {
    if (err) {
      response(res, 400, err, [])
    } else {
      response(res, 200, null, data)
    }
  })
})

//get specific tickets
router.post('/get-ticket', function (req, res, next) {
  MainTickets.getticket(req, next, function (err, data) {
    if (err) {
      response(res, 400, err, [])
    } else if(data == null || data.length == 0 ){ 
      data = "no tickets found"
      response(res, 400, err, data)
    }
    else {
      response(res, 200, null, data)
    }
  })
})

// pic upload api
router.post('/pic-upload', upload.single('pic'),function (req, res, next) {  
  MainTickets.picupload(req, next, function (err, data) {
    if (err) {
      response(res, 400, err, [])
    } else {
      response(res, 200, null, data)
    }
  })
})

//change status 
router.post('/status-change', function (req, res, next) {  //console.log(req.user)
  MainTickets.ticketstatus(req, next, function (err, data) {
    if (err) {
      response(res, 400, err, [])
    } else if (data == null) {
      data = 'no record found'
      response(res, 400, null, data)
    }else {
      response(res, 200, null, data)
    }
  })
})