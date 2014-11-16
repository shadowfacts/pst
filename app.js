// pst
// Modules
var express = require('express'),
	logger = require('morgan'),
	favicon = require('serve-favicon'),
	bodyParser = require('body-parser'),
	multer = require('multer'),
	path = require('path'),
	fs = require('fs');

// App
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer({ dest: './uploads/' }));

app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res) {
	res.render('index', { title: 'pst' });
});

app.post('/', function(req, res) {
	console.log('Creating pst: ' + req.param('name'));
	var pstPath = path.join(path.join(__dirname, 'pst'), req.param('name'));
	fs.exists(pstPath, function(exists) {
		if (!exists) {
			fs.writeFile(pstPath, req.param('data'), function(err) {
				if (!err) {
					res.redirect('/pst/' + req.param('name'));
				} else {
					res.render('error', { title: 'pst', error: err });
				}
			});
		} else {
			res.render('alreadyExists', { title: req.param('name') + ' | pst', pstName: req.param('name') });
		}
	});
});

app.get('/pst/:name', function(req, res) {
	var pstPath = path.join(path.join(__dirname, 'pst'), req.params.name);
	fs.exists(pstPath, function(exists) {
		if (exists) {
			fs.readFile(pstPath, function(err, data) {
				if (!err) {
					res.render('get', { title: req.params.name + ' | pst', pstName: req.params.name, pstData: data });
				} else {
					res.render('error', { title: 'pst', error: err});
				}
			});
		} else {
			res.render('doesNotExists', { title: req.params.name + ' | pst', pstName: req.params.name });
		}
	});
});

console.log('pst application starting on port ' + app.get('port'));
app.listen(app.get('port'));