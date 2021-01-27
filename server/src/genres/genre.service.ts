import Genre from "./genre.interface";
import CreateGenreDto from "./genre.dto";
import genreModel from "./genre.model";

export class GenreService {
  private readonly genre = genreModel;

  async getAllGenres(): Promise<Genre[]> {
    const genres = await this.genre.find();
    return genres;
  }

  async getGenreById(id: string): Promise<Genre> {
    const genre = await this.genre.findById(id);
    return genre;
  }

  async createGenre(data: any): Promise<Genre> {
    const genreData: CreateGenreDto = data;
    const createdGenre = new this.genre({
      ...genreData,
    });
    const savedGenre = await createdGenre.save();
    return savedGenre;
  }

  async modifyGenre(id: string, data: any): Promise<Genre> {
    const genreData: CreateGenreDto = data;
    const genre = await this.genre.findByIdAndUpdate(id, genreData, {
      new: true,
    });
    return genre;
  }

  async deleteGenre(id: string): Promise<Genre> {
    const successResponse = await this.genre.findByIdAndDelete(id);
    return successResponse;
  }

  async isGenreExists(id: string): Promise<boolean> {
    const genre = await this.genre.findById(id);
    return !!genre;
  }

  async isGenresExists(ids: string[]): Promise<boolean> {
    const genre = await this.genre.find(ids);
    return ids.length === genre.length;
  }
}
