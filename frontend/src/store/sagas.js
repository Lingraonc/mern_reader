import { all } from "redux-saga/effects";
import {
    watchGetKanjiList, watchGetSingleKanji
} from "./kanji/sagas";

export function* rootSaga() {
    yield all([
        watchGetKanjiList(),
        watchGetSingleKanji(),
    ]);
}