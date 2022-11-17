import bcrypt from "bcrypt";
import { createConnection } from "../db.js";

const sillyPassword = await passwordMaker("sillypassword");
const sql = `
INSERT INTO users (
  name,
  password,
  email,
  is_viewer,
  is_admin)
VALUES (
  "Sally Admin",
  "${sillyPassword}",
  "sally@email.com",
  "true",
  "true"
),
(
  "Jane Viewer",
  "${sillyPassword}",
  "jane@email.com",
  "true",
  "false"
),
(
  "Billy Noprivs",
  "${sillyPassword}",
  "billy@email.com",
  "false",
  "false"
)
;
`;

async function passwordMaker(password) {
  return await bcrypt.hash(password, 10);
}

const db = await createConnection();
await db.run(sql);
await db.close();
