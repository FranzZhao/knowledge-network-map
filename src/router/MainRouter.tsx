import React from 'react';
// import Layout
import { MainLayout } from '../layout';
// import page
import {
    HomePage,
    KNMListPage,
    SearchPage,
    KNMDetailPage,
} from '../pages';
// import React-Router-DOM
import {
    BrowserRouter,
    Route,
    Switch,
    Link,
    Redirect
} from 'react-router-dom';

export const MainRouter: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/main/home" render={() => (<MainLayout><HomePage /></MainLayout>)} />
                <Route path="/main/list" render={() => (<MainLayout><KNMListPage /></MainLayout>)} />
                <Route path="/main/search" render={() => (<MainLayout><SearchPage /></MainLayout>)} />
                <Route path="/main/detail" render={() => (<MainLayout><KNMDetailPage /></MainLayout>)} />
                <Route render={() => { return (<h1>404 NOT FOUND</h1>) }} />
            </Switch>
        </BrowserRouter>
    )
}
