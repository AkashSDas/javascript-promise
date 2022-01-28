import fetch from "node-fetch";

const promise = fetch("https://jsonplaceholder.typicode.com/todos/1");

promise
  .then((res) => res.json())
  .then((user) => {
    // throw new Error("uh oh");
    console.log("😁", user.title);
  })
  .catch((err) => console.log("😭", err));

console.log("🥪 Synchronous");
