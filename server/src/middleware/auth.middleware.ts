import { NextFunction, Response } from "express";
import * as jwt from "jsonwebtoken";
import DataStoredInToken from "../interfaces/dataStoredInToken";
import RequestWithUser from "../interfaces/requestWithUser.interface";
import userModel from "../users/user.model";
import NotFoundException from "../exceptions/NotFoundException";
import BadRequestExeption from "../exceptions/BadRequestExeption";

async function authMiddleware(
  request: RequestWithUser,
  response: Response,
  next: NextFunction
) {
  const cookies = request.cookies;
  if (cookies && cookies.Authorization) {
    const secret = process.env.JWT_SECRET;
    try {
      const verificationResponse = jwt.verify(
        cookies.Authorization,
        secret
      ) as DataStoredInToken;
      const id = verificationResponse._id;
      const user = await userModel.findById(id);
      if (user) {
        request.user = user;
        next();
      } else {
        next(new BadRequestExeption("Token in not valid"));
      }
    } catch (error) {
      next(new BadRequestExeption("Token in not valid"));
    }
  } else {
    next(new NotFoundException("Token not found"));
  }
}

export default authMiddleware;
