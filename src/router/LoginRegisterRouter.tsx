import React from 'react';
// import React-Router-DOM
import {
    BrowserRouter,
    Route,
    Switch,
    Link
} from 'react-router-dom';

export const LoginRegisterRouter: React.FC = () => {
    return (
        <BrowserRouter>
            <ul>
                <li><Link to={'/user/login'}>login</Link></li>
                <li><Link to={'/user/register'}>register</Link></li>
            </ul>
            <Switch>
                <Route path="/user/login" component={LoginPage} />
                <Route path="/user/register" component={RegisterPage} />
                <Route render={() => { return (<h1>404 NOT FOUND</h1>) }} />
            </Switch>
        </BrowserRouter>
    )
}

const LoginPage = () => {
    return (
        <h1>登录</h1>
    );
}

const RegisterPage = () => {
    return (
        <h1>注册</h1>
    );
}