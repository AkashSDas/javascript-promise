const arrived = false;

// Create a ride
const ride = new Promise((resolve, reject) => {
  if (arrived) {
    resolve("Driver arrived");
  } else {
    reject("Driver bailed");
  }
});

// Consume
ride
  .then((value) => {
    console.log(value);
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    console.log("All settled");
  });
