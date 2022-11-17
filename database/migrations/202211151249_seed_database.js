import { createConnection } from "../db.js";

const values = convertInputDataToValuesStatement();
const sql = `
INSERT INTO employees (
  name,
  salary,
  currency,
  on_contract,
  department,
  sub_department)
VALUES ${values} 
;
`;
const db = await createConnection();
await db.run(sql);
await db.close();

function convertInputDataToValuesStatement() {
  const inputData = `[
  {
  "name": "Abhishek",
  "salary": "145000",
  "currency": "USD",
  "department": "Engineering",
  "sub_department": "Platform"
  },
  {
  "name": "Anurag",
  "salary": "90000",
  "currency": "USD",
  "department": "Banking",
  
  "on_contract": "true",
  "sub_department": "Loan"
  },
  {
  "name": "Himani",
  "salary": "240000",
  "currency": "USD",
  "department": "Engineering",
  "sub_department": "Platform"
  },
  {
  "name": "Yatendra",
  "salary": "30",
  "currency": "USD",
  "department": "Operations",
  "sub_department": "CustomerOnboarding"
  },
  {
  "name": "Ragini",
  "salary": "30",
  "currency": "USD",
  "department": "Engineering",
  "sub_department": "Platform"
  },
  {
  "name": "Nikhil",
  "salary": "110000",
  "currency": "USD",
  "on_contract": "true",
  "department": "Engineering",
  "sub_department": "Platform"
  },
  {
  "name": "Guljit",
  "salary": "30",
  "currency": "USD",
  "department": "Administration",
  "sub_department": "Agriculture"
  },
  {
  "name": "Himanshu",
  "salary": "70000",
  "currency": "EUR",
  "department": "Operations",
  "sub_department": "CustomerOnboarding"
  },
  {
  "name": "Anupam",
  "salary": "200000000",
  "currency": "INR",
  "department": "Engineering",
  "sub_department": "Platform"
  }
  ]`;

  const employees = JSON.parse(inputData);
  const allValues = [];

  employees.forEach((e) => {
    const value = [];
    const { name, salary, currency, on_contract, department, sub_department } =
      e;
    name ? value.push(`"${name}"`) : value.push("null");
    salary ? value.push(`${salary}`) : value.push("null");
    currency ? value.push(`"${currency}"`) : value.push("null");
    on_contract ? value.push(`"${on_contract}"`) : value.push("null");
    department ? value.push(`"${department}"`) : value.push("null");
    sub_department ? value.push(`"${sub_department}"`) : value.push("null");
    allValues.push(`(${value.join(",")})`);
  });

  return allValues.join(",");
}
