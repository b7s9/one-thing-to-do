const express = require('express');
const app = express();
const fs = require('fs');
const http = require("http").createServer(app);
const port = process.env.PORT || 3000;
const initDb = require('./init-db.js');

initDb.test('hello world');
// initializeJSON('./data/data.json', );

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});

http.listen(port, function () {
	console.log(`listening on /:${port}`);
});