import {MatchState} from "../../types";
import {SET_GAME} from "../actionNames/match";

export const matchReducer = (state: MatchState = {currentGameId: undefined}, action) => {
    switch (action.type) {

        case SET_GAME: return {...state, currentGameId: action.value}

        default: return state
    }
}