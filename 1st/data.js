// module기능

const studentAry = [
  { sno: 100, sname: "홍씨", score: 80 },
  { sno: 200, sname: "김씨", score: 57 },
  { sno: 300, sname: "박씨", score: 77 },
  { sno: 400, sname: "오씨", score: 92 },
];
function sum(a, b) {
  return a + b;
}
const PI = 3.14;

function getStudentInfo() {
  return ["시작의", "푸름에", "모든", "이름에"];
}

let jsonString = `[{
    "id": 1,
    "first_name": "Ronnie",
    "last_name": "Stuckey",
    "email": "rstuckey0@ted.com",
    "gender": "Male",
    "salary": 4980
  },
  {
    "id": 2,
    "first_name": "Jillian",
    "last_name": "McManamon",
    "email": "jmcmanamon1@vistaprint.com",
    "gender": "Female",
    "salary": 5748
  },
  {
    "id": 3,
    "first_name": "Fiona",
    "last_name": "Kirvin",
    "email": "fkirvin2@hhs.gov",
    "gender": "Female",
    "salary": 5331
  },
  {
    "id": 4,
    "first_name": "Eydie",
    "last_name": "Greenacre",
    "email": "egreenacre3@cyberchimps.com",
    "gender": "Female",
    "salary": 5438
  },
  {
    "id": 5,
    "first_name": "Jay",
    "last_name": "Shelborne",
    "email": "jshelborne4@friendfeed.com",
    "gender": "Male",
    "salary": 7956
  },
  {
    "id": 6,
    "first_name": "Levey",
    "last_name": "Curley",
    "email": "lcurley5@msn.com",
    "gender": "Male",
    "salary": 5372
  },
  {
    "id": 7,
    "first_name": "Drud",
    "last_name": "Sawden",
    "email": "dsawden6@sourceforge.net",
    "gender": "Male",
    "salary": 4292
  },
  {
    "id": 8,
    "first_name": "Wenonah",
    "last_name": "Mustchin",
    "email": "wmustchin7@wikispaces.com",
    "gender": "Female",
    "salary": 5239
  },
  {
    "id": 9,
    "first_name": "Saraann",
    "last_name": "Ashby",
    "email": "sashby8@epa.gov",
    "gender": "Female",
    "salary": 5345
  },
  {
    "id": 10,
    "first_name": "Sutherland",
    "last_name": "Caws",
    "email": "scaws9@rakuten.co.jp",
    "gender": "Male",
    "salary": 8374
  },
  {
    "id": 11,
    "first_name": "Rod",
    "last_name": "Imesen",
    "email": "rimesena@surveymonkey.com",
    "gender": "Male",
    "salary": 9349
  },
  {
    "id": 12,
    "first_name": "Fay",
    "last_name": "Oppie",
    "email": "foppieb@epa.gov",
    "gender": "Female",
    "salary": 3040
  },
  {
    "id": 13,
    "first_name": "Francene",
    "last_name": "Rubertelli",
    "email": "frubertellic@omniture.com",
    "gender": "Female",
    "salary": 7050
  },
  {
    "id": 14,
    "first_name": "Henderson",
    "last_name": "Gillivrie",
    "email": "hgillivried@twitpic.com",
    "gender": "Male",
    "salary": 4629
  },
  {
    "id": 15,
    "first_name": "Cinda",
    "last_name": "Kundt",
    "email": "ckundte@hibu.com",
    "gender": "Female",
    "salary": 7344
  }
]`;

export { studentAry, sum, getStudentInfo, jsonString };
