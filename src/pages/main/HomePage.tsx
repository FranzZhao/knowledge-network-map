import React from 'react';
// import MD components & components
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
    main: {
        // height: '100vh',
        lineHeight: '650px',
        fontSize: '50px',
        color: '#c2c2c2',
        letterSpacing: '12px',
        textAlign: 'center',
        // width: 'calc(100vw - 240px)',
        userSelect: 'none',
    },
}));

export const HomePage: React.FC = () => {
    const classes = useStyles();

    return (
            <div className={classes.main}>
                欢迎使用知识网络笔记工具
            </div>
    )
}
