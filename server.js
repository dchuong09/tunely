var express = require('express');
var app = express();
var db = require('./models');
var controllers = require('./controllers');

app.use(express.static('public'));

app.get('/api', controllers.api.index);

app.get('/api/albums', controllers.albums.index);

app.get('/', function(req, res) {
	res.sendFile('views/index.html', {root : __dirname});
});

app.listen(3000);