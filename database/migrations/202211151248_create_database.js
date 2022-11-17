import { createConnection } from "../db.js";

const sql = `
CREATE TABLE IF NOT EXISTS employees (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name text,
  salary integer,
  currency text,
  on_contract Boolean,
  department text,
  sub_department text
);
`;
const db = await createConnection();
await db.run(sql);
await db.close();
