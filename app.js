var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var xlstojson = require('xls-to-json-lc');
var xlsxtojson = require('xlsx-to-json-lc');

app.use(bodyParser.json());

var storage = multer.diskStorage({
  destination:function(req, file, cb){
    cb(null, './uploads/')
  },
  filename:function(req, file, cb){
    var datetimestamp = Date.now();
    cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
  }
});

var upload = multer({
  storage:storage,
  fileFilter:function(req, file, callback){
    if(['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length-1]) === -1){
      return callback(new Error('Wrong extension type'));
    }
    callback(null, true);
  }
}).single('file');

app.post('/upload', function(req, res){
  
})
