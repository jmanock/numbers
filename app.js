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
  var exceltojson;
  upload(req, res, function(err){
    if(err){
      res.json({error_code:1, err_desc:err});
      return;
    }
    if(!req.file){
      res.json({error_code:1, err_desc:'No File Passed'});
      return;
    }
    if(req.file.originalname.split('.')[req.file.originalname.split('.').length-1]==='xlsx'){
      exceltojson = xlsxtojson;
    }else{
      exceltojson = xlstojson;
    }
    console.log(req.file.path);
    try{
      exceltojson({
        input:req.file.path,
        output:null,
        lowerCaseHeaders:true
      }, function(err,result){
        if(err){
          return res.json({error_code:1, err_desc:err, datat:null});
        }
        res.json({error_code:0, err_desc:null, data:result});
        magic(result);
      });
    }catch(e){
      res.json({error_code:1, err_desc:'Corupted EXCEL FILE!'});
    }
  })
});

app.get('/', function(req,res){
  res.sendFile(__dirname + '/index.html');
});
app.listen('3000', function(){
  console.log('On port 3 million is running');
});

function magic(result){    
  // This is where the magic happens
  for(var i = 0; i<result.length; i++){
    var company = result[i].company;
    var ticker = result[i].ticker;
    console.log(i, company, ticker);
  }
}
