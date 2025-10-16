// sample.txt 단어 갯수 => ?개, 'e'문자가 포함된 => ?개

const fs = require("fs");

let world = fs.readFileSync("sample.txt", "utf-8");
let loworld = world.toLowerCase();
let worAry = loworld.split(" ");
let search = "lo";
let incluAry = worAry.reduce((acc, item) => {
  if (item.includes(search)) {
    acc.push(item);
  }
  return acc;
}, []);
console.log(
  `sample.txt의 단어 갯수: ${worAry.length}
'${search}' 포함된 단어 갯수: ${incluAry.length}
[${incluAry}]`
);
