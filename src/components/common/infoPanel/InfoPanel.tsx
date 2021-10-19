import React from 'react';
// MD style & component
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Grid, Paper, Typography } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

interface InfoPanelState {
    title: any;
    contain: any;
    handleClosePanel: () => void;
}
export const InfoPanel: React.FC<InfoPanelState> = ({
    title, contain, handleClosePanel
}) => {
    const useStyles = makeStyles((theme: Theme) => createStyles({
        infoPanel: {
            flex: 'flow',
            position: 'fixed',
            top: 97,
            right: 0,
            padding: 20,
            backgroundColor: theme.palette.type === "light" ? '#e3eded' : '#273244',
            // backgroundColor: theme.palette.background.paper,
            width: 400,
            height: 'calc(100vh - 97px)',
            borderRadius: 0,
            boxShadow: 'none',
            overflow: 'auto',
            '&::-webkit-scrollbar': {
                width: 5,
                backgroundColor: theme.palette.type === 'light' ? '#e3eded' : '#424242',
            },
            '&::-webkit-scrollbar-thumb': {
                background: theme.palette.type === 'light' ? '#ffb74d' : '#707070b3',
                borderRadius: '8px',
            },
        },
        infoPanelTitle: {
            fontSize: '18px !important',
        },
        infoPanelCloseBtn: {
            marginTop: 3,
            "&:hover": {
                cursor: 'pointer',
                color: theme.palette.secondary.main,
            }
        },
    }));
    const classes = useStyles();

    return (
        <Paper className={classes.infoPanel}>
            <Grid container direction="row" justifyContent="space-between">
                <Typography
                    variant="h6" gutterBottom
                    className={classes.infoPanelTitle}
                >{title}</Typography>
                <HighlightOffIcon fontSize="small" className={classes.infoPanelCloseBtn} onClick={handleClosePanel} />
            </Grid>
            {contain}
        </Paper>
    )
}
