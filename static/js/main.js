// --------------------------------------------
// VARIABLES
const todoMessage = document.querySelector("#todo-viewer h2");
const todoDate = document.querySelector("#todo-viewer div.data .date span.data");
const todoPriority = document.querySelector("#todo-viewer div.data .priority span.data");
const niceMessage = document.querySelector("#nice-viewer h2");
const refreshBtn = document.querySelector("#refresh-btn");

let todoData = []
let niceData = []
const todoIndexStorageName = 'todoData'
const niceIndexStorageName = 'niceData'

// --------------------------------------------
// VIEW CONTROLLER
// --------------------------------------------

function displayData(data) {
	todoMessage.innerHTML = data.title;
	todoDate.innerHTML = data.date;
	todoPriority.innerHTML = data.priority;
	niceMessage.innerHTML = data.message;
}

// --------------------------------------------
// DATA CONTROLLER
// --------------------------------------------
// get database. if none exists, create it
async function initDb() {
	try {
		todoData = await localforage.getItem(todoIndexStorageName);
		niceData = await localforage.getItem(niceIndexStorageName);

		if (todoData === null || todoData === typeof 'undefined') {
			localforage.setItem(todoIndexStorageName, [])
			todoData = []
		}
		if (niceData === null || niceData === typeof 'undefined') {
			localforage.setItem(niceIndexStorageName, [])
			niceData = []
		}
		// if output is blank, they are empty arrays
		console.log('todo: ' + todoData)
		console.log('nice: ' + niceData)
	} catch (err) {
		console.log(err);
	}

}
initDb()

let todoLoadSuccess = false;
let niceLoadSuccess = false;

localforage.getItem(todoIndexStorageName).then((data) => {
	console.log(data); // JSON data parsed by `data.json()` call
	todoData = data;
	todoLoadSuccess = true;
	todoLoadSuccess && niceLoadSuccess && displayData(pickRandomData())
}).catch(function (err) {
	console.log(err);
});

localforage.getItem(niceIndexStorageName).then((data) => {
	console.log(data); // JSON data parsed by `data.json()` call
	niceData = data;
	niceLoadSuccess = true;
	todoLoadSuccess && niceLoadSuccess && displayData(pickRandomData())
}).catch(function (err) {
	console.log(err);
});

function pickRandomData() {
	const todo = getRandomItemInArray(todoData)
	const nice = getRandomItemInArray(niceData)

	return {
		title: todo.title,
		date: todo.date,
		priority: todo.priority,
		message: nice
	}
}

// --------------------------------------------
// EVENT HANDLERS
// --------------------------------------------
refreshBtn.addEventListener('click', (e) => {
	e.preventDefault();
	todoLoadSuccess && niceLoadSuccess && displayData(pickRandomData())
})

// --------------------------------------------
// UTITLITIES
// --------------------------------------------
function getRandomItemInArray(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}
