const form = document.getElementById("new-entry");
const dateField = document.getElementById('todo-date');

let date = new Date();
date.setDate(date.getDate() + 7);
const dateValue = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
dateField.value = dateValue;

// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   let formdata = new FormData(form);
//   // for (var value of formData.entries()) {
//   //   console.log(value);
//   // }
//   // console.log(formdata.getAll())

//   let request = new XMLHttpRequest();
//   request.open("POST", "/add/nice");
//   request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
//   request.send(formdata);
//   console.log(request)
// });

// form.addEventListener("formdata", (e) => {
//   console.log("formdata fired");

//   let data = {};
//   e.formData.forEach((value, key) => { data[key] = value });
//   let json = JSON.stringify(data);

//   console.log(json)

//   // submit the data via XHR
//   let request = new XMLHttpRequest();
//   request.open("POST", "/post");
//   request.setRequestHeader('Content-Type', 'application/json')
//   request.send(e.formData);
//   console.log(request)
// });
