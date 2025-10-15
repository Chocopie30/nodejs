//Array.prototype.sort();
"abc".split("").sort();

let frutis = ["banana", "apple", "mango"];
//기본 정렬, 알파벳순서
console.log(frutis.sort());

let points = [2, 14, 10, 100, 1];

//기본 정렬
points.sort();
console.log(`기본정렬 : ${points}`); // 1,10,100,14,2

// 오름차순 : -값을 반환, 내림차순 : +값을 반환.
points.sort(function (a, b) {
  return a - b; //오름차순;
});
console.log(`오름차순 : ${points}`); // 1,2,10,14,100

//내림차순
points.sort(function (a, b) {
  if (a > b) {
    return -1;
  } else {
    return 1;
  }
});
console.log(`내림차순 : ${points}`); //100,14,10,2,1

const students = [];
students.push({ sno: 100, sname: "호이도잉", score: 78 });
students.push({ sno: 200, sname: "처이도잉", score: 55 });
students.push({ sno: 300, sname: "주이뇨잉", score: 95 });

//오름차순
students.sort(function (a, b) {
  if (a.sname < b.sname) {
    return -1;
  } else {
    return 1;
  }
});
console.log(`-------------------------------------`);
console.log(`이름으로 오름차순 정렬`);
console.log(students);

// filter(function(요소,인덱스,배열){})
let result = students.filter((item) => item.score < 80);

console.log(`-------------------------------------`);
console.log(`점수가 80보다 낮은 사람 필터`);
console.log(result);

// map(function) => 매핑(A -> A') / 학생번호,이름,점수 -> 학생번호,이름,통과여부
result = students.map(({ sno, sname, score }) => {
  // { sno, sname, score } = item : object destructuring
  const obj = {};
  obj.no = sno;
  obj.name = sname;
  obj.pass = score >= 60 ? "P" : "F";
  return obj;
});
console.log(`-------------------------------------`);
console.log(`점수가 60보다 높은 학생 통과여부`);
console.log(result);
