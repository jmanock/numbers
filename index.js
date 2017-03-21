var request = require('request');
var cheerio = require('cheerio');
var url = 'http://www.marketwatch.com/investing/stock/CAT';

request(url, function(error, response, body){
  if(!error && response.statusCode === 200){
    var $ = cheerio.load(body);
    var something = $('h3 > bg-quote').text();
    console.log(something);
  }
});
