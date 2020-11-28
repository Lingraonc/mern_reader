import React from "react";
import "./kanjiPage.css";
import {KanjiDetails} from "./kanjiDetail/kanjiDetail";

export const KanjiPage = () => {
  return (
    <div className="container">
      <div className="symbol-container">
        <div className="kanji-symbol">
          <p>角</p>
        </div>
        <KanjiDetails />
      </div>
    </div>
  );
};
