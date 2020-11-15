import axios from "axios";
import { KanjiService } from "../../kanji/kanji.service";
import { SettingService } from "../../settings/setting.service";

class KanjiParser {
  public kanjiService: KanjiService;
  public settingService: SettingService;
  constructor() {
    this.kanjiService = new KanjiService();
    this.settingService = new SettingService();
    this.initParser();
  }

  private async initParser() {
    const isParserAlredyInited = await this.getParseSetting();
    if (!isParserAlredyInited.isActive) {
      const headers = this.getHeaders();
      const kanji = await axios.get(
        "https://kanjialive-api.p.rapidapi.com/api/public/kanji/all",
        headers
      );
      const savingResult = await this.kanjiService.saveMultipleKanji(
        kanji.data
      );
      isParserAlredyInited.isActive = true;
      await this.updateParseSetting(isParserAlredyInited);
      console.log("Kanji parsed successful!");
    }
  }

  private getHeaders() {
    return {
      headers: {
        "x-rapidapi-key": process.env.X_RAPIDAPI_KEY,
        "x-rapidapi-host": "kanjialive-api.p.rapidapi.com",
        useQueryString: true,
      },
    };
  }

  private async getParseSetting() {
    return this.settingService.getSettingByName("Kanji parser init");
  }

  private async updateParseSetting(setting: any) {
    return await this.settingService.modifySetting(setting);
  }
}

export default KanjiParser;
