const tick = Date.now();
const log = (v) => console.log(`${v} \n Elapsed: ${Date.now() - tick}`);

// This code will run on the main thread all block all the other
// remaining code until it has iterated 1 billion times
// const codeBlocker = () => {
//   let i = 0;
//   while (i < 1000000000) {
//     i++;
//   }

//   return "🐷 billion loops done";
// };

// log("🥪 Synchronous 1");
// log(codeBlocker());
// log("🥪 Synchronous 2");

// Output
// 🥪 Synchronous 1
//  Elapsed: 0
// 🐷 billion loops done
//  Elapsed: 706
// 🥪 Synchronous 2
//  Elapsed: 706

// Wrap it with a promise to get it off the main thread and
// run it as a micro task
//
// So you might think that wrapping it with a Promise will take it
// off the main thread, but the actual creation of the Promise & the
// big while loop is still happening on the main thread, it's only the
// resolving of the value that happens as a micro task
// const codeBlockBadPromiseExecution = () => {
//   return new Promise((resolve, reject) => {
//     let i = 0;
//     while (i < 1000000000) {
//       i++;
//     }

//     resolve("🐷 billion loops done");
//   });
// };

// log("🥪 Synchronous 1");
// codeBlockBadPromiseExecution().then(log);
// log("🥪 Synchronous 2");

// Output
// 🥪 Synchronous 1
//  Elapsed: 0
// 🥪 Synchronous 2
//  Elapsed: 693
// 🐷 billion loops done
//  Elapsed: 693

// The second sync value took 693 millisecond since that while loop is blocking
// the main thread

// To make sure all of the sync code run as fast as possible
// first resolve the promise and then run while loop inside that
// then
// Putting the while loop inside a resolved promise we're guaranteed
// that it will be executed that all the sync code in the current macro
// task has been completed
const codeBlockGoodPromiseExecution = () => {
  return Promise.resolve().then((v) => {
    let i = 0;
    while (i < 1000000000) {
      i++;
    }

    return "🐷 billion loops done";
  });
};

log("🥪 Synchronous 1");
codeBlockGoodPromiseExecution().then(log);
log("🥪 Synchronous 2");

// Output
// 🥪 Synchronous 1
//  Elapsed: 0
// 🥪 Synchronous 2
//  Elapsed: 7
// 🐷 billion loops done
//  Elapsed: 927
