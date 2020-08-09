const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const formidable = require('express-formidable');
const http = require("http").createServer(app);
const port = process.env.PORT || 3000;
const db = require('./db.js');

// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
	if (req.query.type === 'todo') {
		db.getTodo(todo => {
			res.type('json');
			res.end(todo)
		});
	} else if (req.query.type === 'nice') {
		db.getNice(nice => {
			res.type('json');
			res.end(nice)
		});
	} else {
		// deny request
	}
});

app.get('/post', function (req, res) {
	console.log('get a post request??')
	res.send('you fucked up')
})

app.post('/post', function (req, res) {
	const data = req.body
	console.log('Incoming Post request:')
	console.log(data)

	// need to check for empty strings and date 
	// set up todo JSON 
	const todo = {
		title: data['todo-title'],
		date: data['todo-date'],
		priority: data['todo-priority']
	}
	db.writeTodo(JSON.stringify(todo), () => {
		console.log('write todo')
	})

	// set up nice JSON 
	const nice = {
		message: data['nice-comment']
	}
	db.writeNice(JSON.stringify(nice), () => {
		console.log('write nice')
	})

	res.sendFile(__dirname + '/index.html')
});

http.listen(port, function () {
	console.log(`listening on /:${port}`);
});
