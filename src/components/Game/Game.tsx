import Label from '@seinsdieum/elliptical-ui/src/components/Label/Label'
import MultiToggle, {ToggleAction} from '@seinsdieum/elliptical-ui/src/components/MultiToggle/MultiToggle'
import {useEffect, useState} from "react";
import {ErrorsLevel, GameLevel, GamePreview} from "../../types";
import PreviewGrid from "../PreviewGrid/PreviewGrid";
import RippleButton from '@seinsdieum/elliptical-ui/src/components/RippleButton/RippleButton'
import ContainerBox from '@seinsdieum/elliptical-ui/src/components/ContainerBox/ContainerBox'
import {generateField} from "../../utils";
import Container from "@seinsdieum/elliptical-ui/src/components/Container/Container";

import style from './Game.module.css'
import {FaI, FaInfinity} from "react-icons/fa6";
import {
    GiDeadEye,
    GiDiceSixFacesFive,
    GiDiceSixFacesFour,
    GiDiceSixFacesThree, GiEyelashes,
    GiFire,
    GiInvisible
} from "react-icons/gi";
import {HiClock, HiEye, HiHeart} from "react-icons/hi2";
import {GoEye, GoEyeClosed} from "react-icons/go";
import {HiEyeOff} from "react-icons/hi";
import ComboList from "../ComboList/ComboList";
import {emptyGrid} from "../../store/predefined";
import {useSelector} from "react-redux";
import Match from "../Match/Match";
import {createGame} from "../../store/controllers/match";

import Property from '@seinsdieum/elliptical-ui/src/components/Property/Property'
import Properties from '@seinsdieum/elliptical-ui/src/components/Properties/Properties'

const Game = () => {

    const gameState = useSelector(s => s.match.currentGameId)



    const [preview, setPreview] = useState<GamePreview>(
        {
            cells: [
                1, 0, 3, 4, 0, 6, 7, 8, 9,
                1, 2, 3, 4, 5, 6, 7, 8, 9,
                1, 2, 3, 4, 5, 6, 7, 8, 9,
                1, 2, 3, 4, 5, 6, 7, 8, 9,
                1, 2, 0, 4, 5, 6, 0, 8, 9,
                1, 2, 3, 4, 5, 6, 7, 8, 9,
                1, 2, 3, 4, 5, 6, 7, 8, 9,
                1, 2, 3, 4, 5, 6, 7, 0, 9,
                1, 2, 3, 4, 0, 6, 7, 8, 9,
            ], secondDuration: 900, errorsLevel: ErrorsLevel.SHOW_ALL, maxErrors: 5, level: GameLevel.EASY, id: '1'
        }
    )

    const [fieldIsLoading, setFieldIsLoading] = useState<boolean | undefined>(false)

    const handleMatchCreation = () => {
        createGame(preview)
    }

    const handleFieldRemake = () => {
        const load = async () => {
            setFieldIsLoading(true)
            setPreview({...preview, cells: generateField(preview.level)})
        }

        load().then(() => setFieldIsLoading(false))

    }

    useEffect(() => {
        handleFieldRemake()
    }, [preview.level])

    const difficultyToggleActions: ToggleAction[] = [
        {
            handler: () => {
                setPreview({...preview, level: GameLevel.EASY})
            }, title: 'Легкая'
        },
        {
            handler: () => {
                setPreview({...preview, level: GameLevel.MEDIUM})

            }, title: 'Средняя'
        },
        {
            handler: () => {
                setPreview({...preview, level: GameLevel.HARD})

            }, title: 'Сложная'
        },
    ]


    const maxErrorsToggleAction: ToggleAction[] = [
        {
            handler: () => {
                setPreview({...preview, maxErrors: 10})

            }, title: '10'
        },
        {
            handler: () => {
                setPreview({...preview, maxErrors: 5})

            }, title: '5'
        },
        {
            handler: () => {
                setPreview({...preview, maxErrors: 3})

            }, title: '3'
        },
        {
            handler: () => {
                setPreview({...preview, maxErrors: 0})

            }, title: 'Бесконечность'
        },
    ]


    const errorsToggleAction: ToggleAction[] = [
        {
            handler: () => {
                setPreview({...preview, errorsLevel: ErrorsLevel.SHOW_ALL})

            }, title: 'Показывать'
        },
        {
            handler: () => {
                setPreview({...preview, errorsLevel: ErrorsLevel.DONT_SHOW})

            }, title: 'Не показывать'
        },
    ]


    const durationActions: ToggleAction[] = [
        {
            handler: () => {
                setPreview({...preview, secondDuration: 900})

            }, title: '15 минут'
        },

        {
            handler: () => {
                setPreview({...preview, secondDuration: 600})

            }, title: '10 минут'
        },
        {
            handler: () => {
                setPreview({...preview, secondDuration: 300})

            }, title: '5 минут'
        },
        {
            handler: () => {
                setPreview({...preview, secondDuration: 0})

            }, title: 'Бесконечность'
        },
    ]


    if (gameState) return (
        <Match id={gameState}></Match>
    )
    else return (
        <div className={style.game}>
                <Label>
                    <h1 >Создание игры</h1>
                </Label>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <div className={style.grid_container}>
                        {
                            !fieldIsLoading ? <PreviewGrid cells={preview.cells}/>
                                : <h1>Загрузка...</h1>
                        }
                    </div>
                    <div className={style.tabs}>
                        <div className={style.game_tab}>
                            <HiHeart/>
                            {preview.maxErrors == 0 ? <FaInfinity/> : <h1>{preview.maxErrors}</h1>}
                        </div>
                        <div className={style.game_tab}>

                            {preview.level === GameLevel.EASY ? <GiDiceSixFacesFive/> : ''}
                            {preview.level === GameLevel.MEDIUM ? <GiDiceSixFacesFour/> : ''}
                            {preview.level === GameLevel.HARD ? <GiDiceSixFacesThree/> : ''}
                        </div>

                        <div className={style.game_tab}>

                            {preview.errorsLevel === ErrorsLevel.DONT_SHOW ? <HiEyeOff/> : ''}
                            {preview.errorsLevel === ErrorsLevel.SHOW_ALL ? <HiEye/> : ''}
                        </div>
                        <div className={style.game_tab}>

                            <HiClock/>

                            {preview.secondDuration === 0 ? <FaInfinity/> : <h1>{preview.secondDuration}s</h1>}
                        </div>
                    </div>
                </div>
                <ComboList title={'Настройки'}>
                    <Properties>
                        <Property>
                            <p>Сложность</p>
                                <MultiToggle setIndex={0} actions={difficultyToggleActions}></MultiToggle>
                        </Property>
                        <Property>
                            <p>Кол-во ошибок</p>
                                <MultiToggle setIndex={1} actions={maxErrorsToggleAction}></MultiToggle>
                        </Property>
                        <Property>
                            <p>Видимость ошибок</p>
                                <MultiToggle setIndex={0} actions={errorsToggleAction}></MultiToggle>
                        </Property>
                        <Property>
                            <p>Длительность игры</p>
                                <MultiToggle setIndex={0} actions={durationActions}></MultiToggle>
                        </Property>
                    </Properties>
                </ComboList>
            <Label>
                <RippleButton onClick={handleMatchCreation} className={'accent'}>
                    Начать
                </RippleButton>
                <RippleButton onClick={handleFieldRemake}>
                    Пересоздать поле
                </RippleButton>

            </Label>
        </div>
    );
};

export default Game;