import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import styles from './index.css';
// Import Material Theme
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
// import redux
import { useDispatch } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import rootStore from "./redux/store";
import { useSelector } from './redux/hooks';
import { getKnmList } from './redux/knm/knmMapSlice';
import { updateSystemNavItem } from './redux/pageTabs/slice';
// import i18next, setting context automatic
import "./settings/i18n/config";

const Index: React.FC = () => {
    const dispatch = useDispatch();
    const currentTheme = useSelector(state => state.theme.currentTheme);
    const jwt = useSelector(state => state.user.token);
    const knmList = useSelector(state => state.knmMap.knmList);
    const currentOpenedTabs = useSelector(state => state.pageTabs.alreadyOpenedTabs);
    const currentActivatedTab = useSelector(state => state.pageTabs.currentActivatedTab);
    const systemNav = useSelector(state => state.pageTabs.projectNavMenuItems);
    // ! knmList initial -> only user enter the system -> jwt changed
    useEffect(()=>{
        dispatch(getKnmList({jwt: jwt}));
    },[jwt]);

    // ! System Nav Item chang -> when knmList changed
    useEffect(()=>{
        dispatch(updateSystemNavItem({
            knmList: knmList,
            currentOpenedTabs: currentOpenedTabs,
            currentActivatedTab: currentActivatedTab,
        }));
    },[knmList]);

    // System Default Theme
    const theme = createTheme({
        palette: {
            type: currentTheme,
            common: {
                black: '#000',
                white: '#fff',
            },
            primary: {
                light: '#4b9fea',
                main: '#1e88e5',
                dark: '#1a5678',
                contrastText: '#fff',
            },
            secondary: {
                light: '#ffc570',
                main: '#ffb74d',
                dark: '#b28035',
                contrastText: '#000',
            },
            error: {
                light: '#ff7171',
                main: '#f44336',
                dark: '#d32f2f',
            },
            action: {
                hover: 'rgb(0 0 0 / 4%)',  //4
                selected: 'rgb(0 0 0 / 12%)',  //8
            },
            background: {
                paper: currentTheme === 'light' ? '#fafafa' : '#2e3642',
                default: currentTheme === 'light' ? '#f7f7f7' : '#1f2733',
            }
        },

    });


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
        </ThemeProvider>
    );
};

ReactDOM.render(
    // <React.StrictMode>
    // 全局链接Redux
    <Provider store={rootStore.store}>
        <PersistGate loading={null} persistor={rootStore.persistor}>
            <Index />
        </PersistGate>
    </Provider>
    // </React.StrictMode>,
    , document.getElementById('root')
);
