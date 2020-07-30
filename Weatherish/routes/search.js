

module.exports = function(app){

	//+------------------------------------------------------------------+
	//| POST '/search/name'                                    |
	//+------------------------------------------------------------------+
	app.post('/search/name', function(request, response) {
		app.controllers.search.getByName(app,request,response);
	});
	
	//+------------------------------------------------------------------+
	//| POST '/search/zip'                                    |
	//+------------------------------------------------------------------+
	app.post('/search/zip', function(request, response) {
		app.controllers.search.getByZIP(app,request,response);
	});
	
	//+------------------------------------------------------------------+
	//| POST '/search/coords'                                    |
	//+------------------------------------------------------------------+
	app.post('/search/coords', function(request, response) {
		app.controllers.search.getByCoords(app,request,response);
	});
	
	//+------------------------------------------------------------------+
	//| POST '/search/ip'                                    |
	//+------------------------------------------------------------------+
	app.post('/search/ip', function(request, response) {
		app.controllers.search.getByIP(app,request,response);
	});
	
	

	
}