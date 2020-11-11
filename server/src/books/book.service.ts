import bookModel from "./book.model";
import Book from "./book.interface";
import CreateBookDto from "./book.dto";

export class BookService {
  private readonly book = bookModel;

  async getAllBooks(): Promise<Book[]> {
    const books = await this.book.find();
    return books;
  }

  async getBookById(id: string): Promise<Book> {
    const book = await this.book.findById(id);
    return book;
  }

  async createBook(data: any): Promise<Book> {
    const bookData: CreateBookDto = data;
    const createdBook = new this.book({
      ...bookData,
    });
    const savedBook = await createdBook.save();
    return savedBook;
  }

  async modifyBook(id: string, data: any): Promise<Book> {
    const bookData: CreateBookDto = data;
    const book = await this.book.findByIdAndUpdate(id, bookData, {
      new: true,
    });
    return book;
  }

  async deleteBook(id: string): Promise<Book> {
    const successResponse = await this.book.findByIdAndDelete(id);
    return successResponse;
  }

  async isBookExists(id: string): Promise<boolean> {
    const book = await this.book.findById(id);
    return !!book;
  }
}
