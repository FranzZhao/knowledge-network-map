import React from 'react'
// import MD components & components
import clsx from 'clsx';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
// import customize components
import {
    LeftDrawer,
    PageTabs
} from '../../components/layout';
// import Redux
import { useSelector } from '../../redux/hooks';

const useStyles = makeStyles((theme: Theme) => createStyles({
    mainContent: {
        marginTop: 50,
        width: 'calc(100vw - 240px)',
    },
    mainContentSmallScreen: {
        marginTop: 50,
        width: 'calc(100vw - 57px)',
    },
}));

export const MainLayout: React.FC = ({ children }) => {
    const classes = useStyles();
    const leftDrawerOpenState = useSelector(state => state.openLeftDrawer.drawerOpen);

    return (
        <Grid container>
            <Grid item>
                <LeftDrawer />
            </Grid>
            <Grid item>
                <PageTabs />
                <div className={clsx({
                    [classes.mainContent]: leftDrawerOpenState,
                    [classes.mainContentSmallScreen]: !leftDrawerOpenState,
                })}>
                    {children}
                </div>
            </Grid>
        </Grid>
    )
}