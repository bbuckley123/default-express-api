import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userDao } from "../../database/dao/user.js";
export const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userDao.getByEmail(email);
  const isAuthN = await bcrypt.compare(password, user.password);
  if (!isAuthN) return res.status(400).send("Invalid credentials");

  const data = { time: Date(), userId: user.id, email };
  const token = jwt.sign(data, process.env.JWT_SECRET_KEY, {
    expiresIn: "1h",
  });
  res.send(token);
});
