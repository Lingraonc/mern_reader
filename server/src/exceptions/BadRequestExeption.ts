import HttpException from "./HttpException";

class BadRequestExeption extends HttpException {
  constructor(message: string) {
    super(400, message);
  }
}

export default BadRequestExeption;
