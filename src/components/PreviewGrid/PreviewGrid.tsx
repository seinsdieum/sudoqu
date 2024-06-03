import style from './PreviewGrid.module.css'
import {GamePreview} from "../../types";


type Props = {
    cells: number[81]
}
const PreviewGrid = (props: Props) => {
    return (
        <div className={style.p_layout} >
            <div className={style.p_grid_container}>
                <div className={style.p_grid}>
                    {props.cells.map((c, index) => <div key={index} className={style.p_cell}>{c !== 0 ? c : ' '}</div>)}
                </div>
            </div>
    </div>
    );
};

export default PreviewGrid;