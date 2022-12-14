import { useEffect } from 'react';
import { redirect, Route, Routes, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { AuthRoutes, MainRoutes } from '../../Routes/Routes';
import withAuthRedicrect from './../HOC/withAuthRedirect';


interface IMainProps {
}

const MainContainer: React.FunctionComponent<IMainProps> = (props) => {

    return (
        <h3 >
            Спасибо что посетили наше приложение!
        </h3>
    );
};

export default withAuthRedicrect(MainContainer);
