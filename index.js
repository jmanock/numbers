var request = require('request');
var cheerio = require('cheerio');
var url = 'http://www.marketwatch.com/investing/stock/';
var list = ['CAT', 'ADBE', 'DE', 'DIS', 'GOOGL'];

for(var i = 0; i<list.length; i++){
  var links = url+list[i];
  something(links);
}
function something(links){
  request(links, function(error, response, body){
    if(!error && response.statusCode === 200){
      var $ = cheerio.load(body);
       var stockPrice = $('h3 > bg-quote').text();
       var today = $('span.change--point--q > bg-quote').text();

      // if(today.charAt(0) === '-'){
      //
      // }

      //  console.log(links, openPrice, stockPrice);
    }
  });
}
