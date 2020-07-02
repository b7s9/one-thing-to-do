const form = document.getElementById("new-entry");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("form submitted at: " + e.timeStamp);
  new FormData(form);
});

form.addEventListener("formdata", (e) => {
  console.log("formdata fired");

  console.log(e.formData);

  // Get the form data from the event object
  let data = e.formData;
  for (var value of data.entries()) {
    console.log(value);
  }

  // submit the data via XHR
  // var request = new XMLHttpRequest();
  // request.open("POST", "/formHandler");
  // request.send(data);
});
