import { Request, Response, NextFunction, Router } from "express";
import Controller from "../interfaces/controller.interface";
import validationMiddleware from "../middleware/validation.middleware";
import NotFoundException from "../exceptions/NotFoundException";
import checkMongoId from "../middleware/checkMongoId.middleware";
import { PermissionService } from "./permission.service";
import CreatePermissionDto from "./permission.dto";

class PermissionController implements Controller {
  public path = "/permissions";
  public router = Router();
  public permissionService: PermissionService;

  constructor() {
    this.permissionService = new PermissionService();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAllGenres);
    this.router.get(`${this.path}/:id`, checkMongoId("id"), this.getGenreById);
    this.router
      .all(`${this.path}/*`)
      .put(
        `${this.path}/:id`,
        checkMongoId("id"),
        validationMiddleware(CreatePermissionDto),
        this.modifyGenre
      )
      .delete(`${this.path}/:id`, checkMongoId("id"), this.deleteGenre)
      .post(
        this.path,
        validationMiddleware(CreatePermissionDto),
        this.createGenre
      );
  }

  private getAllGenres = async (request: Request, response: Response) => {
    const genres = await this.permissionService.getAllPermissions();
    response.send(genres);
  };

  private getGenreById = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const id = request.params.id;
    const genre = await this.permissionService.getPermissionById(id);
    if (genre) {
      response.send(genre);
    } else {
      next(new NotFoundException(`Genre with id ${id} not found`));
    }
  };

  private modifyGenre = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const id = request.params.id;
    const genre = await this.permissionService.modifyPermission(
      id,
      request.body
    );
    if (genre) {
      response.send(genre);
    } else {
      next(new NotFoundException(`Genre with id ${id} not found`));
    }
  };

  private createGenre = async (request: Request, response: Response) => {
    const savedGenre = await this.permissionService.createPermission(
      request.body
    );
    response.send(savedGenre);
  };

  private deleteGenre = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const id = request.params.id;
    const successResponse = await this.permissionService.deletePermission(id);
    if (successResponse) {
      response.status(200).json();
    } else {
      next(new NotFoundException(`Genre with id ${id} not found`));
    }
  };
}

export default PermissionController;
