var express = require('express');
var app = express();
var db = require('./models');
var controllers = require('./controllers');
var bodyParser = require('body-parser');

// add the body-parser middleware to the server
app.use(bodyParser.urlencoded({ extended: true }));

// serve the public directory as a static file directory
app.use(express.static('public'));

app.get('/api', controllers.api.index);

app.get('/api/albums', controllers.albums.index);

app.post('/api/albums', controllers.albums.create);

app.get('/', function(req, res) {
	res.sendFile('views/index.html', {root : __dirname});
});

app.listen(3000);