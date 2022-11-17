import { salaryDao } from "./salary.js";
import assert from "assert";

describe("When gathering SS information for salaries", () => {
  describe("it should return low, high and mean values", () => {
    it("for all employees", async () => {
      const result = await salaryDao.getSalarySS();
      assert(result.max === 200000000);
      assert(result.min === 30);
      assert(result.mean === 22295010);
    });
    it("for contract employees", async () => {
      const result = await salaryDao.getContractSalarySS();
      assert(result.max === 110000);
      assert(result.min === 90000);
      assert(result.mean === 100000);
    });
    it("by department", async () => {
      const result = await salaryDao.getDepartmentSalarySS();
      assert(
        result.some(
          (r) =>
            r.department === "Banking" &&
            r.min === 90000 &&
            r.max === 90000 &&
            r.mean === 90000
        )
      );
      assert(
        result.some(
          (r) =>
            r.department === "Operations" &&
            r.min === 30 &&
            r.max === 70000 &&
            r.mean === 35015
        )
      );
      assert(
        result.some(
          (r) =>
            r.department === "Administration" &&
            r.min === 30 &&
            r.max === 30 &&
            r.mean === 30
        )
      );

      assert(
        result.some(
          (r) =>
            r.department === "Engineering" &&
            r.min === 30 &&
            r.max === 200000000 &&
            r.mean === 40099006
        )
      );
    });
    it("by sub_department", async () => {
      const result = await salaryDao.getSubDepartmentSalarySS();
      assert(
        result.some(
          (r) =>
            r.department === "Banking" &&
            r.sub_department === "Loan" &&
            r.min === 90000 &&
            r.max === 90000 &&
            r.mean === 90000
        )
      );
      assert(
        result.some(
          (r) =>
            r.department === "Operations" &&
            r.sub_department === "CustomerOnboarding" &&
            r.min === 30 &&
            r.max === 70000 &&
            r.mean === 35015
        )
      );
      assert(
        result.some(
          (r) =>
            r.department === "Administration" &&
            r.sub_department === "Agriculture" &&
            r.min === 30 &&
            r.max === 30 &&
            r.mean === 30
        )
      );

      assert(
        result.some(
          (r) =>
            r.department === "Engineering" &&
            r.sub_department === "Platform" &&
            r.min === 30 &&
            r.max === 200000000 &&
            r.mean === 40099006
        )
      );
    });
  });
});
