// Array.prototype.reduce();
// reduce(function(이전 순번의 요소값,요소,인덱스,배열) {...})

import { studentAry } from "./data.js";
console.log(studentAry);

let result = [1, 2, 3, 4, 5].reduce((acc, item) => {
  console.log(`acc: ${acc}, item: ${item}`);
  return item;
}, 100); // acc 초기값을 100으로 지정
console.log(`결과: ${result}`);

const evenAry = (acc, item, idx) => {
  console.log(`acc: ${acc}, item: ${item}`);
  if (idx % 2 == 0) {
  }
};

function sumAry(acc, item) {
  return (acc += item);
}

result = [1, 2, 3, 4, 5].reduce(evenAry, []);
console.log(`결과: ${result}`);

result = [23, 11, 56, 33, 47].reduce((acc, item, idx) => {
  //acc, item 큰값을 반환
  console.log(idx, acc, item);
  return acc > item ? acc : item;
}, 0);
console.log(`최대값: ${result}`);

result = [23, 11, 56, 33, 47].reduce((acc, item, idx) => {
  //acc, item 작은값을 반환
  console.log(idx, acc, item);
  return acc < item ? acc : item;
}, 100);
console.log(`최소값: ${result}`);

// 60점 이상 패스한 사람만 배열에 저장
result = studentAry.reduce((acc, item) => {
  if (item.score >= 60) {
    acc.push(item);
  }
  return acc;
}, []);
console.table(result);

const numAry = [23, 12, 45, 87, 12, 45];
result = numAry.reduce((acc, item) => {
  if (!acc.includes(item)) {
    acc.push(item);
  }
  return acc;
}, []);
console.log(result);
