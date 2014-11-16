// pst
// Modules
var express = require('express'),
	logger = require('morgan'),
	favicon = require('serve-favicon'),
	path = require('path');

// App
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(express.static(path.join(__dirname, 'public')));

app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res) {
	res.render('index', { title: 'pst' });
});

console.log('pst application starting on port ' + app.get('port'));
app.listen(app.get('port'));