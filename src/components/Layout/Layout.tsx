import style from './Layout.module.css'
import {HiCog, HiHome, HiInformationCircle, HiWindow} from "react-icons/hi2";
import {GiJoystick} from "react-icons/gi";
import {NavLink, Outlet} from "react-router-dom";
import Container from '@seinsdieum/elliptical-ui/src/components/Container/Container'
import {FaFantasyFlightGames, FaGamepad, FaHourglassStart} from "react-icons/fa6";
import {useState} from "react";
import {FcStart} from "react-icons/fc";
import {MdStart} from "react-icons/md";
import {GoMoveToStart} from "react-icons/go";
import {SiStartrek} from "react-icons/si";
import {FaHistory} from "react-icons/fa";
import {HiViewList} from "react-icons/hi";
const Layout = () => {

    const [tabsHidden, setTabsHidden] = useState<boolean>(false)


    return (
        <div className={style.layout}>
            <div className={style.header}>

                <div>
                    <div className={style.tab}>
                        <FaGamepad onClick={() => setTabsHidden(!tabsHidden)}/>
                        {tabsHidden ? '' : <h2>sudo.qu</h2>}
                    </div>
                    <NavLink className={(props) => {
                        return props.isActive ? style.tab+' '+style.selected : style.tab
                    }
                    } to={'game'}>
                        {tabsHidden ? <MdStart/> : <p>Играть</p>}

                    </NavLink>
                    <NavLink className={(props) => {
                        return props.isActive ? style.tab+' '+style.selected : style.tab
                    }
                    } to={'history'}>
                        {tabsHidden ? <HiViewList/> :<p>История</p> }

                    </NavLink>


                </div>
                <div>
                    <NavLink className={(props) => {
                        return props.isActive ? style.tab+' '+style.selected : style.tab
                    }
                    } to={'settings'}>
                        {tabsHidden ? <HiCog/> : <p>Параметры</p> }

                    </NavLink>
                    <NavLink className={(props) => {
                        return props.isActive ? style.tab+' '+style.selected : style.tab
                    }
                    } to={'about'}>
                        {tabsHidden ? <HiInformationCircle/> : <p>Об игре</p>}

                    </NavLink>
                </div>
            </div>
            <div className={style.content}>
                <Outlet/>
            </div>
        </div>
    );
};

export default Layout;