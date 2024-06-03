import style from './Match.module.css'
import {useSelector} from "react-redux";
import {ErrorsLevel, GameStatus, GameType} from "../../types";
import Grid from "../Grid/Grid";
import {useEffect, useRef, useState} from "react";
import {finishGame, quitGame, setGridValue} from "../../store/controllers/games";
import Section from "@seinsdieum/elliptical-ui/src/components/Section/Section";
import {HiClock, HiHeart, HiTableCells} from "react-icons/hi2";
import DialogWindow from '@seinsdieum/elliptical-ui/src/components/DialogWindow/DialogWindow'
import Label from "@seinsdieum/elliptical-ui/src/components/Label/Label";
import {FaInfinity} from "react-icons/fa6";


type Props = {
    id: string
}
const Match = (props: Props) => {


    const [fixedErrorsCount, setFixedErrorsCount] = useState<number>(0)
    const healthRef = useRef(null)

    const m: GameType = useSelector(s => s.games.collection.find(g => g.id === props.id))


    const [selectedIndex, setSelectedIndex] = useState<number>(0)
    const handleKeyPress = (e) => {
        switch (e.key) {
            case 'ArrowUp':
                if (selectedIndex - 9 >= 0) setSelectedIndex(selectedIndex - 9)
                return;
            case 'ArrowDown':
                if (selectedIndex + 9 <= 80) setSelectedIndex(selectedIndex + 9)
                return;

            case 'ArrowLeft':
                if (selectedIndex - 1 >= 0) setSelectedIndex(selectedIndex - 1)
                return;
            case 'ArrowRight':
                if (selectedIndex + 1 <= 80) setSelectedIndex(selectedIndex + 1)
                return;
        }

        if (e.key >= '0' && e.key <= '9') {
            setGridValue(selectedIndex, +e.key)
        }
    }

    const handleVisibleErrorDetection = () => {
        healthRef.current?.classList.add(style.got__error)
        setTimeout(() => {
            healthRef.current?.classList.remove(style.got__error)
        }, 0)
    }

    useEffect(() => {
        if(m.preview.errorsLevel === ErrorsLevel.DONT_SHOW) return

        if(m.errorCells.length > fixedErrorsCount) {
            handleVisibleErrorDetection()
        }


        setFixedErrorsCount(m.errorCells.length)
    }, [m])


    return (
        <div autoFocus className={style.match} tabIndex={0} onKeyDown={handleKeyPress}>
            {
                m.status === GameStatus.LOSE &&
                <DialogWindow onClose={finishGame} title={'Игра окончена'}>
                    <Label>
                        <h1>Вы проиграли!</h1>
                    </Label>
                    <Section>
                        <Label>
                            <HiHeart/>
                            {m.preview.maxErrors !== 0 && <h1>{m.preview.maxErrors - m.encounteredErrors}</h1>}
                        </Label>
                        <Label>
                            <HiClock/>
                            {<h1>{m.preview.secondDuration}s</h1>}
                        </Label>
                        <Label>
                            <HiTableCells/>
                            {<h1>{m.preview.cells.filter(c => c !== 0).length}</h1>}
                        </Label>
                    </Section>

                </DialogWindow>
            }

            {
                m.status === GameStatus.WIN &&
                <DialogWindow onClose={finishGame} title={'Игра окончена'}>
                    <Label>
                        <h1>Вы выиграли!</h1>
                    </Label>
                    <Section>
                        <Label>
                            <HiHeart/>
                            {m.preview.maxErrors !== 0 && <h1>{m.preview.maxErrors - m.encounteredErrors}</h1>}
                        </Label>
                        <Label>
                            <HiClock/>
                            {<h1>{m.preview.secondDuration}s</h1>}
                        </Label>
                        <Label>
                            <HiTableCells/>
                            {<h1>{m.preview.cells.filter(c => c !== 0).length}</h1>}
                        </Label>
                    </Section>
                </DialogWindow>
            }

            <Grid showErrors={m.preview.errorsLevel === ErrorsLevel.SHOW_ALL} errorCells={m.errorCells} onCellClick={(i) => setSelectedIndex(i)} selectedIndex={selectedIndex}
                  grid={m.grid}></Grid>
            <Section>
                {
                    (m.preview.errorsLevel === ErrorsLevel.SHOW_ALL) && (
                    (m.preview.maxErrors !== 0 ?
                            <div ref={healthRef} className={style.healthbar}>
                                {[...Array((m.preview.maxErrors
                                    - m.encounteredErrors)).keys()]
                                    .map((c, index) => <HiHeart key={index}/>)}
                            </div>
                            : <FaInfinity/>)
                    )
                }
            </Section>
            <Label>
                <button onClick={quitGame}>Закончить</button>
            </Label>
        </div>
    );
};

export default Match;