

module.exports = function(app){

	//+------------------------------------------------------------------+
	//| GET '/'                                    |
	//+------------------------------------------------------------------+
	app.get('/', function(request, response) {
		app.controllers.home.getHomePage(app,request,response);
	});

	
}