var reqlib = require('request');
const fs = require('fs')

module.exports.getHomePage = function(app, request, response){
	
	fs.readFile('./etc/recent.json', 'utf8', (err, jsonString) => {
		if (err) {
			console.log("File read failed:", err)
			return
		}
		
		response.render('home.ejs', {recent: jsonString});
		
	})
	
	
	
	
};

module.exports.clearHistory = function(app, request, response){
	
	let jsonString = new Object();
	jsonString.searchs= [];
	
	jsonString = JSON.stringify(jsonString);
	
	
	
	fs.writeFile('./etc/recent.json', jsonString, err => {
		if (err) {
			console.log('Error writing file', err)
			response.status(400).send("ERROR");
		} else {
			
			console.log('Successfully wrote file')
			response.status(200).send("OK");
		}
	})
	
	
	
	
};