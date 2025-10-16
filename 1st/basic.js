console.log("node start");
let times = 3;
const PI = 3.14;
//PI = 2;

// 객체 할당
const obj = {};
obj.age = 10;
console.log(obj);

for (let i = 1; i < times; i++) {
  console.log(i);
}

{
  let times = 4;
  console.log(times);
}
console.log(times);

// 1.함수 정의
function sum(n1 = 0, n2 = 0) {
  return n1 + n2;
}
// 2.함수 표현
const ssum = (n1 = 0, n2 = 0) => {
  return n1 + n2;
};
console.log(`sum(1,2)의 결과는 ${ssum(1, 2)}`);
