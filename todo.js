import { jsonString } from "./data.js";
let jsonObj = JSON.parse(jsonString);

console.table(jsonObj);

//reduce 출력: Female => id, fullname,email, salary => resultAry
// let resultAry = jsonObj.reduce(
//   (acc, { id, first_name, last_name, email, gender, salary }) => {
//     if (gender == "Female") {
//       acc.push({ id, FullName: first_name + " " + last_name, email, salary });
//     }
//     return acc;
//   },
//   []
// );
// console.table(resultAry);
//reduce는 filter + map 기능이 동시에 가능

//--------------------------------------
// jsonObj의 gender별 인원
// 성별 : ['first_name',...] 출력
// let resultAry = jsonObj.reduce(
//   (acc, item) => {
//     (item.gender === "Male" ? acc.Male : acc.Female).push(item.first_name);
//     return acc;
//   },
//   { Male: [], Female: [] }
// );

//교수님 코드 - 유동적..
let resultAry = jsonObj.reduce((acc, item) => {
  const key = item["gender"];
  if (!acc[key]) {
    acc[key] = [];
  }
  acc[key].push(item.first_name);
  return acc;
}, {});
console.log(resultAry);
