import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { router as employee } from "./routes/employee.js";
import { router as salary } from "./routes/salary.js";
import { router as user } from "./routes/user.js";
import { userDao } from "../database/dao/user.js";

export default function runServer() {
  try {
    const app = express();
    const options = {
      definition: {
        openapi: "3.0.0",
        info: {
          title: "Employee Salary",
          version: "1.0.0",
        },
      },
      apis: ["./apiServer/routes/*.js"],
    };
    const swaggerSpec = swaggerJSDoc(options);

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    app.use("/employees", employee);
    app.use("/salary", salary);
    app.use("/user", user);

    app.get("/", (req, res) => {
      res.send("Hello World");
    });

    app.get("/validateToken", (req, res) => {
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

    app.listen(process.env.API_PORT);
  } catch (err) {
    console.log(err);
  }
}
