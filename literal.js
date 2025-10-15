import { getStudentInfo } from "./data.js";

let myName = "호잉";
console.log("hello, " + myName);
console.log(`Hello, ${myName}`);

let n1 = 10;
let n2 = 11;
console.log(`n1 + n2 = ${n1 + n2}`);

console.log(
  `${getStudentInfo()
    .map((person) => "친구이름 =>" + person)
    .join(" ")}`
);

// 펼침연산자(spread operator)
let friends = ["찰나가", "영원이", "될때"];
console.log(...friends);
let newAry = [...friends, ...getStudentInfo()];
//...배열을 펼쳐 넣지 않으면 [[]] 모양이 됨
console.log(newAry);

// Object Destructuring
const person = {
  firstName: "주뇽",
  lastName: " 썩",
  age: 31,
};
// let firstName = person.firstName;
let { firstName: fn, lastName: ln, age } = person;
console.log(fn, ln, age);
// Array Destructuring
let [ary1, ary2, ...ary3] = getStudentInfo();
console.log(ary1, ary2, ary3);
