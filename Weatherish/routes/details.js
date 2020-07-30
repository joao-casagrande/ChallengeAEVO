

module.exports = function(app){

	//+------------------------------------------------------------------+
	//| GET '/details'                                    |
	//+------------------------------------------------------------------+
	app.get('/details/:name', function(request, response) {
		app.controllers.details.getByName(app,request,response);
	});

	
}