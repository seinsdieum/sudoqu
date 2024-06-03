import {GameLevel, GridCoord, SquareCoord} from "../types";

export const generateField = (level: GameLevel): number[81] => {
    const res = []

    let coeff = 5

    switch(level) {
        case GameLevel.EASY: coeff = 10; break;
        case GameLevel.MEDIUM: coeff = 4; break;
        case GameLevel.HARD: coeff = 2; break;
    }

    for(let i = 0; i < 81; i++) {
        const a =  Math.floor(Math.random()*coeff)

        if(a == 1 && level !== GameLevel.EASY) {
            res.push(Math.floor(0))
            continue;
        }

        res.push(Math.floor(Math.random()*10))

        while(res[i] !== 0 && (hasRowError(res, i) || hasColumnError(res, i) || hasSquareError(res, i))) {
            res[i] = Math.floor(Math.random()*10)
        }
    }

    return res
}


export const getSquareCoord = (index: number): SquareCoord => {
    return {
        x: Math.floor((index / 3) % 3 ),
        y: Math.floor(index / 27 )
    }
}

export const getGridCoord = (index: number): GridCoord => {
    return {
        row: Math.floor(index/9),
        col: Math.floor(index % 9)
    }
}


export const hasSquareError = (cells: number[81], index: number): boolean => {

    if(cells[index] == 0) return false


    const arr = []

    const coord = getSquareCoord(index)




    for(let i = coord.y * 3; i < (coord.y+1)*3; i++) {

        for(let j = coord.x*3; j < (coord.x+1)*3 ; j++) {


            if(arr.some(t => t !== undefined && t !== 0 && t === cells[(i*9)+j])) {

                return true;
            }
            arr.push(cells[(i*9)+j])
        }

    }

    return false
}


export const hasColumnError = (cells: number[81], index: number) => {

    if(cells[index] == 0) return false


    const arr = []

    const coord = getGridCoord(index)

    const col = coord.col

    for(let i = col; i < (82-9+col); i += 9) {
        if(arr.some(t => t !== undefined && t !== 0 && t === cells[i])) {

            return true;
        }

        arr.push(cells[i])
    }
}

export const hasRowError = (cells: number[81], index: number):boolean => {
    if(cells[index] == 0) return false

    const arr = []

    const coord = getGridCoord(index)

    const row = coord.row

    for(let i = (row) * 9; i < (row+1) * 9; i++) {



        if(arr.some(t => t !== undefined && t !== 0 && t === cells[i])) {
            return true
        }
        arr.push(cells[i])
    }
    return false
}


export function randomString(length: number): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}