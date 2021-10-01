import React from 'react'
// import MD components & components
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
// import customize components
import {
    LeftDrawer,
    PageTabs
} from '../../components/layout';

const useStyles = makeStyles((theme: Theme) => createStyles({
    mainContent: {
        marginTop: 50,
    },
}));

export const MainLayout: React.FC = () => {
    const classes = useStyles();

    return (
        <Grid container>
            <Grid item>
                <LeftDrawer />
            </Grid>
            <Grid item>
                <PageTabs />
                <div className={classes.mainContent}>
                    <div style={{textAlign: 'center'}}>
                        欢迎使用知识地图网络
                    </div>
                </div>
            </Grid>
        </Grid>
    )
}
