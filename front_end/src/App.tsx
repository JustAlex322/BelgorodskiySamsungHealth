
import { Container } from 'react-bootstrap';

import './App.css';

import Header from './components/header/Header';

import MainContainer from './components/main/Main';
import { Route, Routes } from 'react-router-dom';
import { auth, AuthRoutes, main, MainRoutes, admin, AdminRoutes, profile, diets, DietsRoutes } from './Routes/Routes';
import AuthContainer from './components/auth/AuthContainer';
import NavBar from './components/navBar/NavBar';
import TrainingContainer from './components/training/TraininigContainer';
import AdminPanelContainer from './components/adminPanel/AdminPanel';
import AdminTrainingRedactor from './components/adminPanel/adminTrainingRedactor/AdminTrainingRedactor';
import AdminAddTrainingMenu from './components/adminPanel/adminAddTrainingMenu/AdminAddTrainingMenu';
import ProfileContainer from './components/profile/ProfileContainer';
import DietsContainer from './components/diets/DIetsContainer';
import AdminCreateDIets from './components/adminPanel/adminCreateDIets/AdminCreateDIets';
import AdminAddRedactDiets from './components/adminPanel/adminAddRedactDiets/AdminAddRedactDiets';
import FullDescriptionDiet from './components/diets/fullDescriptionDiet/FullDescriptionDiet';
import AdminCreateDish from './components/adminPanel/adminCreateDish/AdminCreateDish';
import { useAppSelector } from './app/hooks';

//---------------------------------------------------- ПРИВЕТ САНЯ!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!----------------------

function App() {

    let isAuth = useAppSelector(state => state.auth.isAuth)

    return (
        <div className="App">
            <Header />
            <Container className='d-flex'>
                {isAuth ? <NavBar /> : <></>}
                <div className='flex-fill d-flex justify-content-center'>
                    <Routes>

                        <Route path={main}>
                            <Route path={main} element={<MainContainer />} />
                            <Route path={MainRoutes.training} element={<TrainingContainer />} />
                        </Route>

                        <Route path={auth}>
                            <Route path={AuthRoutes.authRoute} element={<AuthContainer isRegistration={false} />} />
                            <Route path={AuthRoutes.registration} element={<AuthContainer isRegistration={true} />} />
                        </Route>

                        <Route path={admin}>
                            <Route path={admin} element={<AdminPanelContainer />} />

                            <Route path={AdminRoutes.redactOfTrain} element={<AdminTrainingRedactor/>}/>
                            <Route path={AdminRoutes.createTraining} element={<AdminAddTrainingMenu/>}/>

                            <Route path={AdminRoutes.redactDiets} element={<AdminAddRedactDiets/>}/>
                            <Route path={AdminRoutes.createDiets} element={<AdminCreateDIets/>}/>
                            <Route path={AdminRoutes.createDish} element={<AdminCreateDish/>}/>
                        </Route>

                        <Route path={profile} element={<ProfileContainer/>}/>

                        <Route path={diets}>
                            <Route path={diets} element={<DietsContainer/>}/>
                            <Route path={DietsRoutes.fullDescription} element={<FullDescriptionDiet/>}/>
                        </Route>
                        
                    </Routes>
                </div>
            </Container>
        </div>
    );
}

export default App;
