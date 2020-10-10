// --------------------------------------------
// VARIABLES
// --------------------------------------------
const form = document.getElementById("new-entry");
const dateField = document.getElementById('todo-date');
// index of all hashes for data
// let todoIndex = []
// let niceIndex = []
// const todoIndexStorageName = 'todoIndex'
// const niceIndexStorageName = 'niceIndex'

let todoData = []
let niceData = []
const todoIndexStorageName = 'todoData'
const niceIndexStorageName = 'niceData'

// --------------------------------------------
// VIEW CONTROLLER
// --------------------------------------------



// set the html value (FF/Chrome override this, unfortunately)
dateField.value = getWeekFromToday();

// --------------------------------------------
// DATA CONTROLLER
// --------------------------------------------

// /**
//  * 
//  * @param {FormData} formData 
//  */
// const validateForm = (formData) => {
// 	return new Promise((resolve, reject) => {
// 		for (entry of formData.entries()) {
// 			console.log(entry[0] + ', ' + entry[1])
// 		}
// 		let dateValue = formData.get('todo-date')
// 		console.log(dateValue)
// 		formData.set('todo-date', 'lkjasdfkljasdff');
// 		// if date not set, default to a week from today
// 		// dateValue === '' && formData.set('todo-date', 'lkjasdfkljasdff');
// 		console.log(dateValue)
// 	})
// }

// get hash list. if none exists, create it
async function initDb(todoData, niceData) {
	try {
		const todoData = await localforage.getItem(todoIndexStorageName);
		const niceData = await localforage.getItem(niceIndexStorageName);

		if (todoData === null) {
			localforage.setItem(todoIndexStorageName, [])
		}
		if (niceData === null) {
			localforage.setItem(niceIndexStorageName, [])
		}
		// if output is blank, they are empty arrays
		console.log('todo: ' + todoData)
		console.log('nice: ' + niceData)
	} catch (err) {
		console.log(err);
	}

}
initDb(todoData, niceData)

/**
 * 
 * @param {FormData} formData 
 */
const writeData = (formData) => {
	const hash = generateHash()
	const todo = {
		title: formData.get('todo-title'),
		date: formData.get('todo-date'),
		priority: formData.get('todo-priority')
	};
	const nice = formData.get('nice-comment')

	todoData.push(todo)
	localforage.setItem(todoIndexStorageName, todoData).then((todoData) => {
		console.log('saved data: ' + todoData)
	}).catch(function (err) {
		// This code runs if there were any errors
		console.log(err);
	});

	niceData.push(nice)
	localforage.setItem(niceIndexStorageName, niceData).then((niceData) => {
		console.log('saved data: ' + niceData)
	}).catch(function (err) {
		// This code runs if there were any errors
		console.log(err);
	});
}


// --------------------------------------------
// VALIDATORS
// --------------------------------------------


// --------------------------------------------
// EVENT HANDLERS
// --------------------------------------------

form.addEventListener('submit', (e) => {
	e.preventDefault()
	let data = new FormData(form)
	// validateForm(data)
	writeData(data)
})

// --------------------------------------------
// UTILITIES
// --------------------------------------------
function generateHash() {
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

function getWeekFromToday() {
	let date = new Date();
	// default to a week from today
	date.setDate(date.getDate() + 7);
	// format human readable
	const dateValue = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
	return dateValue;
}
