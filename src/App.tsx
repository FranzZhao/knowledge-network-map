import React from 'react';
// import React-Router-DOM
import {
    HashRouter as Router,
    Route,
    Switch,
    Redirect
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
// redux
import { useSelector } from './redux/hooks';

// * Private Router: The user who has jwt token could get into this router
const PrivateRouter = ({ component, isAuthenticated, ...rest }) => {
    // the user don't have jwt token, then redirect to login page
    if (!isAuthenticated) {
        return <Redirect to={{ pathname: "/user/login" }} />;
    }
    return <Route render={()=>component} {...rest} />;
}

const App: React.FC = () => {
    const jwt = useSelector(state => state.user.token);

    return (
        <Router>
            <Switch>
                {/* Login & Register */}
                <Route path="/user/login" render={() => (<LoginLayout />)} />
                <Route path="/user/register" render={() => (<LoginLayout />)} />
                {/* Main: need login -> jwt */}
                <PrivateRouter isAuthenticated={jwt !== null} component={<MainLayout><HomePage /></MainLayout>} exact path="/" />
                <PrivateRouter isAuthenticated={jwt !== null} component={<MainLayout><KNMListPage /></MainLayout>} path="/main/list" />
                <PrivateRouter isAuthenticated={jwt !== null} component={<MainLayout><SearchPage /></MainLayout>} path="/main/search" />
                <PrivateRouter isAuthenticated={jwt !== null} component={<MainLayout><KNMDetailPage /></MainLayout>} path="/main/detail" />
                <PrivateRouter isAuthenticated={jwt !== null} component={<MainLayout><UserSpacePage /></MainLayout>} path="/main/userSpace" />
                {/* 404 NOT FOUND */}
                <Route render={() => <h1>404 NOT FOUND</h1>} />
            </Switch>
        </Router>
    )
};

export default App;