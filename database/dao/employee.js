import { createConnection } from "../db.js";

async function getAllEmployees() {
  const db = await createConnection();
  const result = await db.all("SELECT * FROM employees");
  await db.close();
  return result;
}

async function deleteEmployee(id) {
  const db = await createConnection();
  const result = await db.run("DELETE FROM employees where id = (?)");
  await db.close();
  return result;
}

async function createEmployee(data) {
  const db = await createConnection();
  const { name, salary, currency, on_contract, department, sub_department } =
    data;

  const params = [
    name,
    salary,
    currency,
    on_contract,
    department,
    sub_department,
  ];
  const sql = `INSERT INTO employees (
    name,
    salary,
    currency,
    on_contract,
    department,
    sub_department)
  VALUES (?,?,?,?,?,?)`;
  const result = db.run(sql, params);
  await db.close();
  return { id: result.lastID };
}

export const employeeDao = {
  getAllEmployees,
  deleteEmployee,
  createEmployee,
};
