import React from 'react';
// import React-Router-DOM
import {
    HashRouter as Router,
    Route,
    Switch,
} from 'react-router-dom';
// import Layout
import { MainLayout, LoginLayout } from './layout';
// import page
import {
    HomePage,
    KNMListPage,
    SearchPage,
    KNMDetailPage,
    UserSpacePage,
} from './pages';

const App: React.FC = () => {
    return (
        <Router>
            <Switch>
                {/* Login & Register */}
                <Route path="/user/login" render={() => (<LoginLayout />)} />
                <Route path="/user/register" render={() => (<LoginLayout />)} />
                {/* Main Page: need user login -> jwtVerify in PageTabs.tsx */}
                <Route render={() => <MainLayout><HomePage /></MainLayout>} exact path="/" />
                <Route render={() => <MainLayout><KNMListPage /></MainLayout>} path="/main/list" />
                <Route render={() => <MainLayout><SearchPage /></MainLayout>} path="/main/search" />
                <Route render={() => <MainLayout><KNMDetailPage /></MainLayout>} path="/main/detail" />
                <Route render={() => <MainLayout><UserSpacePage /></MainLayout>} path="/main/userSpace" />
                {/* 404 NOT FOUND */}
                <Route render={() => <h1>404 NOT FOUND</h1>} />
            </Switch>
        </Router>
    )
};

export default App;