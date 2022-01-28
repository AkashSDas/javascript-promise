const tick = Date.now();
const log = (v) => console.log(`${v} \n Elapsed: ${Date.now() - tick}`);

// Async part of the equation

// Basic
const getFruit = async (name) => {
  const fruits = {
    pineapple: "🍍",
    peach: "🍑",
    strawberry: "🍓",
  };

  return fruits[name];
};

// This function is same as the above one
// So the magic that happens with `async` is that it takes the
// return value & resolves it as the promise
// But extra thing that it does which this function doesn't is that
// it set's up a context for you to use the await keyword
// const getFruit = (name) => {
//   const fruits = {
//     pineapple: "🍍",
//     peach: "🍑",
//     strawberry: "🍓",
//   };

//   return Promise.resolve(fruits[name]);
// };

// Async + Await - 1
const makeSmoothie = async () => {
  const a = await getFruit("pineapple");
  const b = await getFruit("strawberry");

  return [a, b];
};

// One of the most annoying things with promises is that
// it's difficult to share result values between multiple
// steps in the promise chain, but async-await solves this
// problem nicely

// Writing the above code using promise (lot of complexity)
const makeSmoothie2 = () => {
  let a;
  return getFruit("pineapple")
    .then((v) => {
      v = a;
      return getFruit("strawberry");
    })
    .then((v) => [v + a]);
};

// The single biggest mistake people make while using async-await
// (I'm guilty of that too) is that failing to run the code concurrently
// In `makeSmoothie` we're waiting for getting pineapple and then waiting for
// strawberry. Since getting strawberry is independent of what's pineapple's value
// is, they should run concurrently and this will save our time
const makeSmoothie3 = async () => {
  const a = getFruit("pineapple");
  const b = getFruit("strawberry");

  return Promise.all([a, b]);
};

// Easy error handling
const makeErrorSmoothie3 = async () => {
  try {
    const a = getFruit("pineapple");
    const b = getFruit("strawberry");

    throw "broken";
    return Promise.all([a, b]);
  } catch (err) {
    console.log(err);

    // Here
    // - We can catch the error and throw another error
    // - OR we can send some value
    // Your decision here will detech the control flow for the
    // consumer of this promise
    //
    // If you are returning a value then it is basically ignnoring the
    // error and providing a replacement for it BUT if you throw error
    // then this will break consumer's try block and will be handled by
    // their catch block
    return "🐼 We are going to be fine...";
    throw `💩 It's broken!`;
  }
};

// TIPS
const fruits = ["peach", "pineapple", "strawberry"];

// Be careful while using async-await in a `map` OR `forEach`
// loop. You'll think that here await will pause the function
// in this context, but this doesn't happens. Instead here we'll
// run all the promises concurrently, which is a behavior you might
// not want here
const smootie = fruits.map(async (v) => {
  const emoji = getFruit(v);
  log(emoji);
  return emoji;
});

// If you want to loop and want it pause at every iteration on await
// then you would've to use traditional for loop. When you run a promise
// like this, it will pause each step the loop util that promise is resolved
const fruitLoop = async () => {
  for (const f of fruits) {
    const emoji = await getFruit(f);
    log(emoji);
  }
};

// But more often than not you want to run everything concurrently
// and in that case you can use for await
// If you have a promise that you know would resolve to an array then
// you can actually use the await keyword directly in you loop which will
// await the array of items to resolve and then loop over them immediately
const smoothie = fruits.map((v) => getFruit(v));
const fruitLoop2 = async () => {
  for await (const emoji of smoothie) {
    log(emoji);
  }
};

// Conditions
const fruitInspection = async () => {
  if ((await getFruit("peach")) === "🍑") {
    console.log("looks peachy!");
  }
};

fruitInspection();

// Error handling like a PRO
const runAsync = async (promise) => {
  try {
    const data = await promise;
    return [data, null];
  } catch (err) {
    console.log(err);
    return [null, err];
  }
};

log(runAsync(getFruit("pineapple")));
