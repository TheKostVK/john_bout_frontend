import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Page404 from "../pages/notFound/404";
import Main from "../pages/Main/Main";

const AppRouter = () => {

    return (
        <Routes>
            {/* Маршруты для авторизованных пользователей */ }
            <Route path="/" element={ <Main/> }/>
            <Route path="/customers" element={ <Main /> }/>
            <Route path="/manufacturing" element={ <Main /> }/>
            <Route path="/warehouse" element={ <Main /> }/>
            <Route path="/contracts" element={ <Main /> }/>

            {/* Дополнительные маршруты */ }
            <Route path="/*" element={ <Page404/> }/>
        </Routes>
    );
};

export default AppRouter;
