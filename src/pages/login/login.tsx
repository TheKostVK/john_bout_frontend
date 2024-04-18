import React from 'react';
import { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import { ILoginRequest, ILoginResponse } from "../../services/interface/IAuthService";
import { useLoginMutation } from "../../services/authService";
import messageUtility from "../../components/utility/messageUtility";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/reducers/authSlice";

const LoginPage = () => {
    const [form] = Form.useForm();

    const [login] = useLoginMutation();

    const dispatch = useDispatch();

    const onFinish: FormProps<ILoginRequest>['onFinish'] = (values: ILoginRequest): void => {
        messageUtility.showMessage({
            key: 'login',
            type: 'loading',
            duration: 0,
            content: 'Вход в аккаунт...'
        });

        login(values).unwrap().then((respLogin: ILoginResponse): void => {
            if (respLogin.success) {
                messageUtility.showMessage({
                    key: 'login',
                    type: 'success',
                    content: 'Вход выполнен'
                });

                dispatch(setUser(respLogin.data));
            } else {
                messageUtility.showMessage({
                    key: 'login',
                    type: 'error',
                    duration: 5,
                    content: 'Неправильные данные'
                });

                form.resetFields();
            }
        }).catch((error): void => {
            messageUtility.showMessage({
                key: 'login',
                type: 'error',
                content: `Статус: ${ error.status }. Ошибка: ${ error.data.message }`
            });
        });
    };

    return (
        <div style={ { minHeight: '100vh' } } className={ 'flex justify-center items-center' }>
            <Form
                form={ form }
                name="basic"
                labelCol={ { span: 8 } }
                wrapperCol={ { span: 16 } }
                style={ { maxWidth: 600 } }
                initialValues={ { remember: true } }
                onFinish={ onFinish }
                autoComplete="off"
            >
                <Form.Item<ILoginRequest>
                    label="email"
                    name="email"
                    rules={ [{ required: true, message: 'Please input your username!' }] }
                >
                    <Input/>
                </Form.Item>

                <Form.Item<ILoginRequest>
                    label="Password"
                    name="password"
                    rules={ [{ required: true, message: 'Please input your password!' }] }
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item wrapperCol={ { offset: 8, span: 16 } }>
                    <Button type="primary" htmlType="submit">
                        Войти
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default LoginPage;