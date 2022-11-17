import { createConnection } from "../db.js";

const sql = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name text,
  password text,
  email text,
  is_viewer boolean,
  is_admin boolean
);
`;
const db = await createConnection();
await db.run(sql);
await db.close();
