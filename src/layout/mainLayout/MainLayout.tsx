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
            <LeftDrawer />
            <div>
                <PageTabs />
                <div className={classes.mainContent}>
                    <div style={{
                        lineHeight: '600px',
                        marginLeft: 350,
                        // textAlign: 'center',
                        fontSize: 40,
                        color: '#c2c2c2',
                        letterSpacing: '10px',
                    }}>
                        欢迎使用知识网络笔记工具
                    </div>
                </div>
            </div>
        </Grid>
    )
}
