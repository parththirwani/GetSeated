import { generateToken } from "authenticator";
import { Router } from "express";
import express from "express";

const userRouter: Router = express.Router();

userRouter.post("/signup", (req, res) => {
  const phoneNumber = req.body.phoneNumber;
  const totp = generateToken(phoneNumber + "SIGNUP")
  res.json({ message: "Signup endpoint", totp });

});

userRouter.post("/signup/verify", (req, res) => {
  res.json({ message: "Verification endpoint" });
});

export default userRouter;