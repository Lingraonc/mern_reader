import { Request, Response, NextFunction, Router } from "express";
import Controller from "../interfaces/controller.interface";
import validationMiddleware from "../middleware/validation.middleware";
import NotFoundException from "../exceptions/NotFoundException";
import checkMongoId from "../middleware/checkMongoId.middleware";
import CreateSettingDto from "./setting.dto";
import { SettingService } from "./setting.service";

class SettingController implements Controller {
  public path = "/settings";
  public router = Router();
  public settingService: SettingService;

  constructor() {
    this.settingService = new SettingService();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAllSettings);
    this.router.get(
      `${this.path}/:id`,
      checkMongoId("id"),
      this.getSettingById
    );
    this.router
      .all(`${this.path}/*`)
      .put(
        `${this.path}/:id`,
        checkMongoId("id"),
        validationMiddleware(CreateSettingDto),
        this.modifySetting
      )
      .delete(`${this.path}/:id`, checkMongoId("id"), this.deleteSetting)
      .post(
        this.path,
        validationMiddleware(CreateSettingDto),
        this.createSetting
      );
  }

  private getAllSettings = async (request: Request, response: Response) => {
    const settings = await this.settingService.getAllSettings();
    response.send(settings);
  };

  private getSettingById = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const id = request.params.id;
    const setting = await this.settingService.getSettingById(id);
    if (setting) {
      response.send(setting);
    } else {
      next(new NotFoundException(`Setting with id ${id} not found`));
    }
  };

  private modifySetting = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const id = request.params.id;
    const setting = await this.settingService.modifySetting(id, request.body);
    if (setting) {
      response.send(setting);
    } else {
      next(new NotFoundException(`Setting with id ${id} not found`));
    }
  };

  private createSetting = async (request: Request, response: Response) => {
    const savedSetting = await this.settingService.createSetting(request.body);
    response.send(savedSetting);
  };

  private deleteSetting = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const id = request.params.id;
    const successResponse = await this.settingService.deleteSetting(id);
    if (successResponse) {
      response.status(200).json();
    } else {
      next(new NotFoundException(`Setting with id ${id} not found`));
    }
  };
}

export default SettingController;
