//+------------------------------------------------------------------+
//| REQUIRES                                                         |
//+------------------------------------------------------------------+
let bodyParser = require('body-parser');
let consign = require('consign');
let express = require('express');
let cors = require('cors');
let configJSON = require('./config.json');
var path = require('path');

// instancia o express
let app = express();

//allow OPTIONS on all resources
//app.options('*', cors());

app.use('/public', express.static('public'));


// engine de visualização
app.set('view engine', 'ejs');
//app.set('views', './views');
app.set('views', path.join(__dirname, '../views'));	


// middlewares
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
//app.use(cors(corsOptions));
//app.use(cors({origin:true,credentials: true}));

// 'GLOBAL' VARIABLES DENTRO DE APP
app.locals.configJSON = configJSON;


//configurar autoload das rotas, dos models e dos controllers para o objeto app
consign()
	.include('routes')
	.include('controllers')
	.into(app);

//Exportação do Modulo APP
module.exports = app;