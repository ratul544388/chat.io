import { User } from "@prisma/client";
import { Response } from "express";
import jwt from "jsonwebtoken";

export const setCookie = (res: Response, user: User) => {
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });
};
