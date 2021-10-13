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
import { MainLayout } from './layout';
// import page
import {
    HomePage,
    KNMListPage,
    SearchPage,
    KNMDetailPage,
} from './pages';

const App: React.FC = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" render={() => (<MainLayout><HomePage /></MainLayout>)} />
                <Route path="/main/list" render={() => (<MainLayout><KNMListPage /></MainLayout>)} />
                <Route path="/main/search" render={() => (<MainLayout><SearchPage /></MainLayout>)} />
                <Route path="/main/detail" render={() => (<MainLayout><KNMDetailPage /></MainLayout>)} />
                <Route path="/user/login" component={LoginPage} />
                <Route path="/user/register" component={RegisterPage} />
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