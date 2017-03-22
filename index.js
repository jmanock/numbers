var request = require('request');
var cheerio = require('cheerio');
var url = 'http://www.marketwatch.com/investing/stock/';
var list = ['CAT', 'ADBE', 'DE', 'DIS', 'GOOGL'];

for(var i = 0; i<list.length; i++){
  var comp = list[i];
  var links = url+comp;
  something(links, comp);
}
function something(links, comp){
  request(links, function(error, response, body){
    if(!error && response.statusCode === 200){
      var $ = cheerio.load(body);
      var stockPrice = $('h3 > bg-quote').text();
      var today = $('span.change--point--q > bg-quote').text();
      if(today.charAt(0) === '-'){
        var openPrice = stockPrice - today;
      }else{
        var openPrice = today + stockPrice;
      }

      console.log(comp,'OpenPrice:', openPrice, 'StockPrice:', stockPrice, 'Today:', today);
    }
  });
}
