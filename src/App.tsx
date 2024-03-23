import React, { useEffect } from 'react';
import './App.css';
import AppRouter from "./components/AppRouter";
import { ConfigProvider } from "antd";

function App() {

    useEffect((): void => {

    }, []);

    return (
        <ConfigProvider
            theme={ {
                token: {
                    borderRadiusLG: 2,
                    borderRadius: 2,

                    colorBgBase: 'rgba(222,221,221,0.73)',
                    colorBgContainer: '#ffffff',
                },
            } }
        >
            <div className={ 'App' }>
                <AppRouter/>
            </div>
        </ConfigProvider>
    );
}

export default App;
