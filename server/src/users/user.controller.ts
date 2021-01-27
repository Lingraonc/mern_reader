import { Request, Response, NextFunction, Router } from "express";
import Controller from "../interfaces/controller.interface";
import validationMiddleware from "../middleware/validation.middleware";
import CreateUserDto from "./user.dto";
import checkMongoId from "../middleware/checkMongoId.middleware";
import { UserService } from "./user.service";
import NotFoundException from "../exceptions/NotFoundException";

class UserController implements Controller {
  public path = "/users";
  public router = Router();
  public userService: UserService;

  constructor() {
    this.userService = new UserService();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAllUsers);
    this.router.get(`${this.path}/:id`, checkMongoId("id"), this.getUserById);
    this.router
      .all(`${this.path}/*`)
      .put(
        `${this.path}/:id`,
        checkMongoId("id"),
        validationMiddleware(CreateUserDto),
        this.modifyUser
      )
      .delete(`${this.path}/:id`, checkMongoId("id"), this.deleteUser);
  }

  private getAllUsers = async (request: Request, response: Response) => {
    const users = await this.userService.getAllUsers();
    response.send(users);
  };

  private getUserById = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const id = request.params.id;
    const user = await this.userService.getUserById(id);
    if (user) {
      response.send(user);
    } else {
      next(new NotFoundException(`Genre with id ${id} not found`));
    }
  };

  private modifyUser = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const id = request.params.id;
    const user = await this.userService.modifyUser(id, request.body);
    if (user) {
      response.send(user);
    } else {
      next(new NotFoundException(`Genre with id ${id} not found`));
    }
  };

  private deleteUser = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const id = request.params.id;
    const successResponse = await this.userService.deleteUser(id);
    if (successResponse) {
      response.send(200);
    } else {
      next(new NotFoundException(`Genre with id ${id} not found`));
    }
  };
}

export default UserController;
