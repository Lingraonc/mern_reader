import Tag from "./tag.interface";
import CreateTagDto from "./tag.dto";
import tagModel from "./tag.model";

export class TagService {
  private readonly tag = tagModel;

  async getAllTags(): Promise<Tag[]> {
    const tags = await this.tag.find();
    return tags;
  }

  async getTagById(id: string): Promise<Tag> {
    const tag = await this.tag.findById(id);
    return tag;
  }

  async createTag(data: any): Promise<Tag> {
    const tagData: CreateTagDto = data;
    const createdTag = new this.tag({
      ...tagData,
    });
    const savedTag = await createdTag.save();
    return savedTag;
  }

  async modifyTag(id: string, data: any): Promise<Tag> {
    const tagData: CreateTagDto = data;
    const tag = await this.tag.findByIdAndUpdate(id, tagData, {
      new: true,
    });
    return tag;
  }

  async deleteTag(id: string): Promise<Tag> {
    const successResponse = await this.tag.findByIdAndDelete(id);
    return successResponse;
  }

  async isTagExists(id: string): Promise<boolean> {
    const tag = await this.tag.findById(id);
    return !!tag;
  }

  async isTagsExists(ids: string[]): Promise<boolean> {
    const tag = await this.tag.find(ids);
    return ids.length === tag.length;
  }
}
