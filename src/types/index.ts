import {ThemeMode} from '@seinsdieum/elliptical-ui/src/theme/types'


export type GamePreview = {
    cells: number[81]
    level: GameLevel
    maxErrors: number
    secondDuration: number,
    errorsLevel: ErrorsLevel,
    id: string,
}

export enum GameLevel {
    EASY = 0,
    MEDIUM = 1,
    HARD = 2,
}

export enum ErrorsLevel {
    SHOW_ALL = 0,
    DONT_SHOW,
}

export type Cell = {
    value: number,
}

export enum GameStatus {
    PLAY,
    PAUSE,
    QUIT,
    LOSE,
    WIN
}

export enum ErrorType {
    ROW,
    COL,
    SQUARE,
}

export type Error = {
    type: ErrorType,
    index: number,
}

export type GameType = {
    id: string
    preview: GamePreview,
    status: GameStatus,
    finalStatus?: GameStatus,
    grid: number[81],
    errorCells: Error[]

    encounteredErrors: number
}

export type MatchState = {
    currentGameId: string | undefined,
}

export type GamesState = {
    collection: GameType[]
}

export type SettingsState = {
    theme: ThemeMode
}

export type SquareCoord = {
    x: number,
    y: number
}

export type GridCoord = {
    row: number,
    col: number,
}

export type Timer = {
    started: boolean
    seconds: number
}