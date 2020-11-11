import { RequestHandler } from "express";
import HttpException from "../exceptions/HttpException";

function checkMongoId(id_params: string): RequestHandler {
  return (req, res, next) => {
    const tested_id = req.params[id_params];
    const regExp = /^[0-9a-fA-F]{24}$/;
    if (
      (Array.isArray(tested_id) && tested_id.some((e) => !e.match(regExp))) ||
      (!Array.isArray(tested_id) && !regExp.test(tested_id))
    ) {
      next(new HttpException(400, "Id is incorrect"));
    }
    next();
  };
}

export default checkMongoId;
