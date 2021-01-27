import chapterModel from "./chapter.model";
import Chapter from "./chapter.interface";
import CreateChapterDto from "./chapter.dto";

export class ChapterService {
  private readonly chapter = chapterModel;

  async getAllChapters(bookId: string): Promise<Chapter[]> {
    const chapters = await this.chapter.find({ bookId });
    return chapters;
  }

  async getChapterById(id: string): Promise<Chapter> {
    const chapter = await this.chapter.findById(id);
    return chapter;
  }

  async createChapter(bookId: string, data: any): Promise<Chapter> {
    const chapterData: CreateChapterDto = { ...data, bookId };
    const createdChapter = new this.chapter({
      ...chapterData,
    });
    const savedChapter = await createdChapter.save();
    return savedChapter;
  }

  async modifyChapter(bookId: string, id: string, data: any): Promise<Chapter> {
    const chapterData: CreateChapterDto = { ...data, bookId };
    const chapter = await this.chapter.findByIdAndUpdate(id, chapterData, {
      new: true,
    });
    return chapter;
  }

  async deleteChapter(id: string): Promise<Chapter> {
    const successResponse = await this.chapter.findByIdAndDelete(id);
    return successResponse;
  }

  async deleteAllChapters(bookId: string): Promise<object> {
    const successResponse = await this.chapter.deleteMany({
      bookId,
    });
    return successResponse;
  }

  async isChapterExists(id: string): Promise<boolean> {
    const chapter = await this.chapter.findById(id);
    return !!chapter;
  }
}
