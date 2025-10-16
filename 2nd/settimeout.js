let result = 10;

//promise를 async/await로

function delayFunc(delay, operations) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      operations();
      resolve(result);
    }, delay);
  });
}

async function runPromise() {
  try {
    await delayFunc(500, () => (result += 2));
    console.log(result);
    await delayFunc(1000, () => (result *= 2));
    console.log(result);
    await delayFunc(800, () => (result += 5));
    console.log(result);
  } catch (err) {
    console.log(new Erorr(" !! Erorr !!"));
  }

  // promise
  //   .then((resp) => {
  //     console.log(resp);
  //     return new Promise((resolve, reject) => {
  //       setTimeout(() => {
  //         result *= 2;
  //         resolve(result);
  //       }, 1000); // *2
  //     });
  //   })
  //   .then((resp) => {
  //     console.log(resp);
  //     return new Promise((resolve, reject) => {
  //       setTimeout(() => {
  //         result += 5;
  //         resolve(result);
  //       }, 1000); // +5
  //     });
  //   })
  //   .then((data) => console.log(data))
  //   .catch((err) => console.log(err));
}

runPromise();
