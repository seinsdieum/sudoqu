import {GamePreview, GameStatus, GameType} from "../../types";
import {ADD_GAME} from "../actionNames/games";
import {store} from "../actual";
import {randomString} from "../../utils";
import {SET_GAME} from "../actionNames/match";


export const createGame = (preview: GamePreview) => {

    const id = randomString(6)

    const a: {type: string, value: GameType} = {type: ADD_GAME, value: {
        status: GameStatus.PLAY,
            preview: preview,
            encounteredErrors: 0,
            id: id,
            errorCells: [],
            grid: [...preview.cells]
        }}

    store.dispatch(a)

    const b: {type: string, value: string | undefined } = {type: SET_GAME, value: id}

    store.dispatch(b)
}

export const unsetGame = () => {
    const b: {type: string, value: string | undefined} = {type: SET_GAME, value: undefined}
    store.dispatch(b)
}