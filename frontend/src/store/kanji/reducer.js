import {
    CLEAR_KANJI_LIST,
    GET_KANJI_LIST, GET_SINGLE_KANJI,
    KANJI_CLEAR_ERRORS,
    KANJI_ERROR,
    KANJI_LOADING,
} from "./actions";


const defaultState = {
    kanji: [],
    isLoading: false,
    errors: null,
    singleKanji: null,
};

export const kanjiReducer = (state = defaultState, action) => {
    switch (action.type) {

        case CLEAR_KANJI_LIST:
            return {
                ...state,
                kanji: [],
                isLoading: false,
                singleKanji: null,
            };

        case GET_KANJI_LIST:
            return {
                ...state,
                kanji: action.payload,
                isLoading: false,
            };

        case GET_SINGLE_KANJI:
            return {
                ...state,
                singleKanji: action.payload,
                isLoading: false,
            };

        case KANJI_ERROR:
            return {
                ...state,
                errors: action.payload,
            };

        case KANJI_LOADING:
            return {
                ...state,
                isLoading: action.payload,
            };

        case KANJI_CLEAR_ERRORS:
            return {
                ...state,
                errors: null,
            };

        default:
            return state;
    }
};