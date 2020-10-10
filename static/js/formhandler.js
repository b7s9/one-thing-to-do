// --------------------------------------------
// VARIABLES
// --------------------------------------------
const form = document.getElementById("new-entry");
const dateField = document.getElementById('todo-date');

const getWeekFromToday = () => {
	let date = new Date();
	// default to a week from today
	date.setDate(date.getDate() + 7);
	// format human readable
	const dateValue = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
	return dateValue;
}

// set the html value (FF/Chrome override this)
dateField.value = getWeekFromToday();

// --------------------------------------------
// EVENT HANDLERS
// --------------------------------------------

form.addEventListener('submit', (e) => {
	e.preventDefault()
	let data = new FormData(form)
	for (entry of data.entries()) {
		console.log(entry[0] + ', ' + entry[1])
	}
})
