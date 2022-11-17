import { employeeDao } from "./employee.js";
import assert from "assert";

describe("When performing crud operations on employees", () => {
  it("all employees should be retrieved", async () => {
    const result = await employeeDao.getAllEmployees();
    assert(result.length === 9);
  });
  it.skip("an employee should be created, then deleted", async () => {
    const result = await employeeDao.createEmployee({ name: "Sally" });
    await employeeDao.deleteEmployee(result.id);
  });
});
