import { Request, Response, NextFunction, Router } from "express";
import Controller from "../interfaces/controller.interface";
import validationMiddleware from "../middleware/validation.middleware";
import NotFoundException from "../exceptions/NotFoundException";
import checkMongoId from "../middleware/checkMongoId.middleware";
import CreateRoleDto from "./role.dto";
import { RoleService } from "./role.service";
import { PermissionService } from "../permissions/permission.service";

class RoleController implements Controller {
  public path = "/roles";
  public router = Router();
  public permissionService: PermissionService;
  public roleService: RoleService;

  constructor() {
    this.permissionService = new PermissionService();
    this.roleService = new RoleService();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAllRoles);
    this.router.get(`${this.path}/:id`, checkMongoId("id"), this.getRoleById);
    this.router
      .all(`${this.path}/*`)
      .put(
        `${this.path}/:id`,
        checkMongoId("id"),
        validationMiddleware(CreateRoleDto),
        this.modifyRole
      )
      .delete(`${this.path}/:id`, checkMongoId("id"), this.deleteRole)
      .post(this.path, validationMiddleware(CreateRoleDto), this.createRole);
  }

  private getAllRoles = async (request: Request, response: Response) => {
    const roles = await this.roleService.getAllRoles();
    response.send(roles);
  };

  private getRoleById = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const id = request.params.id;
    const role = await this.roleService.getRoleById(id);
    if (role) {
      response.send(role);
    } else {
      next(new NotFoundException(`Role with id ${id} not found`));
    }
  };

  private modifyRole = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const id = request.params.id;
    const isPermissionsExists = await this.permissionService.isPermissionsExists(
      request.body?.permissions ?? []
    );
    console.log(isPermissionsExists);
    if (isPermissionsExists) {
      const role = await this.roleService.modifyRole(id, request.body);
      if (role) {
        response.send(role);
      } else {
        next(new NotFoundException(`Role with id ${id} not found`));
      }
    }
  };

  private createRole = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const isPermissionsExists = await this.permissionService.isPermissionsExists(
      request.body?.permissions ?? []
    );
    if (isPermissionsExists) {
      const savedRole = await this.roleService.createRole(request.body);
      response.send(savedRole);
    } else {
      next(new NotFoundException("Permissions not correct!"));
    }
  };

  private deleteRole = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const id = request.params.id;
    const successResponse = await this.roleService.deleteRole(id);
    if (successResponse) {
      response.status(200).json();
    } else {
      next(new NotFoundException(`Role with id ${id} not found`));
    }
  };
}

export default RoleController;
