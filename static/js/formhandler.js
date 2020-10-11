// --------------------------------------------
// VARIABLES
// --------------------------------------------
const form = document.getElementById("new-entry");
const dateField = document.getElementById('todo-date');
const statusBox = document.getElementById('status-box');
const statusMessage = document.getElementById('status-message');
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

/**
 * 
 * @param {FormData} formData 
 */
const writeData = (formData) => {
	return new Promise((resolve, reject) => {
		let todoWriteSuccess = false;
		let niceWriteSuccess = false;
		const hash = generateHash()
		const todo = {
			title: formData.get('todo-title'),
			date: formData.get('todo-date'),
			priority: formData.get('todo-priority')
		};
		const nice = formData.get('nice-comment')

		console.log('todo data: ' + todoData)
		todoData.push(todo)
		console.log('todo data2: ' + todoData)
		localforage.setItem(todoIndexStorageName, todoData).then((todoData) => {
			todoWriteSuccess = true;
			niceWriteSuccess && todoWriteSuccess && resolve('Data saved successfully')
		}).catch(function (err) {
			// This code runs if there were any errors
			reject(err)
		});

		niceData.push(nice)
		localforage.setItem(niceIndexStorageName, niceData).then((niceData) => {
			niceWriteSuccess = true;
			niceWriteSuccess && todoWriteSuccess && resolve('Data saved successfully')
		}).catch(function (err) {
			// This code runs if there were any errors
			reject(err)
		});
	})
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
	writeData(data).then(message => {
		form.reset()
		statusMessage.innerText = message
		statusMessage.classList.remove('danger')
		statusMessage.classList.add('success')
		// statusBox.hidden = false
		setTimeout(() => {
			statusMessage.innerText = ''
		}, 6000);
	}).catch(message => {
		console.log(message)
		statusMessage.innerText = message
		statusMessage.classList.remove('success')
		statusMessage.classList.add('danger')
		// statusBox.hidden = false
	})
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
