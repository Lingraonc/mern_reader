import React from "react";
import {Link} from "react-router-dom";


export const KanjiListElement = ({kanji}) => {
    const kanjiSymbol = kanji.kanji.character;
    return (
        <Link to={`/kanji/${kanjiSymbol}`}>
            <div className="single-kanji">
                {kanjiSymbol}
            </div>
        </Link>
    )
}