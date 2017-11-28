const express = require('express');
const router = express.Router();
var cheerio = require('cheerio');
var request = require('request');
var source = [];

// Connect

request({
    method: 'GET',
    url: 'http://www.balkanportal.net/category/ubice-mog-oca'
}, function(err, response, body) {
    if (err) return console.error(err);
	$ = cheerio.load(body);
	$ = $('a[class="post-title post-url"]').each(
	function(i,elemnt){
		
		var link = $(this).attr('href');
		findFinalUrl(link);

	})


});

var findFinalUrl = function(url1){
	request({
    method: 'GET',
    url: url1
}, function(err, response, body) {
    if (err) return console.error(err);
	$ = cheerio.load(body);


	 const sources = $('iframe').map((i, element) => {
                    return element.attribs['src'];
                }).get();
				
				
	
	var arrayLength = sources.length;
for (var i = 0; i < arrayLength; i++) {
    if(sources[i].includes("embed")){
		
		source.push({ 
		id : $('h1[class="single-post-title"]').text().match(/\d/g)[0] ,  
		title : $('h1[class="single-post-title"]').text().replace(/[\n\t]/g,""), 
		url:  sources[i]
		});
	}
    //Do something
}
function compare(a,b) {
  if (a.id < b.id)
    return -1;
  if (a.id > b.id)
    return 1;
  return 0;
}

	source.sort(compare);


});
}


// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

// Get users
router.get('/users', (req, res) => {
   response.data = source;
                res.json(response);
				
			
});

module.exports = router;