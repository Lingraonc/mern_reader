type kanji = {
  character: string;
  meaning: { english: string };
  strokes: { count: number; timings: number[]; images: string[] };
  onyomi: { romaji: string; katakana: string };
  kunyomi: { romaji: string; hiragana: string };
  video: { poster: string; mp4: string; webm: string };
};

type radical = {
  character: string;
  strokes: number;
  image: string;
  position: { hiragana: string; romaji: string; icon: string };
  name: { hiragana: string; romaji: string };
  meaning: { english: string };
  animation: string[];
};

type references = {
  grade: number;
  kodansha: string;
  classic_nelson: string;
};

type examples = {
  japanese: string;
  meaning: { english: string };
  audio: { opus: string; aac: string; ogg: string; mp3: string };
};

interface Kanji {
  _id: string;
  kanji: kanji;
  radical: radical;
  references: references;
  examples: examples[];
}

export default Kanji;
