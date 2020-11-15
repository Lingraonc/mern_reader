import { IsNotEmpty, IsString } from "class-validator";

class CreateKanjiDto {
  @IsNotEmpty()
  public kanji: {
    character: string;
    meaning: { english: string };
    strokes: { count: number; timings: number[]; images: string[] };
    onyomi: { romaji: string; katakana: string };
    kunyomi: { romaji: string; hiragana: string };
    video: { poster: string; mp4: string; webm: string };
  };

  @IsNotEmpty()
  public radical: {
    character: string;
    strokes: number;
    image: string;
    position: { hiragana: string; romaji: string; icon: string };
    name: { hiragana: string; romaji: string };
    meaning: { english: string };
    animation: string[];
  };

  @IsNotEmpty()
  public references: {
    grade: number;
    kodansha: string;
    classic_nelson: string;
  };

  @IsNotEmpty()
  public examples: {
    japanese: string;
    meaning: { english: string };
    audio: { opus: string; aac: string; ogg: string; mp3: string };
  };
}

export default CreateKanjiDto;
