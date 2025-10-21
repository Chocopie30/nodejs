const mysql = require("./sql");
const xlsx = require("xlsx");

// 엑셀 내용 db로 넣기
function excel_to_db() {
  const workbook = xlsx.readFile("./files/new_customers.xlsx");
  const firstSheetName = workbook.SheetNames[0]; // 첫번째 시트명 찾기
  const firstSheet = workbook.Sheets[firstSheetName]; // 첫번째 시트 저장
  const excelData = xlsx.utils.sheet_to_json(firstSheet); // 시트 -> json배열
  console.log(excelData);

  // json배열 -> mysql insert
  excelData.forEach(async (item) => {
    let result = await mysql.queryExecute("insert into customers set ?", [
      item,
    ]);
    console.log(result);
  });
}

// db내용 엑셀로 만들기
function db_to_excel() {
  mysql
    .queryExecute("select id,name,email,phone,address from customers", [])
    .then((result) => {
      console.log(result); // 엑셀파일 데이터
      // 워크북 생성 -> sheet추가 -> 파일 저장
      const workbook = xlsx.utils.book_new();
      const firstSheet = xlsx.utils.json_to_sheet(result, {
        header: ["id", "name", "email", "phone", "address"],
      });
      // workbook에 sheet 추가
      xlsx.utils.book_append_sheet(workbook, firstSheet, "customers");
      // 파일 저장
      xlsx.writeFile(workbook, "./files/customers.xlsx");
    })
    .catch((err) => {
      console.log(err);
    });
}
