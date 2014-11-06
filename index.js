var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){
	
	url = 'https://www.xoom.com/india/send-money';

	request(url, function(error, response, html){
		if(!error){
			var $ = cheerio.load(html);

			var title, release, rating;
			var json = { rate : ""};

			$('.fx-rate').filter(function(){
		        rate = $(this).first().text();           
		        json.rate = rate;
	        })

		} else {
            console.log ("Error after making request to URL");
        }

        fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
        	console.log('output.json file');
        })
        res.send('Check your console!')
	})
})

app.listen('3000')
console.log('Port on 3000');
exports = module.exports = app;