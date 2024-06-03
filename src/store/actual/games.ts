import {GamesState, GameStatus} from "../../types";
import {ADD_GAME, CHANGE_GAME, LOAD_GAMES, REMOVE_GAME, REMOVE_GAMES} from "../actionNames/games";


export const gamesReducer = (state: GamesState = {collection: []}, action) => {

    switch(action.type) {

        case REMOVE_GAMES:
            return {...state, collection: []}
        case LOAD_GAMES:
            return {...action.value}
        case ADD_GAME:
            return {...state, collection: [ action.value,...state.collection]};
        case REMOVE_GAME:
            return {...state, collection: [...state.collection.filter(g => g.id !== action.value.id)]};
        case CHANGE_GAME:
            return {...state, collection: [...state.collection.map(g => {
                return g.id === action.value.id ? {...action.value} : g
                })]};


        default: return state
    }
}