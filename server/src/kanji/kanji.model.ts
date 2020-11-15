import * as mongoose from "mongoose";
import Kanji from "./kanji.interface";

const kanjiSchema = new mongoose.Schema({
  kanji: {
    character: { type: String, required: true },
    meaning: { english: { type: String, required: true } },
    strokes: {
      count: { type: Number, required: true },
      timings: { type: [Number], required: true },
      images: { type: [String], required: true },
    },
    onyomi: {
      romaji: { type: String, required: true },
      katakana: { type: String },
    },
    kunyomi: {
      romaji: { type: String, required: true },
      hiragana: { type: String, required: true },
    },
    video: {
      poster: { type: String, required: true },
      mp4: { type: String, required: true },
      webm: { type: String, required: true },
    },
  },
  radical: {
    character: { type: String, required: true },
    strokes: { type: Number },
    image: { type: String },
    position: {
      hiragana: { type: String },
      romaji: { type: String },
      icon: { type: String },
    },
    name: {
      hiragana: { type: String, required: true },
      romaji: { type: String, required: true },
    },
    meaning: { english: { type: String, required: true } },
    animation: { type: [String], required: true },
  },
  references: {
    grade: { type: Number },
    kodansha: { type: String, required: true },
    classic_nelson: { type: String, required: true },
  },
  examples: [
    {
      japanese: { type: String, required: true },
      meaning: { english: { type: String, required: true } },
      audio: {
        opus: { type: String },
        aac: { type: String },
        ogg: { type: String },
        mp3: { type: String },
      },
    },
  ],
  views: { type: Number, default: 0 },
});

const kanjiModel = mongoose.model<Kanji & mongoose.Document>(
  "Kanji",
  kanjiSchema
);

export default kanjiModel;
