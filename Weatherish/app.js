//+------------------------------------------------------------------+
//| REQUIRES                                                         |
//+------------------------------------------------------------------+

var app = require('./config/server');

//+------------------------------------------------------------------+
//| LISTEN                                                 				|
//+------------------------------------------------------------------+
app.listen(3100, function () {
  console.log('App listening on port 3100! Started '+(new Date().toString()));
}).on('error', function(err){ // lógica para capturar o erro ECONNRESET
	console.log('app.listen -> on error handler');
	console.log(err);
});

// catch do erro ECONNRESET
process.on('uncaughtException', function(err) {
	console.log('process -> on uncaughtException handler');
	console.log(err);
});

//+------------------------------------------------------------------+
//| ONDEINIT                                                 		   |
//+------------------------------------------------------------------+
process.on('SIGINT', function() {
   console.log("Caught interrupt signal");
	process.exit();
});