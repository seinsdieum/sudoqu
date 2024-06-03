import {CHANGE_GAME, LOAD_GAMES, REMOVE_GAMES} from "../actionNames/games";
import {store} from "../actual";
import {hasColumnError, hasRowError, hasSquareError} from "../../utils";
import {ErrorType, GameStatus, GameType} from "../../types";
import {unsetGame} from "./match";


export const setGridValue = (index: number, number: number) => {
    const m = store.getState().match?.currentGameId


    if(!m) return;

    const v: GameType = store.getState().games?.collection.find(g => g.id == m)

    if(!v) return;


    v.grid[index] = number
    let isError = false

    {
        const alreadyRow = v.errorCells.some(c => c.index === index && c.type === ErrorType.ROW)
        const hasRow = hasRowError(v.grid, index)
        const gotRow = !alreadyRow && hasRow
        const removedRow = alreadyRow && !hasRow

        const alreadyColumn = v.errorCells.some(c => c.index === index && c.type === ErrorType.COL)
        const hasColumn = hasColumnError(v.grid, index)
        const gotColumn = !alreadyColumn && hasColumn
        const removedColumn = alreadyColumn && !hasColumn

        const alreadySquare = v.errorCells.some(c => c.index === index && c.type === ErrorType.SQUARE)
        const hasSquare = hasSquareError(v.grid, index)
        const gotSquare = !alreadySquare && hasSquare
        const removedSquare = alreadySquare && !hasSquare

        console.log(v.errorCells)

        if(gotRow) v.errorCells.push({type: ErrorType.ROW, index: index})
        else if(removedRow) v.errorCells = v.errorCells.filter(c => c.index === index ? (c.type !== ErrorType.ROW) : true )

        if(gotColumn) v.errorCells.push({type: ErrorType.COL, index: index})
        else if(removedColumn) v.errorCells = v.errorCells.filter(c => c.index === index ? (c.type !== ErrorType.COL) : true )


        if(gotSquare) v.errorCells.push({type: ErrorType.SQUARE, index: index})
        else if(removedSquare) v.errorCells = v.errorCells.filter(c => c.index === index ? (c.type !== ErrorType.SQUARE) : true )


        console.log(v.errorCells)


        isError = gotRow || gotColumn || gotSquare
    }
    if(isError) {
        v.encounteredErrors++
    }

    if(v.preview.maxErrors !== 0 && (v.preview.maxErrors - v.encounteredErrors <= 0) ) v.status = GameStatus.LOSE


    if(v.encounteredErrors === 0 && v.grid.filter(c => c !== 0).length === 81 ) v.status = GameStatus.WIN

    const a = {type: CHANGE_GAME, value: v}

    store.dispatch(a)

}

const saveGames = () => {
    const games = store.getState().games;
    if(!games) return
    localStorage.setItem('games', JSON.stringify(games))
}

export const loadGames = () => {

    const loaded = localStorage.getItem('games')
    if(!loaded || loaded.length === 0) return
    const s = JSON.parse(loaded)
    const a = {type: LOAD_GAMES, value: s}

    store.dispatch(a)
}

export const quitGame = () => {
    const m = store.getState().match?.currentGameId


    if(!m) return;

    const v: GameType = store.getState().games?.collection.find(g => g.id == m)

    if(!v) return;

    v.status = GameStatus.LOSE

    const a = {type: CHANGE_GAME, value: v}
    store.dispatch(a)
}

export const finishGame = () => {
    const m = store.getState().match?.currentGameId


    if(!m) return;

    const v: GameType = store.getState().games?.collection.find(g => g.id == m)

    if(!v) return;

    v.finalStatus = v.status
    v.status = GameStatus.QUIT

    const a = {type: CHANGE_GAME, value: v}

    store.dispatch(a)
    unsetGame()
    saveGames()
}

export const removeAllGames = () => {
    const a = {type: REMOVE_GAMES}
    store.dispatch(a)

    saveGames()
}