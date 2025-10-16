// pending, fulfulled, rejected, then()/catch()

const promise = new Promise((resolve, reject) => {
  // 정상완료 -> 첫번째 매개값으로 받은 함수 호출
  // 거부 -> 두번째 매개값으로 받은 함수 호출
  try {
    setTimeout(() => {
      resolve({ retCode: "Success", retVal: ["공", "남", "석"] });
    }, 1000);
  } catch (err) {
    reject(new Error("!! Error !!"));
  }
});

promise
  .then((response) => {
    console.log(response);
  })
  .catch((err) => {
    console.error(err);
  });

fetch("")
  .then((resp) => resp.json())
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
