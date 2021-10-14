import React from 'react';
// import React-Router-DOM
import {
    HashRouter as Router,
    Route,
    Switch,
} from 'react-router-dom';
// import customize router
// import { MainRouter, LoginRegisterRouter } from './router';
// import Layout
import { MainLayout, LoginLayout } from './layout';
// import page
import {
    HomePage,
    KNMListPage,
    SearchPage,
    KNMDetailPage,
} from './pages';
import {Login, Register} from './pages/loginRegister';

const App: React.FC = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" render={() => (<MainLayout><HomePage /></MainLayout>)} />
                <Route path="/main/list" render={() => (<MainLayout><KNMListPage /></MainLayout>)} />
                <Route path="/main/search" render={() => (<MainLayout><SearchPage /></MainLayout>)} />
                <Route path="/main/detail" render={() => (<MainLayout><KNMDetailPage /></MainLayout>)} />
                <Route path="/user/login" render={() => (<LoginLayout />)} />
                <Route path="/user/register" render={() => (<LoginLayout />)} />
                <Route render={() => <h1>404 NOT FOUND</h1>} />
            </Switch>
        </Router>
    )
};

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

export default App;