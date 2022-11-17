import { createConnection } from "../db.js";

async function getByEmail(email) {
  const db = await createConnection();
  const result = await db.all("SELECT * FROM users where email = (?)", email);
  await db.close();
  return result[0];
}

export const userDao = {
  getByEmail,
};
