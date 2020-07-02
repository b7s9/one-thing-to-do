const todoMessage = document.querySelector("#todo-viewer h2");
const niceMessage = document.querySelector("#nice-viewer h2");

console.log("main.js");
let data = getData();

function getData() {
  fetch("./data/todo-data.json")
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
}

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

function getTodo(data) {
  return getRandomItemInArray(data["todo-data"]);
}

function getRandomItemInArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

getData("./data/data.json").then((data) => {
  console.log(data); // JSON data parsed by `data.json()` call

  let todo = getRandomItemInArray(data.db["todo-data"]);
  todoMessage.innerHTML = todo.title;

  let niceMsg = getRandomItemInArray(data.db["nice-data"]);
  niceMessage.innerHTML = niceMsg.message;
});
