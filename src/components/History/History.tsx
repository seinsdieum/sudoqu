import {useSelector} from "react-redux";
import Label from "@seinsdieum/elliptical-ui/src/components/Label/Label";
import Section from "@seinsdieum/elliptical-ui/src/components/Section/Section";
import {ErrorsLevel, GameLevel, GameStatus, GameType} from "../../types";
import Grid from "../Grid/Grid";
import {HiArrowRight, HiEye, HiTrash} from "react-icons/hi2";
import Container from "@seinsdieum/elliptical-ui/src/components/Container/Container";
import Property from "@seinsdieum/elliptical-ui/src/components/Property/Property";
import Properties from "@seinsdieum/elliptical-ui/src/components/Properties/Properties";


import style from './History.module.css'
import {HiEyeOff} from "react-icons/hi";
import {GiDiceSixFacesFive, GiDiceSixFacesFour, GiDiceSixFacesThree} from "react-icons/gi";
import DialogWindow from "@seinsdieum/elliptical-ui/src/components/DialogWindow/DialogWindow";
import {removeAllGames} from "../../store/controllers/games";
import {useState} from "react";

const History = () => {

    const [showRemoveAllWindow, setShowRemoveAllWindow] = useState<boolean>(false)

    const m = useSelector(s => s.games.collection)

    const handleHistoryRemoval = () => {
        removeAllGames()
        setShowRemoveAllWindow(false)
    }

    return (
        <div>
            {
                showRemoveAllWindow &&
                <DialogWindow title={'Удаление истории'} onOK={handleHistoryRemoval} onCancel={() => {}} onClose={() => setShowRemoveAllWindow(false)} >
                    <Label>
                        <h1>Вы уверены в своем решении?</h1>
                    </Label>
                    <p>Данные будут удалены безвозвратно</p>
                </DialogWindow>
            }
            <Label>
                <h1>История</h1>
                <HiTrash onClick={() => setShowRemoveAllWindow(true)} />
            </Label>
            <Properties>
                {m.map((g: GameType, index) =>
                    <Section key={index}>
                        <Container noBack>
                            <Property>
                                <Grid  widthPercentage={25} errorCells={[]} grid={g.preview.cells}>

                                </Grid>
                                <HiArrowRight/>
                                <Grid  widthPercentage={25} errorCells={[]} grid={g.grid}>

                                </Grid>
                            </Property>
                            <Properties>
                                <Property>
                                    <Label>
                                        {g.preview.level === GameLevel.HARD && <GiDiceSixFacesThree/>}
                                        {g.preview.level === GameLevel.MEDIUM && <GiDiceSixFacesFour/>}
                                        {g.preview.level === GameLevel.EASY && <GiDiceSixFacesFive/>}
                                        {g.preview.errorsLevel === ErrorsLevel.SHOW_ALL ? <HiEye/> : <HiEyeOff/>}
                                    </Label>
                                </Property>
                                <Property>
                                    <Label>
                                        <h2>Результат</h2>
                                    </Label>
                                    <Label>
                                        {g.finalStatus === GameStatus.LOSE && <h2 className={style.lose}>Проигрыш</h2> }
                                        {g.finalStatus === GameStatus.WIN && <h2 className={style.win}>Победа</h2> }
                                    </Label>
                                </Property>
                                <Property>
                                    <Label>
                                        <h2>Заполнено клеток</h2>
                                    </Label>
                                    <Label>
                                        <h2>{g.grid.filter(c => c !== 0).length}</h2>
                                    </Label>
                                </Property>
                                <Property>
                                    <Label>
                                        <h2>Ошибок допущено</h2>
                                    </Label>
                                    <Label>
                                        <h2>{g.encounteredErrors}{g.preview.maxErrors !== 0 && (' из ' + g.preview.maxErrors)}</h2>
                                    </Label>
                                </Property>
                            </Properties>
                        </Container>

                    </Section>
                )}
            </Properties>


        </div>
    );
};

export default History;