const fs = require('fs');
const todoDirectory = 'data/todo-data/';
const niceDirectory = 'data/nice-data/';
let todoFiles = [];
let niceFiles = [];

function _getRandomItemInArray(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}

// --------------------------------------------------------
// TODO
// --------------------------------------------------------

_countTodos(todoDirectory);
function _countTodos(directory) {
	// reset array (this method will be called multiple times)
	todoFiles = [];

	// must be synchronous since this loads initial "database"
	fs.readdirSync(directory).forEach(file => {
		file.match(/^[0-9]/) && todoFiles.push(file);
	});
	todoFileLength = todoFiles.length
}

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
	let index = todoFiles.length + 1;
	const filename = todoDirectory + '' + index + '.json';
	fs.writeFile(filename, data, 'utf8', err => {
		if (err) throw err;
		_countTodos(todoDirectory);
		callback(filename)
	});
}

// --------------------------------------------------------
// NICE
// --------------------------------------------------------


// --------------------------------------------------------
// EXPORTS
// --------------------------------------------------------

module.exports.getTodo = _getTodo;
module.exports.writeTodo = _writeTodo;
