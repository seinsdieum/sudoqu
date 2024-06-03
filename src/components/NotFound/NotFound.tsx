import style from './NotFound.module.css'
import Section from "@seinsdieum/elliptical-ui/src/components/Section/Section";
import {Outlet, useNavigate} from "react-router-dom";

const NotFound = () => {

    const navigate = useNavigate()

    return (
        <div className={style.not__found}>
            <Section>
                <h1>Страница не найдена</h1>
                <button onClick={() => navigate('/sudoqu')}>Перейти на главную</button>
            </Section>
        </div>
    );
};

export default NotFound;