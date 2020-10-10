const todoMessage = document.querySelector("#todo-viewer h2");
const todoDate = document.querySelector("#todo-viewer div.data .date span.data");
const todoPriority = document.querySelector("#todo-viewer div.data .priority span.data");
const niceMessage = document.querySelector("#nice-viewer h2");

console.log("main.js");

async function getData(url = "") {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "default", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

//  this needs to fetch from cache 
// getData("/get?type=todo").then((data) => {
//   console.log(data); // JSON data parsed by `data.json()` call
//   todoMessage.innerHTML = data.title;
//   todoDate.innerHTML = data.date;
//   todoPriority.innerHTML = data.priority;
// });

// getData("/get?type=nice").then((data) => {
//   console.log(data); // JSON data parsed by `data.json()` call
//   niceMessage.innerHTML = data.message;
// });
