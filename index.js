const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const formidable = require('express-formidable');
const http = require("http").createServer(app);
const port = process.env.PORT || 3000;
const db = require('./db.js');

// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(formidable());

let tempData = {
	"title": "Finish this app",
	"date": "2020-8-1",
	"priority": "1"
};

// db.writeTodo(JSON.stringify(tempData), (filename) => {
// 	console.log('new todo: ' + filename)
// });

let tempNice = 'you have an awesome support network';

app.use('/static', express.static(__dirname + '/static'));

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});

app.get('/add', function (req, res) {
	res.sendFile(__dirname + '/add.html');
});

// --------------------------------------------------------
// API
// --------------------------------------------------------

app.get('/get', function (req, res) {
	console.log('Incoming Get request:')
	if (req.query.type === 'todo') {
		db.getTodo(todo => {
			res.type('json');
			res.end(todo)
			console.log(res.headersSent)
		});
	} else if (req.query.type === 'nice') {

	} else {
		// deny request
	}
});

app.post('/post', function (req, res) {
	console.log('Incoming Post request:')
	console.log(req.body);
	res.send(req.body);
});

http.listen(port, function () {
	console.log(`listening on /:${port}`);
});
