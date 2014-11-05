var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){
    console.log ("Inside of Scrape..");
    //url = "https://www.xoom.com/india/send-money";
    url = 'http://www.imdb.com/title/tt1229340/';
    var output = { country : "", rate : ""};    
    request(url, function(error, response, html){
        if(!error){
            // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
            var $ = cheerio.load(html);
            // Finally, we'll define the variables we're going to capture
            var country, rate;
            console.log ("After loading Xoom..");
           $('.header').filter(function(){
                console.log ("After fetching data..");
                output.rate = $(this).children().first().text();
            });
            res.send ("Value is.." + output.rate);
            } else {
                console.log ("Error occurred..."+ error);
            }
    });    
    res.end("Scrape Info.." + output);
});    

app.listen('3000')


exports = module.exports = app;