import React from 'react';
// import React-Router-DOM
import {
    BrowserRouter,
    Route,
    Switch,
} from 'react-router-dom';
// import Layout
import { MainLayout } from './layout';
// import Pages
import {
    HomePage,
    KNMListPage,
    SearchPage,
    KNMDetailPage,
} from './pages';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                {/* Main Layout*/}
                <MainLayout>
                    <Route path="/" component={HomePage} exact />
                    <Route path="/home" component={HomePage} exact />
                    <Route path="/list" component={KNMListPage} />
                    <Route path="/search" component={SearchPage} />
                    <Route path="/detail" component={KNMDetailPage} />
                </MainLayout>
            </Switch>
        </BrowserRouter>
    )
};

export default App;