/**
* Module dependencies.
*/
var _ 				= require('underscore');
var express 		= require('express');
var http 			= require('http');
var path 			= require('path');
var os				= require('os');
var toolset			= require('toolset');
var mime 			= require('mime');
var request 		= require('request');

// Middlewares
var flash				= require('express-flash')
var serveFavicon 		= require('serve-favicon');
var morgan 				= require('morgan');
var cookieParser 		= require('cookie-parser');
var bodyParser 			= require('body-parser');
var multipart 			= require('connect-multiparty');
var methodOverride 		= require('method-override');
var expressSession  	= require('express-session');
var errorHandler 		= require('errorhandler');
var expressCookieauth 	= require('express-cookieauth');
var compression 		= require('compression');

var options = _.extend({
	env:			"dev",
	debug_mode:		false,
	port:			80
},processArgs());

options.threads	= Math.min(options.threads, os.cpus().length);
options.cores 	= os.cpus().length;

var app			= express();

// all environments
app.set('port', process.env.PORT || options.port);
app.set('env', options.env);
app.set('views', __dirname + 'templates');
app.set('view engine', 'twig');
app.set('view cache', false);
app.disable('view cache');

app.use(flash());
app.use(serveFavicon(__dirname + '/favicon.ico'));
//app.use(morgan('dev'));
app.use(compression()); 		// Gzip compression
app.use(cookieParser());
//app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
//app.use(busboy());
app.use(methodOverride());

app.use("/static", express.static(__dirname+'/static'));

// development only
if ('dev' == app.get('env')) {
	app.use(errorHandler());
}

// Start the server
http.createServer(app).listen(app.get('port'), function(){
	console.log('Server listening on port ' + app.get('port'));
});




app.get("/", function(req, res){
	res.set("Content-Type", "application/json");
	res.send(200, JSON.stringify({
		name:				"Scaling Test",
		hostname:			os.hostname(),
		type:				os.type(),
		platform:			os.platform(),
		arch:				os.arch(),
		uptime:				os.uptime(),
		cpus:				os.cpus(),
		networkInterfaces:	os.networkInterfaces()
	}, null, 4));
});




function processArgs() {
	var i;
	var args 	= process.argv.slice(2);
	var output 	= {};
	for (i=0;i<args.length;i++) {
		var l1	= args[i].substr(0,1);
		if (l1 == "-") {
			if (args[i+1] == "true") {
				args[i+1] = true;
			}
			if (args[i+1] == "false") {
				args[i+1] = false;
			}
			if (!isNaN(args[i+1]*1)) {
				args[i+1] = args[i+1]*1;
			}
			output[args[i].substr(1)] = args[i+1];
			i++;
		}
	}
	return output;
};

/************************************/
/************************************/
/************************************/
// Process Monitoring
setInterval(function() {
	process.send({
		memory:		process.memoryUsage(),
		process:	process.pid
	});
}, 1000);

// Crash Management
if (!options.debug_mode) {
	process.on('uncaughtException', function(err) {
		console.log("err",err);
	});
}