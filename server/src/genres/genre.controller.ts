import { Request, Response, NextFunction, Router } from "express";
import Controller from "../interfaces/controller.interface";
import validationMiddleware from "../middleware/validation.middleware";
import NotFoundException from "../exceptions/NotFoundException";
import CreateGenreDto from "./genre.dto";
import checkMongoId from "../middleware/checkMongoId.middleware";
import { GenreService } from "./genre.service";

class GenreController implements Controller {
  public path = "/genres";
  public router = Router();
  public genreService: GenreService;

  constructor() {
    this.genreService = new GenreService();
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
        validationMiddleware(CreateGenreDto),
        this.modifyGenre
      )
      .delete(`${this.path}/:id`, checkMongoId("id"), this.deleteGenre)
      .post(this.path, validationMiddleware(CreateGenreDto), this.createGenre);
  }

  private getAllGenres = async (request: Request, response: Response) => {
    const genres = await this.genreService.getAllGenres();
    response.send(genres);
  };

  private getGenreById = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const id = request.params.id;
    const genre = await this.genreService.getGenreById(id);
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
    const genre = await this.genreService.modifyGenre(id, request.body);
    if (genre) {
      response.send(genre);
    } else {
      next(new NotFoundException(`Genre with id ${id} not found`));
    }
  };

  private createGenre = async (request: Request, response: Response) => {
    const savedGenre = await this.genreService.createGenre(request.body);
    response.send(savedGenre);
  };

  private deleteGenre = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const id = request.params.id;
    const successResponse = await this.genreService.deleteGenre(id);
    if (successResponse) {
      response.status(200).json();
    } else {
      next(new NotFoundException(`Genre with id ${id} not found`));
    }
  };
}

export default GenreController;
