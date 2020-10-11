// --------------------------------------------
// VARIABLES
const todoMessage = document.querySelector("#todo-viewer h2 span.message");
const todoDate = document.querySelector("#todo-viewer div.data .date span.data");
const todoPriority = document.querySelector("#todo-viewer div.data .priority span.data");
const niceMessage = document.querySelector("#nice-viewer h2 span.message");
const refreshBtn = document.querySelector("#refresh-btn");
const doneBtn = document.querySelector("#todo-done");
const statusMessage = document.getElementById('status-message');

let todoData = []
let niceData = []
const todoIndexStorageName = 'todoData'
const niceIndexStorageName = 'niceData'

let currentData = {
	todo: { title: `Enjoy yourself`, priority: '0', date: '', index: -1 },
	nice: { message: `You're on the right path to building healthy habits`, index: -1 },
}
let defaultData = {
	todo: { title: `Enjoy yourself`, priority: '0', date: '', index: -1 },
	nice: { message: `You're on the right path to building healthy habits`, index: -1 },
}

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
		// console.log(todoData)
		// console.log(niceData)
	} catch (err) {
		console.log(err);
	}

}
initDb()

let todoLoadSuccess = false;
let niceLoadSuccess = false;

localforage.getItem(todoIndexStorageName).then((data) => {
	todoData = data;
	todoLoadSuccess = true;
	todoLoadSuccess && niceLoadSuccess && displayData(pickRandomData())
}).catch(function (err) {
	console.log(err);
});

localforage.getItem(niceIndexStorageName).then((data) => {
	niceData = data;
	niceLoadSuccess = true;
	todoLoadSuccess && niceLoadSuccess && displayData(pickRandomData())
}).catch(function (err) {
	console.log(err);
});

/**
 * Pick ran
 */
function pickRandomData() {
	// console.log(defaultData)
	// console.log(currentData)

	let returnObj = {}
	let todo, nice;
	let todoExists, niceExists;
	todoExists = niceExists = false;

	if (todoData.length > 0) {
		todoExists = true;
		todo = getRandomItemInArray(todoData)
		currentData.todo = {
			title: todo.item.title,
			date: todo.item.date,
			priority: todo.item.priority,
			index: todo.index
		}
	}

	if (niceData.length > 0) {
		niceExists = true
		nice = getRandomItemInArray(niceData)
		currentData.nice = {
			message: nice.item,
			index: nice.index
		}
	}

	if (!todoExists && !niceExists) {
		return {
			title: defaultData.todo.title,
			date: defaultData.todo.date,
			priority: defaultData.todo.priority,
			message: defaultData.nice.message
		}
	}

	return {
		title: currentData.todo.title,
		date: currentData.todo.date,
		priority: currentData.todo.priority,
		message: currentData.nice.message
	}
}

// --------------------------------------------
// EVENT HANDLERS
// --------------------------------------------
refreshBtn.addEventListener('click', (e) => {
	e.preventDefault();
	todoLoadSuccess && niceLoadSuccess && displayData(pickRandomData())
})

doneBtn.addEventListener('click', (e) => {
	e.preventDefault();
	if (todoData.length < 1) return false;
	// remove the currently shown todo item
	// console.log(todoData[currentData.todo.index])
	todoData.splice(currentData.todo.index, 1)
	// console.log(todoData)
	localforage.setItem(todoIndexStorageName, todoData)

	todoLoadSuccess && niceLoadSuccess && displayData(pickRandomData())

	statusMessage.innerText = 'Todo item deleted'
	statusMessage.classList.add('success')
	setTimeout(() => {
		statusMessage.innerText = ''
	}, 6000);
})

// --------------------------------------------
// UTITLITIES
// --------------------------------------------
function getRandomItemInArray(arr) {
	// return arr[Math.floor(Math.random() * arr.length)];
	const i = Math.floor(Math.random() * arr.length)
	return {
		item: arr[i],
		index: i
	};
}
