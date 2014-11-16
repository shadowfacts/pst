// pst
// Modules
var express = require('express'),
	logger = require('morgan'),
	path = require('path');

// App
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));

app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res) {
	res.render('index', { title: 'pst' });
});