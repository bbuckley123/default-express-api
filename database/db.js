import sqlite3 from "sqlite3";
import { open } from "sqlite";

export async function createConnection() {
  return open({ filename: "employees.db", driver: sqlite3.Database });
}
