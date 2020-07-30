

module.exports = function(app){

	//+------------------------------------------------------------------+
	//| POST '/search'                                    |
	//+------------------------------------------------------------------+
	app.post('/search/name', function(request, response) {
		app.controllers.search.getByName(app,request,response);
	});

	
}