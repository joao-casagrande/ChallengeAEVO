var reqlib = require('request');

module.exports.getByName = function(app, request, response){
		
		let name = request.params.name;
		let tk = app.locals.configJSON.token;
		
		let base_url = 'http://api.weatherstack.com/current?access_key='+tk+'&query='+name+'/';
	
		//
		var options = {
			url: base_url,
		};
		reqlib.post(options, function(error1, response1, body1) {
			if(!error1) {
				
				body1 = JSON.parse(body1);
				if(body1.error){
					
					response.render("details.ejs", {error: []});
					
				} else{
					//console.log(JSON.stringify(body1));
					response.render("details.ejs", {data: body1});
					
				}
			} else {
				
				response.render("details.ejs", {error: []});
				
			}
		});
		
		
	
		//response.json('home.ejs');
	
};