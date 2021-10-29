import React, { useState, useEffect } from 'react'
// import MD components & components
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
// import Main Layout Components
import {
    LeftDrawer,
    PageTabs
} from '../../components/layout';

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        display: 'flex',
    },
    main: {
        flexGrow: 1,
    },
}));

export const MainLayout: React.FC = ({ children }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <LeftDrawer />
            <div className={classes.main}>
                <PageTabs />
                <div style={{ marginTop: 50 }}>
                    {children}
                </div>
            </div>
        </div>
    )
}