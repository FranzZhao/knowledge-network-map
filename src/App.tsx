import React from 'react';
// import React-Router-DOM
import {
    BrowserRouter,
    Route,
    Switch,
} from 'react-router-dom';
// import Layout
import { MainLayout } from './layout';
// import customize router
import { MainRouter } from './router';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" render={() => <MainRouter router='/' />} exact />
                <Route path="/list" render={() => <MainRouter router='/list' />} exact />
                <Route path="/search" render={() => <MainRouter router='/search' />} exact />
                <Route path="/detail" render={() => <MainRouter router='/detail' />} exact />
                <Route render={() => <MainLayout>404 NOT FOUND</MainLayout>} />
            </Switch>
        </BrowserRouter>
    )
};

export default App;