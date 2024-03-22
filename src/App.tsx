import React, { useEffect } from 'react';
import './App.css';
import AppRouter from "./components/AppRouter";

function App() {

    useEffect(() => {

    }, []);

    return (
        <div className={ 'App' }>
            <AppRouter/>
        </div>
    );
}

export default App;
