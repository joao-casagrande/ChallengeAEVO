var reqlib = require('request');

module.exports.getHomePage = function(app, request, response){
	
		response.render('home.ejs');
	
};