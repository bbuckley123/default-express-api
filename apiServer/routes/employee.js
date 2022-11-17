import express from "express";
import jwt from "jsonwebtoken";
import { employeeDao } from "../../database/dao/employee.js";
export const router = express.Router();

router.use((req, res, next) => {
  try {
    const token = req.header(process.env.TOKEN_HEADER_KEY);
    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (verified) {
      next();
    } else {
      return res.status(401).send("access denied");
    }
  } catch (e) {
    console.log(e);
  }
});

/**
 * @openapi
 * /employees:
 *   get:
 *     description: Get all employees
 *     responses:
 *       200:
 *         description: Returns all employees
 */
router.get("/", async (_, res) => {
  const result = await employeeDao.getAllEmployees();
  res.send(result);
});

/**
 * @openapi
 * /employees:
 *    post:
 *     description: Create new employee
 *     responses:
 *       201:
 *         description: Employee created
 */
router.post("/", async (req, res) => {
  const { name, salary, currency, on_contract, department, sub_department } =
    req.body;
  const result = await employeeDao.createEmployee({
    name,
    salary,
    currency,
    on_contract,
    department,
    sub_department,
  });
  res.status(201).send(result);
});

/**
 * @openapi
 * /employees:
 *   delete:
 *     description: Delete one employee
 *     responses:
 *       201:
 *         description: Returns nothing
 */
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await employeeDao.deleteEmployee(id);
  res.status(201).send(result);
});
