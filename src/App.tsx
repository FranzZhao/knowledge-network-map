import React, {useEffect} from 'react';
// import React-Router-DOM
import {
    HashRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import { useHistory } from 'react-router';
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
import { useDispatch } from 'react-redux';
import { userJWTVerify } from './redux/user/slice';

// Private Route
const PrivateRoute = ({component, ...rest}) => {
    const jwt = useSelector(state => state.user.token);
    const dispatch = useDispatch();

    const jwtVerify = async () => {
        const data = await dispatch(userJWTVerify({
            jwt: jwt
        }));
        console.log(data['type']);
    };

    useEffect(()=>{
        jwtVerify();
    });

    // 如果用户没登录, 则重定向到登录页面
    const routeComponent = (props) => {
        return jwt !== null ? (
            React.createElement(component, props)
        ) : (
            <Redirect to={{pathname: "/user/login"}}/>
        );
    }
    return <Route render={routeComponent} {...rest} />;
};

const App: React.FC = () => {

    return (
        <Router>
            <Switch>
                {/* Login & Register */}
                <Route path="/user/login" render={() => (<LoginLayout />)} />
                <Route path="/user/register" render={() => (<LoginLayout />)} />
                {/* Main: need login -> jwt */}
                <PrivateRoute component={()=><MainLayout><HomePage /></MainLayout>} exact path="/" />
                <PrivateRoute component={()=><MainLayout><KNMListPage /></MainLayout>} path="/main/list" />
                <PrivateRoute component={()=><MainLayout><SearchPage /></MainLayout>} path="/main/search" />
                <PrivateRoute component={()=><MainLayout><KNMDetailPage /></MainLayout>} path="/main/detail" />
                <PrivateRoute component={()=><MainLayout><UserSpacePage /></MainLayout>} path="/main/userSpace" />
                {/* 404 NOT FOUND */}
                <Route render={() => <h1>404 NOT FOUND</h1>} />
            </Switch>
        </Router>
    )
};

export default App;