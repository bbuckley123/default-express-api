import express from "express";
import jwt from "jsonwebtoken";
import { salaryDao } from "../../database/dao/salary.js";
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
 * /salary:
 *   get:
 *     parameters:
 *       - in: query
 *         name: contract
 *         type: boolean
 *         required: false
 *         description: If set to true, will only return contract salaries
 *       - in: query
 *         name: department
 *         type: boolean
 *         required: false
 *         description: If set to true, will return by department
 *       - in: query
 *         name: subdepartment
 *         type: boolean
 *         required: false
 *         description: If set to true, will return by department and subdepartment
 *     description: Get the min, max and mean for salaries
 *     responses:
 *       200:
 *         description: Returns salary information
 */
router.get("/", async (req, res) => {
  let result;
  const { department, subdepartment, contract } = req.query;
  if (!department && !subdepartment && !contract) {
    result = await salaryDao.getSalarySS();
  } else if (contract) {
    result = await salaryDao.getContractSalarySS();
  } else if (department) {
    result = await salaryDao.getDepartmentSalarySS();
  } else if (subdepartment) {
    result = await salaryDao.getSubDepartmentSalarySS();
  }
  res.status(200).send(result);
});
