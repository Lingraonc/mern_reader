import { Request, Response, NextFunction, Router } from "express";
import Controller from "../interfaces/controller.interface";
import validationMiddleware from "../middleware/validation.middleware";
import NotFoundException from "../exceptions/NotFoundException";
import CreateChapterDto from "./chapter.dto";
import checkMongoId from "../middleware/checkMongoId.middleware";
import { ChapterService } from "./chapter.service";
import { BookService } from "../books/book.service";

class ChapterController implements Controller {
  public path = "/books/:bookId/chapters";
  public router = Router();
  private bookService: BookService;
  private chapterService: ChapterService;

  constructor() {
    this.bookService = new BookService();
    this.chapterService = new ChapterService();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAllChapters);
    this.router.get(
      `${this.path}/:id`,
      checkMongoId("id"),
      this.getChapterById
    );
    this.router
      .all(`${this.path}/*`)
      .put(
        `${this.path}/:id`,
        checkMongoId("bookId"),
        checkMongoId("id"),
        validationMiddleware(CreateChapterDto),
        this.modifyChapter
      )
      .delete(`${this.path}/:id`, checkMongoId("id"), this.deleteChapter)
      .post(
        this.path,
        validationMiddleware(CreateChapterDto),
        checkMongoId("bookId"),
        this.createChapter
      );
  }

  private getAllChapters = async (request: Request, response: Response) => {
    const bookId = request.params.bookId;
    const chapters = await this.chapterService.getAllChapters(bookId);
    response.send(chapters);
  };

  private getChapterById = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const id = request.params.id;
    const chapter = await this.chapterService.getChapterById(id);
    if (chapter) {
      response.send(chapter);
    } else {
      next(new NotFoundException(`Chapter with id ${id} not found`));
    }
  };

  private modifyChapter = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const bookId = request.params.bookId;
    const id = request.params.id;
    const chapter = await this.chapterService.modifyChapter(
      bookId,
      id,
      request.body
    );
    if (chapter) {
      response.send(chapter);
    } else {
      next(new NotFoundException(`Chapter with id ${id} not found`));
    }
  };

  private createChapter = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const bookId = request.params.bookId;
    const isBookExists = await this.bookService.isBookExists(bookId);
    if (isBookExists) {
      const chapter = await this.chapterService.createChapter(
        bookId,
        request.body
      );
      response.send(chapter);
    } else {
      next(new NotFoundException(`Book with id ${bookId} not found`));
    }
  };

  private deleteChapter = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const id = request.params.id;
    const deletedChapter = await this.chapterService.deleteChapter(id);
    if (deletedChapter) {
      response.status(200).json();
    } else {
      next(new NotFoundException(`Chapter with id ${id} not found`));
    }
  };
}

export default ChapterController;
