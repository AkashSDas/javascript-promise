// Difference in order of execution of sync & async (micro & macro tasks) code

// L1
console.log("Sync 1");

// L2
setTimeout((_) => console.log("Timeout 2"), 0); // macro task

// L3
Promise.resolve().then((_) => console.log("Promise 3")); // micro task

// L4
console.log("Sync 4");

// Output
// Sync 1
// Sync 4
// Promise 3
// Timeout 2
