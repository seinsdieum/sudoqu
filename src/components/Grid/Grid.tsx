import {Cell, ErrorType} from "../../types";
import style from './Grid.module.css'
import {useEffect, useRef} from "react";
import {getGridCoord, getSquareCoord} from "../../utils";

type Props = {

    widthPercentage?: number
    showErrors?: boolean
    onErrorDetection?(): void
    errorCells: Error[]
    onCellClick?: (index: number) => void
    selectedIndex?: number
    grid: Cell[81]
}


const Grid = (props: Props) => {

    const ref = useRef(null)

    const wrapperRef = useRef(null)

    const handleMove = () => {


        if (ref.current && props.selectedIndex !== undefined) {

            const pos = getGridCoord(props.selectedIndex)

            const rect = ref.current.getBoundingClientRect()

            ref.current.style.left = `${pos.col * rect.width}px`
            ref.current.style.top = `${pos.row * rect.height}px`
        }
    }
    useEffect(() => {
        handleMove()
    }, [props.selectedIndex, props.grid])

    useEffect(() => {
        if(props.widthPercentage) wrapperRef.current?.style.setProperty('--gsize', `calc(var(--size) * ${props.widthPercentage})`)
    }, [])


    const pathSelected = (index: number): boolean => {

        if (props.selectedIndex === undefined) return false

        const sqCoord1 = getSquareCoord(index)
        const sqCoord2 = getSquareCoord(props.selectedIndex)

        const grCoord1 = getGridCoord(index)
        const grCoord2 = getGridCoord(props.selectedIndex)

        return (sqCoord1.x === sqCoord2.x
                && sqCoord1.y === sqCoord2.y
            )
            || grCoord1.row === grCoord2.row
            || grCoord1.col === grCoord2.col
    }

    const checkRowError = (index: number): boolean => {
        const row = getGridCoord(index).row
        return props.errorCells.some(cc => cc.type == ErrorType.ROW && getGridCoord(cc.index).row === row)
    }
    const checkColumnError = (index: number): boolean => {
        const col = getGridCoord(index).col
        return props.errorCells.some(cc => cc.type == ErrorType.COL && getGridCoord(cc.index).col === col)
    }
    const checkSquareError = (index: number): boolean => {
        const sq = getSquareCoord(index)
        return props.errorCells.some(cc => cc.type == ErrorType.SQUARE
            && getSquareCoord(cc.index).x === sq.x
            && getSquareCoord(cc.index).y === sq.y
        )
    }

    const calculateCellStyle = (c: number, index: number): string | undefined => {
        const p = pathSelected(index)

        const isErrorIndex = props.showErrors && props.errorCells.some(e => e.index === index)
        const checkError = props.showErrors && (checkRowError(index) || checkColumnError(index) || checkSquareError(index))

        if(checkError) props.onErrorDetection?.()

        return (
            `${style.p_cell}
            ${p && style.path}
            ${(c !== 0 && props.grid[props.selectedIndex] === c) && style.same}
            ${(checkError) && style.path__error }
            ${isErrorIndex && style.error }
            `)
    }

    return (
        <div ref={wrapperRef} className={style.grid_wrapper}>
            {props.selectedIndex !== undefined && <div ref={ref} className={style.selection}></div>}
            <div className={style.grid}>
                {props.grid.map((c, index) =>
                    <div
                        onClick={() => {
                            props.onCellClick?.(index)
                        }}
                        key={index}
                        className={calculateCellStyle(c, index)}>

                        {c !== 0 ? c : ' '}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Grid;