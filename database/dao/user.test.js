import { userDao } from "./user.js";
import assert from "assert";

describe("when fetching a user by email", () => {
  it("the correct user should return", async () => {
    const result = await userDao.getByEmail("sally@email.com");
    assert(result.name === "Sally Admin");
  });
});
