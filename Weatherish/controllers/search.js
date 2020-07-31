var reqlib = require('request');
const fs = require('fs')


module.exports.getByName = function(app, request, response){
		
		let name = request.body.name;
		let tk = app.locals.configJSON.token;
		
		let base_url = 'http://api.weatherstack.com/current?access_key='+tk+'&query='+name+'/';
		doRequest(base_url, response);
		
};

module.exports.getByZIP = function(app, request, response){
		
		let zip = request.body.zip;
		let tk = app.locals.configJSON.token;
		
		let base_url = 'http://api.weatherstack.com/current?access_key='+tk+'&query='+zip+'/';
		doRequest(base_url, response);
		
};

module.exports.getByCoords = function(app, request, response){
		
		let lat = request.body.lat;
		let lon = request.body.lon;
		let tk = app.locals.configJSON.token;
		
		let base_url = 'http://api.weatherstack.com/current?access_key='+tk+'&query='+lat+','+lon+'/';
		doRequest(base_url, response);
		
};

module.exports.getByIP = function(app, request, response){
		
		let ip = request.body.ip;
		let tk = app.locals.configJSON.token;
		
		let base_url = 'http://api.weatherstack.com/current?access_key='+tk+'&query='+ip;
		doRequest(base_url, response);
		
};



function doRequest(base_url, response){
		var options = {
			url: base_url,
			headers: {'Content-type': "application/json; charset=utf-8"}
		};
		reqlib.post(options, function(error1, response1, body1) {
			if(!error1) {
				
				body1 = JSON.parse(body1);
				if(!body1.error){
					
					body1.location.region = decode_utf8(body1.location.region);
					
					addToRecent(body1.location.name, body1)
					
					
					response.status(200).json(body1);
					//response.render("details.ejs", {error: []});
					
				} else{
					response.status(400).json(body1);
					//console.log(JSON.stringify(body1));
					//response.render("details.ejs", {data: body1});
					
				}
			} else {
				response.status(400).json(error1);
				//response.render("details.ejs", {error: []});
				
			}
		});
	
}

function addToRecent(name, json){
	
	
	
	fs.readFile('./etc/recent.json', 'utf8', (err, jsonString) => {
		if (err) {
			console.log("File read failed:", err)
			return
		}
		
		let recent = JSON.parse(jsonString);
		
		console.log(recent);
		
		
		let ok = false;
		for(let i = 0; i<recent.searchs.length; i++){
			if(recent.searchs[i][0] == name){
				
				recent.searchs[i] = [name,json];
				ok = true;
				WriteFile(recent);
				
				
			}
			
		}
		
		if(!ok){
			
			if(recent.searchs.length == 5){
				recent.searchs.shift();
				recent.searchs.push([name,json])
				WriteFile(recent);
				
			} else{
				recent.searchs.push([name,json])
				WriteFile(recent);
			}
			
			
		}
	})
	
	
	
	
	
}

function WriteFile(recent){
	let jsonString2 = JSON.stringify(recent);
	
	fs.writeFile('./etc/recent.json', jsonString2, err => {
		if (err) {
			console.log('Error writing file', err)
		} else {
			console.log('Successfully wrote file')
		}
	})
	
	
	
}


function decode_utf8(s) {
  return decodeURIComponent(escape(s));
}