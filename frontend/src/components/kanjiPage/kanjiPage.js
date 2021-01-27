import React, {useEffect} from "react";
import "./kanjiPage.css";
import {KanjiDetails} from "./kanjiDetail/kanjiDetail";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getKanjiListProcess, getSingleKanjiProcess, kanjiClearErrors} from "../../store/kanji/actions";

export const KanjiPage = (props) => {
    const {kanjiSymbol} = props.match.params;
    const isLoading = useSelector((state) => state.kanji.isLoading);
    const singleKanji = useSelector((state) => state.kanji.singleKanji);
    const errors = useSelector((state) => state.kanji.errors);
    const dispatch = useDispatch();
    const clearErrors = () => {
        dispatch(kanjiClearErrors());
    };
    const items = useSelector((state) => state);

    useEffect(() => {
        dispatch(getSingleKanjiProcess(kanjiSymbol));
    }, [])

  return (

    <div className="container">
        <Link to='/'>Back to home</Link>
      <div className="symbol-container">
        <div className="kanji-symbol">
          <p>{singleKanji?.kanji.character}</p>
        </div>
        <KanjiDetails  singleKanji={singleKanji}/>
      </div>
    </div>
  );
};
