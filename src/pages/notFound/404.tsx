import { FC } from "react";
import { Button, Result } from 'antd';
import {NavigateFunction, useNavigate} from "react-router-dom";

const Page404: FC = () => {
    const navigate: NavigateFunction = useNavigate();

    const handleNavigate = (): void => {
        navigate('/');
    };

    return (
        <Result
            style={{ width: '100vw', height: '75vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
            status="404"
            title="404"
            subTitle="Ресурс не найден!"
            extra={<Button onClick={handleNavigate} type="primary">Вернуться на главную</Button>}
        />
)}
export default Page404;