// Object
let obj = new Object(); // 객체
obj.name = "김말이";

let student1 = {
  sno: 100,
  sname: "고길동",
  grade: 1,
  height: 183,
  weight: 80,
  showInfo: function () {
    return `학번:${this.sno}, 이름:${this.sname}`;
  },
};
let student2 = {
  sno: 300,
  sname: "다운길동",
  grade: 1,
  height: 160,
  weight: 45,
  // showInfo: function () {
  //   return `학번:${this.sno}, 이름:${this.sname}`;
  // },
};
console.log(student1.showInfo());
// console.log(student2.showInfo());

// 학생 -> 정의
class Student {
  constructor(sno, sname, grade, height, weight) {
    this.sno = sno;
    this.sname = sname;
    this.grade = grade;
    this.height = height;
    this.weight = weight;
  }
  showInfo() {
    return `학번:${this.sno}, 이름:${this.sname}`;
  }
}

// 인스턴스 생성
let std1 = new Student(200, "스탑길동", 2, 168, 55);
let std2 = new Student(400, "스테이길동", 4, 170, 77);

console.log(std1.showInfo());
console.log(std2.showInfo());
