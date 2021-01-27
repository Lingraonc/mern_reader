import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import {kanjiReducer} from "./kanji/reducer";

export default combineReducers({
  kanji: kanjiReducer,
  form: formReducer,
});