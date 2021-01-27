import React from "react";
import {KanjiListElement} from "./kanjiListElement/kanjiListElement";


export const KanjiList = (props) => {
    const {kanjiList} = props;
    return (
        <div className='kanji-archive'>
            {kanjiList.map((kanji)=> <KanjiListElement kanji={kanji} />)}
        </div>
    )
}