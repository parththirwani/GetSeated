import { generateToken, verifyToken } from "authenticator";
import { Router } from "express";
import express from "express";

const userRouter: Router = express.Router();

userRouter.post("/signup", (req, res) => {
  const phoneNumber = req.body.phoneNumber;
  const totp = generateToken(phoneNumber + "SIGNUP")
  //TODO: send totp to the phone number
  res.json({
    message: "Signup endpoint",
    totp,
    id: "1"
  });
});

userRouter.post("/signup/verify", (req, res) => {
  const phoneNumber = req.body.phoneNumber;
  if (!verifyToken(phoneNumber + "SIGNUP", req.body.totp)) {
    res.json({
      message: "Wrong otp try again"
    })
    return
  }



});

export default userRouter;