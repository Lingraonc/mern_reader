import React from "react";
import ReactDom from "react-dom";
import {BrowserRouter as Router, Route} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./store";
import axios from "axios";
import "./style.css";

//components
import {KanjiPage} from "./components/kanjiPage/kanjiPage";
import {HomePage} from "./components/homePage/homeComponent";


//axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.defaults.baseURL = "http://localhost:5000/";

const app = (
    <Provider store={store}>
        <Router>
            <Route path="/" component={HomePage} exact/>
            <Route path="/kanji/:kanjiSymbol" exact component={KanjiPage}/>
        </Router>
    </Provider>
);

ReactDom.render(app, document.getElementById("root"));