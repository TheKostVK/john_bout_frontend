import { FC } from "react";
import { Button, Result } from 'antd';
import { NavigateFunction, useNavigate } from "react-router-dom";

const Page403: FC = () => {
    const navigate: NavigateFunction = useNavigate();

    const handleNavigate = (): void => {

        navigate('/');
    };


    return (
        <Result
            style={ {
                width: '100vw',
                height: '75vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
            } }
            status="403"
            title="403"
            subTitle="У Вас нет прав на запрашиваемый модуль, для доступа обратитесь к администратору системы"
            extra={ <Button onClick={ handleNavigate } type="primary">Сменить пользователя</Button>
            }
        />
    )
}
export default Page403;