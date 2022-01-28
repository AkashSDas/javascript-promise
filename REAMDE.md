# javascript-promise

## Promise Fundamentals

---

A `promise` represents a value that’s unknown now, that may become known in future.

Promise manages a single asynchronous value that can be handled in the future.

Think of it as a `ride hailing` app. When you request a ride, the driver make a `promise` to give you ride.

- While you’re waiting, the ride is `pending`
- If everything goes right, the ride will be `fulfilled`
- But in some case the ride might get `rejected`

Whatever may the case, the original request is `settled`.

As a developer, you may want to create a promise to represent a asynchronous value. But more often than not. you’ll be promises to use result of an asynchronous operation.

When a `Promise` is constructed it start with `pending` state. It’s your job to define a callback function called `executor` , which is a function that resolves a value, or rejects (error). The `consumer` of the promise consumes it using the `then` method, which is waiting for the asynchronous value to be fulfilled. When that happens we can call a function in `then` with `async value` being it’s argument. To handle `rejection` use the `catch` method which again gets a callback having `error` as it’s argument. You can use `finally` to execute any code, no matter what. `then`, `catch` returns `promises` , so they can be chained together.

## Async Await

---

Anything we don on the web is time consuming OR `blocking` , therefore `async await` is very important for a JS dev.

### General Overview of Event Loop

---

Both the `brower` & `node JS` are always running a single threaded event loop to run your code.

- On the first go around it run all the `sync` code but might also `queue` up `async` events to be called back later, something like fetching from API, in this case the event loop will on doing it’s thing and fetching for API will happen in separate thread pool. In some point in future the we’ll fetch some data from the API and will let the event loop know that it’s (`async event`) is ready to be called back.
- Interesting thing is that
  - If it’s a `macro task` like `setTimeout` OR `setInterval`, then it will be executed on the `next event loop`
  - But if it’s a `micro task` like a `fulfilled promise` then it will be called back before the start of the next event loop
