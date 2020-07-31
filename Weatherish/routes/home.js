

module.exports = function(app){

	//+------------------------------------------------------------------+
	//| GET '/'                                    |
	//+------------------------------------------------------------------+
	app.get('/', function(request, response) {
		app.controllers.home.getHomePage(app,request,response);
	});
	
	//+------------------------------------------------------------------+
	//| GET '/clear'                                    |
	//+------------------------------------------------------------------+
	app.get('/clear', function(request, response) {
		app.controllers.home.clearHistory(app,request,response);
	});

	
}