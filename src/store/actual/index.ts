import {combineReducers, createStore} from "redux";
import {settingsReducer} from "./settings";
import {matchReducer} from "./match";
import {gamesReducer} from "./games";



const rootReducer = combineReducers({
    settings: settingsReducer,
    match: matchReducer,
    games: gamesReducer,
})

export const store = createStore(rootReducer)