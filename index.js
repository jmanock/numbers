var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var writeStream = fs.createWriteStream('file.xls');
var url = 'http://www.nasdaq.com/symbol/';
var list = ['CAT', 'ADBE', 'DE', 'DIS', 'GOOGL'];
var backUpList = [];

for(var i = 0; i<list.length; i++){
  var comp = list[i];
  var links = url+comp;
  Prices(links, comp);
}

function Prices(links, comp){
  request(links, function(error, response, body){
    if(!error && response.statusCode === 200){
      var $ = cheerio.load(body);
      var stockPrice = $('div#qwidget_lastsale').text();
      var change = $('div#qwidget_netchange').text();
      var upordown = $('div#qwidget-arrow').prev().hasClass();
      console.log(stockPrice, change, comp, upordown);
    }
  })
}
