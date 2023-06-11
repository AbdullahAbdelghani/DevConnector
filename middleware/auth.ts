import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "config";
import { UserType } from "../models/User";
export interface CustomRequest extends Request {
  user: UserType;
}

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ msg: "no token,authraization denied" });
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtsecret"));
    (req as CustomRequest).user = decoded as any;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ msg: "Token is not valid" });
  }
};
