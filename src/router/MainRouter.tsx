import React from 'react';
// import Layout
import {MainLayout} from '../layout';
// import page
import {
    HomePage,
    KNMListPage,
    SearchPage,
    KNMDetailPage,
} from '../pages';

interface MainRouterState {
    router: string;
}
export const MainRouter:React.FC<MainRouterState> = ({
    router
}) => {

    const handleChoiceRouter = (router) => {
        switch (router) {
            case '/':
                return <HomePage />;
            case '/list':
                return <KNMListPage />;
            case '/search':
                return <SearchPage />;
            case '/detail':
                return <KNMDetailPage />;
            default:
                return <HomePage />;
        }
    }

    return (
        <MainLayout>
            {
                handleChoiceRouter(router)
            }  
        </MainLayout>
    )
}
