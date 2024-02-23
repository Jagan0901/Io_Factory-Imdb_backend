import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { genPassword, createUser, getUserByEmail } from "../helper.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  //To set Email Pattern
    if(!/^[\w]{1,}[\w.+-]{0,}@[\w-]{2,}([.][a-zA-Z]{2,}|[.][\w-]{2,}[.][a-zA-Z]{2,})$/g.test(email)){
        res.status(400).send({error: "Invalid Email Pattern"})
        return;
    }

  const isUserExist = await getUserByEmail(email);
  if (isUserExist) {
    res.status(404).send({ error: "Email already exists" });
    return;
  }
  if (!/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/g.test(password)) {
    res.status(404).send({ error: "Password pattern does not match" });
    return;
  }
  const hashedPassword = await genPassword(password);
  const create = await createUser(email, hashedPassword);
  res.send({ message: "Created Successfully"});
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  const userFromDB = await getUserByEmail(email);
  if (!userFromDB) {
    res.status(404).send({ error: "Invalid Credentials" });
    return;
  }
  const storedDbPassword = userFromDB.password;
  const isPasswordMatch = await bcrypt.compare(password, storedDbPassword);
  if (!isPasswordMatch) {
    res.status(404).send({ error: "Invalid Credentials" });
    return;
  }

  const token = jwt.sign({ id: userFromDB._id }, process.env.SECRET_KEY);

  res.send({ message: "Login Successful", token: token, email:userFromDB.email });
});

export const usersRouter = router;
