import React from 'react';
// import MD components & components
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
    main: {
        // height: 'calc(100vh - 50px)',
        lineHeight: '650px',
        fontSize: '50px',
        color: '#c2c2c2',
        letterSpacing: '12px',
        textAlign: 'center',
        // width: 'calc(100vw - 240px)',
        userSelect: 'none',
    },
}));

export const SearchPage:React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.main}>
            搜索页面
        </div>
    )
}
