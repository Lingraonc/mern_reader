import kanjiModel from "./kanji.model";
import CreateKanjiDto from "./kanji.dto";
import Kanji from "./kanji.interface";
import UpdateKanjiViewDto from "./kanjiUpdateView.dto";

export class KanjiService {
  private readonly kanji = kanjiModel;

  async getAllKanji(): Promise<Kanji[]> {
    const kanji = await this.kanji.find();
    return kanji;
  }

  async getKanjiById(id: string): Promise<Kanji> {
    const kanji = await this.kanji.findById(id);
    return kanji;
  }

  async createKanji(data: any): Promise<Kanji> {
    const kanjiData: CreateKanjiDto = data;
    const createdKanji = new this.kanji({
      ...kanjiData,
    });
    const savedKanji = await createdKanji.save();
    return savedKanji;
  }

  async saveMultipleKanji(data: any): Promise<Kanji[]> {
    const kanjiData: CreateKanjiDto[] = data;
    const savedKanji = await this.kanji.insertMany(kanjiData);
    return savedKanji;
  }

  async getRandomKanjiByGrade(grade: number): Promise<Kanji[]> {
    const kanji = await this.kanji
      .aggregate([])
      .match({ references: { grade } })
      .sample(1);
    return kanji;
  }

  async updateKanjiView(data: any): Promise<Kanji> {
    const kanjiData: UpdateKanjiViewDto = data;
    const kanji = await this.kanji.findByIdAndUpdate(data, {
      new: true,
    });
    return kanji;
  }

  async isKanjiExists(id: string): Promise<boolean> {
    const kanji = await this.kanji.findById(id);
    return !!kanji;
  }
}
