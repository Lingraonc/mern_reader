import { Request, Response, NextFunction, Router } from "express";
import Controller from "../interfaces/controller.interface";
import validationMiddleware from "../middleware/validation.middleware";
import NotFoundException from "../exceptions/NotFoundException";
import CreateTagDto from "./tag.dto";
import checkMongoId from "../middleware/checkMongoId.middleware";
import { TagService } from "./tag.service";

class TagController implements Controller {
  public path = "/tags";
  public router = Router();
  public tagService: TagService;

  constructor() {
    this.tagService = new TagService();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAllTags);
    this.router.get(`${this.path}/:id`, checkMongoId("id"), this.getTagById);
    this.router
      .all(`${this.path}/*`)
      .put(
        `${this.path}/:id`,
        checkMongoId("id"),
        validationMiddleware(CreateTagDto),
        this.modifyTag
      )
      .delete(`${this.path}/:id`, checkMongoId("id"), this.deleteTag)
      .post(this.path, validationMiddleware(CreateTagDto), this.createTag);
  }

  private getAllTags = async (request: Request, response: Response) => {
    const tags = await this.tagService.getAllTags();
    response.send(tags);
  };

  private getTagById = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const id = request.params.id;
    const tag = await this.tagService.getTagById(id);
    if (tag) {
      response.send(tag);
    } else {
      next(new NotFoundException(`Tag with id ${id} not found`));
    }
  };

  private modifyTag = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const id = request.params.id;
    const tag = await this.tagService.modifyTag(id, request.body);
    if (tag) {
      response.status(200).json(tag);
    } else {
      next(new NotFoundException(`Tag with id ${id} not found`));
    }
  };

  private createTag = async (request: Request, response: Response) => {
    const savedTag = await this.tagService.createTag(request.body);
    response.json(savedTag);
  };

  private deleteTag = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const id = request.params.id;
    const successResponse = await this.tagService.deleteTag(id);
    if (successResponse) {
      response.status(200).json();
    } else {
      next(new NotFoundException(`Tag with id ${id} not found`));
    }
  };
}

export default TagController;
