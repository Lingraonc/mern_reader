import {call, takeEvery, put} from "redux-saga/effects";

import axios from "axios";
import {
    getKanjiList,
    setKanjiLoading,
    setKanjiError,
    clearKanjiList, GET_KANJI_LIST_PROCESS, GET_SINGLE_KANJI_PROCESS, getSingleKanji,
} from "./actions";

function fetchKanjiListData() {
    return axios.get("/kanji/popular").then((res) => res.data);
}

function* workerGetKanjiList() {
    yield put(setKanjiLoading(true));
    try {
        const data = yield call(fetchKanjiListData);
        yield put(getKanjiList(data));
    } catch (err) {
        yield put(clearKanjiList());
        yield put(setKanjiError(err));
    }
}

export function* watchGetKanjiList() {
    yield takeEvery(GET_KANJI_LIST_PROCESS, workerGetKanjiList);
}


function fetchSingleKanjiData(kanji) {
    console.log(kanji);
    return axios.get(`kanji/find/` + kanji,).then((res) => res.data);
}

function* workerGetSingleKanji(kanjiData) {
    yield put(setKanjiLoading(true));
    try {
        const data = yield call(fetchSingleKanjiData, kanjiData.payload);
        yield put(getSingleKanji(data));
    } catch (err) {
        yield put(clearKanjiList());
        yield put(setKanjiError(err));
    }
}

export function* watchGetSingleKanji() {
    yield takeEvery(GET_SINGLE_KANJI_PROCESS, workerGetSingleKanji);
}


