import { createConnection } from "../db.js";

async function getSalarySS() {
  const db = await createConnection();
  const salaries = await db.all("SELECT salary FROM employees");
  await db.close();
  return findSSFromSalaries(salaries);
}

async function getContractSalarySS() {
  const db = await createConnection();
  const salaries = await db.all(
    "SELECT salary FROM employees where on_contract = 'true'"
  );
  await db.close();
  return findSSFromSalaries(salaries);
}

async function getDepartmentSalarySS() {
  const departmentSS = [];
  const db = await createConnection();
  const departmentObject = await db.all(
    "SELECT DISTINCT department FROM employees"
  );
  const departments = departmentObject.map((d) => d.department);
  for (const d of departments) {
    const salaries = await db.all(
      "SELECT salary from employees WHERE department = ?",
      d
    );
    const ss = findSSFromSalaries(salaries);
    departmentSS.push({ department: d, ...ss });
  }
  await db.close();
  return departmentSS;
}

async function getSubDepartmentSalarySS() {
  const subDepartmentSS = [];
  const db = await createConnection();
  const subdepartmentObject = await db.all(
    "SELECT DISTINCT department, sub_department FROM employees"
  );
  for (const sd of subdepartmentObject) {
    const salaries = await db.all(
      "SELECT salary from employees WHERE department = ? and sub_department = ?",
      sd.department,
      sd.sub_department
    );
    const ss = findSSFromSalaries(salaries);
    subDepartmentSS.push({
      department: sd.department,
      sub_department: sd.sub_department,
      ...ss,
    });
  }
  await db.close();
  return subDepartmentSS;
}

function findSSFromSalaries(salaries) {
  let min;
  let max;
  let total = 0;
  let size = salaries.length;
  salaries.forEach((s) => {
    const { salary } = s;
    if (!min || min > salary) min = salary;
    if (!max || max < salary) max = salary;
    total += salary;
  });
  return {
    min,
    max,
    mean: Math.ceil(total / size),
  };
}

export const salaryDao = {
  getSalarySS,
  getContractSalarySS,
  getDepartmentSalarySS,
  getSubDepartmentSalarySS,
};
