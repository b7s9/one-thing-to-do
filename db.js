const fs = require('fs');
const path = require('path');
const todoDirectory = 'data/todo-data/';
const niceDirectory = 'data/nice-data/';
let todoFiles = [];
let niceFiles = [];


function ensureDirectoryExistence(filePath) {
	var dirname = path.dirname(filePath);
	if (fs.existsSync(dirname)) {
		return true;
	}
	ensureDirectoryExistence(dirname);
	fs.mkdirSync(dirname);
}
console.log('todo directory: ' + ensureDirectoryExistence(todoDirectory + '_db.json'));
console.log('nice directory: ' + ensureDirectoryExistence(niceDirectory + '_db.json'));

// fs.promises.mkdir(path.dirname(todoDirectory + '_db.txt'), { recursive: true })
// 	.then(x => fs.promises.writeFile(todoDirectory + '_db.txt', "database initialized"))

// fs.promises.mkdir(path.dirname(niceDirectory + '_db.txt'), { recursive: true })
// 	.then(x => fs.promises.writeFile(niceDirectory + '_db.txt', "database initialized"))

function _getRandomItemInArray(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}

function _generateHash() {
	let str = '';
	// numbers = 48-57
	// uppercase = 65-90
	// lowercase = 97-122
	for (let i = 0; i < 20; i++) {
		let char = ''
		let charCode = 0;
		if (Math.floor(Math.random() * 2)) {
			charCode = Math.floor(Math.random() * 10)
			char = String.fromCharCode(charCode + 48)
		} else {
			charCode = Math.floor(Math.random() * 26)
			if (Math.floor(Math.random() * 2)) {
				char = String.fromCharCode(charCode + 97)
			} else {
				char = String.fromCharCode(charCode + 65)
			}
		}
		str += char
	}
	return str;
}

/**
 * Counts the number of json files in a directory
 * @param {String} directory Path to data files
 * @returns {Array} Array
 */
function _countFiles(directory) {
	// reset array (this method will be called multiple times)
	let fileArr = [];

	// must be synchronous since this loads initial "database"
	fs.readdirSync(directory).forEach(file => {
		// ignore .DS_Store file 
		file.match(/^[0-9a-zA-Z]/) && fileArr.push(file);
	});
	console.log(fileArr)
	return fileArr;
}

// --------------------------------------------------------
// TODO
// --------------------------------------------------------
/**
 * Gets a random todo as json parsed object
 * @param {function} callback 
 */
function _getTodo(callback = () => { }) {
	// only use this if parameterizing index of get
	// let file = '';
	// if (index > -1) {
	// 	file = files[index];
	// } else {
	// 	file = _getRandomItemInArray(files);
	// }

	todoFiles = _countFiles(todoDirectory);

	let file = _getRandomItemInArray(todoFiles);
	fs.readFile(todoDirectory + '' + file, 'utf8', function (err, data) {
		if (err) throw err;
		callback(data)
	});
}

/**
 * Writes a new todo file
 * @param {json string} data 
 * @param {function} callback what to do once it's done
 */
function _writeTodo(data, callback = () => { }) {
	const filename = todoDirectory + _generateHash() + '.json';
	fs.writeFile(filename, data, 'utf8', err => {
		if (err) throw err;
		_countFiles(todoDirectory);
		callback(filename)
	});
}

// --------------------------------------------------------
// NICE
// --------------------------------------------------------
function _getNice(callback = () => { }) {
	niceFiles = _countFiles(niceDirectory);

	let file = _getRandomItemInArray(niceFiles);
	fs.readFile(niceDirectory + '' + file, 'utf8', function (err, data) {
		if (err) throw err;
		callback(data)
	});
}

function _writeNice(data, callback = () => { }) {
	const filename = niceDirectory + _generateHash() + '.json';
	fs.writeFile(filename, data, 'utf8', err => {
		if (err) throw err;
		_countFiles(niceDirectory);
		callback(filename)
	});
}

// --------------------------------------------------------
// EXPORTS
// --------------------------------------------------------

module.exports.getTodo = _getTodo;
module.exports.writeTodo = _writeTodo;

module.exports.getNice = _getNice;
module.exports.writeNice = _writeNice;
