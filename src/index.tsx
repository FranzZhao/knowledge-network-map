import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// Import Material Theme
import {createTheme, ThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
// import redux
// import {Provider} from "react-redux";
// import rootStore from "./redux/store";
// import {useSelector} from './redux/hooks';

const Index:React.FC = () => {
    // const themeMode = useSelector(state => state.theme.currentMode);

    // System Default Theme
    const theme = createTheme({
        palette: {
            type: 'light',
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
            error:{
                light: '#ff7171',
                main: '#f44336',
                dark: '#d32f2f',
            },
            action: {
                hover: 'rgb(0 0 0 / 4%)',  //4
                selected: 'rgb(0 0 0 / 8%)',  //8
            }
        },

    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <App/>
        </ThemeProvider>
    );
};

ReactDOM.render(
    // <React.StrictMode>
    // 全局链接Redux
    // <Provider store={rootStore.store}>
        <Index />
    // </Provider>
    // </React.StrictMode>,
    ,document.getElementById('root')
);
