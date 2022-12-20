import { Request, Response } from "express";
import { SignJWT } from "jose";
import {
  JWT_AUDIENCE,
  JWT_EXPIRATION,
  JWT_ISSUER,
  JWT_SECRET_KEY,
} from "../config/auth.config";

const authController = {
  login,
};

function checkLogin(username: string, password: string) {
  return username === "admin" && password === "admin";
}

async function login(req: Request, res: Response) {
  const username = req.body.username;
  const password = req.body.password;

  if (!checkLogin(username, password)) {
    return res.status(401).json({
      status: "error",
      message: "Invalid username or password",
    });
  }

  const token = await new SignJWT({ username: username })
    .setProtectedHeader({ alg: "HS256" })
    .setAudience(JWT_AUDIENCE)
    .setIssuer(JWT_ISSUER)
    .setExpirationTime(JWT_EXPIRATION)
    .sign(JWT_SECRET_KEY);

  return res.status(200).json({
    status: "success",
    token: token,
  });
}

export default authController;
