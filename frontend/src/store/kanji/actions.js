
export const GET_KANJI_LIST_PROCESS = "GET_KANJI_LIST_PROCESS";
export const GET_KANJI_LIST = "GET_KANJI_LIST";
export const CLEAR_KANJI_LIST = "CLEAR_KANJI_LIST";
export const KANJI_ERROR = "KANJI_ERROR";
export const KANJI_LOADING = "KANJI_LOADING";
export const KANJI_CLEAR_ERRORS = "KANJI_CLEAR_ERRORS";
export const GET_SINGLE_KANJI_PROCESS = "GET_SINGLE_KANJI_PROCESS";
export const GET_SINGLE_KANJI = "GET_SINGLE_KANJI";

export const clearKanjiList = () => ({
    type: CLEAR_KANJI_LIST,
});

export const setKanjiLoading = (isLoading) => {
    return {
        type: KANJI_LOADING,
        payload: isLoading,
    };
};

export const getKanjiList = (data) => {
    return {
        type: GET_KANJI_LIST,
        payload: data,
    };
};

export const getSingleKanji = (data) => {
    return {
        type: GET_SINGLE_KANJI,
        payload: data,
    };
};


export const getKanjiListProcess = () => {
    return {
        type: GET_KANJI_LIST_PROCESS,
    };
};

export const getSingleKanjiProcess = (data) => {
    return {
        type: GET_SINGLE_KANJI_PROCESS,
        payload: data
    }
}

export const setKanjiError = (error) => {
    return {
        type: KANJI_ERROR,
        payload: error.message,
    };
};

export const kanjiClearErrors = () => {
    return {
        type: KANJI_CLEAR_ERRORS,
    };
};