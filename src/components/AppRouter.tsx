import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Page404 from "../pages/notFound/404";
import Main from "../pages/Main/Main";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Login from "../pages/login/login";

const AppRouter = () => {
    const { isAuthenticated } = useSelector((state: RootState) => state.authReducer);

    return (
        <Routes>
            {/* Маршруты для авторизованных пользователей */ }
            <Route path="/" element={ isAuthenticated ? <Main/> : <Login/> }/>
            <Route path="/customers" element={ isAuthenticated ? <Main/> : <Login/> }/>
            <Route path="/manufacturing" element={ isAuthenticated ? <Main/> : <Login/> }/>
            <Route path="/warehouse" element={ isAuthenticated ? <Main/> : <Login/> }/>
            <Route path="/contracts" element={ isAuthenticated ? <Main/> : <Login/> }/>

            {/* Дополнительные маршруты */ }
            <Route path="/*" element={ <Page404/> }/>
        </Routes>
    );
};

export default AppRouter;
