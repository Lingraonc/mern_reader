import { Request, Response, NextFunction, Router } from "express";
import Controller from "../interfaces/controller.interface";
import CreateBookDto from "./book.dto";
import validationMiddleware from "../middleware/validation.middleware";
import NotFoundException from "../exceptions/NotFoundException";
import checkMongoId from "../middleware/checkMongoId.middleware";
import { BookService } from "./book.service";
import { ChapterService } from "../chapters/chapter.service";

class BookController implements Controller {
  public path = "/books";
  public router = Router();
  private bookService: BookService;
  private chapterService: ChapterService;

  constructor() {
    this.bookService = new BookService();
    this.chapterService = new ChapterService();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAllBooks);
    this.router.get(`${this.path}/:id`, checkMongoId("id"), this.getBookById);
    this.router
      .all(`${this.path}/*`)
      .put(
        `${this.path}/:id`,
        checkMongoId("id"),
        validationMiddleware(CreateBookDto),
        this.modifyBook
      )
      .delete(`${this.path}/:id`, checkMongoId("id"), this.deleteBook)
      .post(this.path, validationMiddleware(CreateBookDto), this.createBook);
  }

  private getAllBooks = async (request: Request, response: Response) => {
    const books = await this.bookService.getAllBooks();
    response.send(books);
  };

  private getBookById = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const id = request.params.id;
    const book = await this.bookService.getBookById(id);
    if (book) {
      response.send(book);
    } else {
      next(new NotFoundException(`Book with id ${id} not found`));
    }
  };

  private modifyBook = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const id = request.params.id;
    const book = await this.bookService.modifyBook(id, request.body);
    if (book) {
      response.send(book);
    } else {
      next(new NotFoundException(`Book with id ${id} not found`));
    }
  };

  private createBook = async (request: Request, response: Response) => {
    const savedBook = await this.bookService.createBook(request.body);
    response.send(savedBook);
  };

  private deleteBook = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const id = request.params.id;
    const successResponseBook = await this.bookService.deleteBook(id);
    const successResponseChapter = await this.chapterService.deleteAllChapters(
      id
    );
    if (successResponseBook && successResponseChapter) {
      response.status(200).json();
    } else {
      next(new NotFoundException(`Book with id ${id} not found`));
    }
  };
}

export default BookController;
