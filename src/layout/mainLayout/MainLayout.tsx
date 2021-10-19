import React from 'react'
// import MD components & components
// import clsx from 'clsx';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
// import { Grid } from '@material-ui/core';
// import customize components
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
        // <Grid container spacing={0}>
        //     <Grid item xs={1}>
        //         <LeftDrawer />
        //     </Grid>
        //     <Grid item xs={11}>
        //         <PageTabs />
        //         <div className={clsx({
        //             [classes.mainContent]: leftDrawerOpenState,
        //             [classes.mainContentSmallScreen]: !leftDrawerOpenState,
        //         })}>
        //             {children}
        //         </div>
        //     </Grid>
        // </Grid>
    )
}