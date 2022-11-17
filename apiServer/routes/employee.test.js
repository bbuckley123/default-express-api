import { router } from "./employee.js";
import express from "express";
import request from "supertest";
import assert from "assert";

const app = express();
app.use("employees", router);

describe("When invoking the employee routes", () => {
  it("all employees returns successfuly", async () => {
    const response = await request(app).get("/employees");
    console.log(response);
    assert(response.status === 200);
  });
});
