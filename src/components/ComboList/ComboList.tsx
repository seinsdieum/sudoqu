import style from './Combolist.module.css'
import {ReactNode, useState} from "react";
import {BiExpand} from "react-icons/bi";
import {HiMiniChevronDown} from "react-icons/hi2";
import Label from "@seinsdieum/elliptical-ui/src/components/Label/Label";


type Props = {
    children?: ReactNode,
    title: string
}

const ComboList = (props: Props) => {

    const [expanded, setExpanded] = useState<boolean>(false)


    return (
        <div className={style.list}>
            <div className={style.title_bar}>
                <Label stepped>
                    <p>{props.title}</p>
                </Label>
                <button onClick={() => setExpanded(!expanded)}>
                    <HiMiniChevronDown></HiMiniChevronDown>
                </button>
            </div>
            <div className={style.content + ' ' + (expanded ? '' : style.closed)}>
                {props.children}
            </div>
        </div>
    );
};

export default ComboList;