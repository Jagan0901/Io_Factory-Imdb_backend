import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { genPassword, createUser, getUserByName } from "../helper.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  const isUserExist = await getUserByName(username);
  if (isUserExist) {
    res.status(404).send({ message: "Username already taken" });
    return;
  }
  if (!/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/g.test(password)) {
    res.status(404).send({ message: "Password pattern does not match" });
    return;
  }
  const hashedPassword = await genPassword(password);
  const create = await createUser(username, hashedPassword);
  res.send(create);
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  const userFromDB = await getUserByName(username);
  if (!userFromDB) {
    res.status(404).send({ message: "Invalid Credentials" });
    return;
  }
  const storedDbPassword = userFromDB.password;
  const isPasswordMatch = await bcrypt.compare(password, storedDbPassword);
  if (!isPasswordMatch) {
    res.status(404).send({ message: "Invalid Credentials" });
    return;
  }

  const token = jwt.sign({ id: userFromDB._id }, process.env.SECRET_KEY);

  res.send({ message: "Login Successful", token: token });
});

export const usersRouter = router;
