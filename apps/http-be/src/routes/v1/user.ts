import { client } from "@repo/db/client";

import { Router } from "express";
import express from "express";
import jwt from "jsonwebtoken"
import { JWT_PASSWORD } from "./config";
import { sendMessage } from "../../utils/twillio";
import { getTotp, verifyToken } from "../../utils/totp";


//TODO: add all the string literals to a file for supporting different languages

const userRouter: Router = express.Router();

userRouter.post("/signup", async (req, res) => {
  const number = req.body.phoneNumber;
  const totp = getTotp(number, "AUTH")
  const user = await client.user.upsert({
    where: {
      number
    },
    create: {
      number,
      name: ""
    },
    update: {

    }
  })
  if (process.env.NODE_ENV === "production") {
    try {
      await sendMessage(`Your otp for logging into GetSeated is ${totp}`, number)
    } catch (e) {
      res.status(500).json({
        message: "Could not sent otp"
      })
      return
    }
  }

  res.json({
    message: "Signup endpoint",
    totp,
    id: user.id
  });
});

userRouter.post("/signup/verify", async (req, res) => {
  const number = req.body.phoneNumber;
  const name = req.body.name
  const otp = req.body.totp
  if (process.env.NODE__ENV === "production" && !verifyToken(number, "AUTH", otp)) {
    res.json({
      message: "Wrong otp try again"
    })
    return
  }

  const user = await client.user.update({
    where: {
      number
    },
    data: {
      name,
      verified: true
    }
  })

  const token = jwt.sign({
    userId: user.id
  }, JWT_PASSWORD)
  //TODO: replace jwt with access refresh tokens

  res.json({
    message: "User Authenticated",
    token
  })

});

userRouter.post("/signin", async (req, res) => {
  const number = req.body.phoneNumber;
  const totp = getTotp(number, "AUTH")

  if (process.env.NODE_ENV === "production") {
    try {
      await sendMessage(`Your otp for logging into GetSeated is ${totp}`, number)
    } catch (e) {
      res.status(500).json({
        message: "Could not sent otp"
      })
      return
    }
  }

  res.json({
    message: "Otp sent",
    totp
  });
});

userRouter.post("/signin/verify", async (req, res) => {
  const number = req.body.phoneNumber;
  const otp = req.body.totp
if (process.env.NODE_ENV === "production" && !verifyToken(number, "AUTH", otp)) {
    res.json({
      message: "Wrong otp try again"
    })
    return
  }

  const user = await client.user.findFirstOrThrow({
    where: {
      number
    },
  })

  const token = jwt.sign({
    userId: user.id
  }, JWT_PASSWORD)

  res.json({
    message: "User Authenticated",
    token
  })

});

export default userRouter;