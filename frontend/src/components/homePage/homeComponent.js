import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getKanjiListProcess, kanjiClearErrors} from "../../store/kanji/actions";
import {KanjiList} from "../kanjiList/kanjiList";
import "./homeComponent.css";



export const HomePage = () => {
    const isLoading = useSelector((state) => state.kanji.isLoading);
    const kanjiList = useSelector((state) => state.kanji.kanji);
    const errors = useSelector((state) => state.kanji.errors);
    const dispatch = useDispatch();
    const clearErrors = () => {
        dispatch(kanjiClearErrors());
    };
    const items = useSelector((state) => state);

    useEffect(() => {
        dispatch(getKanjiListProcess());
    }, [])


    return <div className="home-kanji-block">
        <h1> Popular kanji</h1>
        {!isLoading && !errors ? <KanjiList kanjiList={kanjiList}/> : ""}
    </div>
}