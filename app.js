
/**
 * Module dependencies.
 */

var express = require('express'),
	http = require('http'),
	path = require('path'),
	fs = require('fs'),
	app = express(),
  mongoose = require('mongoose');

// all environments
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));
app.locals.basedir = path.join(__dirname, 'views');
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// dynamically include routes (Controller)
fs.readdirSync(__dirname+'/viewControllers').forEach(function (file) {
  if(file.substr(-3) == '.js') {
      route = require(__dirname+'/viewControllers/' + file);
      route.controller(app);
  }
});
var server = http.createServer(app);

var io = require('socket.io').listen(server);
require(__dirname+"/socket")(io);

var connection_string = '127.0.0.1:27017/geca';
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
  connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
  process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
  process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
  process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
  process.env.OPENSHIFT_APP_NAME;
}

server.listen(app.get('port'),process.env.OPENSHIFT_NODEJS_IP||"localhost", function(){
  console.log('Express server listening on port ' + app.get('port'));
  mongoose.connect("mongodb://"+connection_string);
});
exports.app = app;