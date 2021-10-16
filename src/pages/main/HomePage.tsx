import React from 'react';
// import MD components & components
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
    main: {
        height: 'calc(100vh - 50px)',
        width: '100%',
        userSelect: 'none',
        display: 'flex',
    },
    text: {
        margin: 'auto',
        color: '#c2c2c2',
        fontSize: 50,
        letterSpacing: '16px',
        textAlign: 'center',
    }
}));

export const HomePage: React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.main}>
            <div className={classes.text}>
                欢迎使用知识网络笔记工具
            </div>
        </div>
    )
}
