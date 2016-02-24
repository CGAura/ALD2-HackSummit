var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var loadData = require('./LoadData.js');

var app = new express();

// all environments
var port = process.env.PORT || 1337;
app.set('port', port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);

app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.set('json spaces', 2);

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', routes.mapView);
app.get('/MapView/', routes.mapView);
app.get("/KlmData/", routes.mapJsonData);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
