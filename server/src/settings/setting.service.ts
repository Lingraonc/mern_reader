import settingModel from "./setting.model";
import Setting from "./setting.interface";
import CreateSettingDto from "./setting.dto";

export class SettingService {
  private readonly setting = settingModel;

  async getAllSettings(): Promise<Setting[]> {
    const settings = await this.setting.find();
    return settings;
  }

  async getSettingById(id: string): Promise<Setting> {
    const setting = await this.setting.findById(id);
    return setting;
  }

  async createSetting(data: any): Promise<Setting> {
    const settingData: CreateSettingDto = data;
    const createdSetting = new this.setting({
      ...settingData,
    });
    const savedSetting = await createdSetting.save();
    return savedSetting;
  }

  async modifySetting(id: string, data: any): Promise<Setting> {
    const settingData: CreateSettingDto = data;
    const setting = await this.setting.findByIdAndUpdate(id, settingData, {
      new: true,
    });
    return setting;
  }

  async deleteSetting(id: string): Promise<Setting> {
    const successResponse = await this.setting.findByIdAndDelete(id);
    return successResponse;
  }

  async isSettingExists(name: string): Promise<boolean> {
    const setting = await this.setting.findOne({ name });
    return !!setting;
  }

  async isSettingsExists(name: string[]): Promise<boolean> {
    const setting = await this.setting.find({ name: { $in: name } });
    return name.length === setting.length;
  }

  async getDefaultUserRole(): Promise<Setting> {
    const setting = await this.setting.findOne({ name: "Default user role" });
    return setting;
  }

  async getDefaultAdminRole(): Promise<Setting> {
    const setting = await this.setting.findOne({ name: "Default admin group" });
    return setting;
  }
}
