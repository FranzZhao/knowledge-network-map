import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme: Theme) => createStyles({
    contain: {
        overflow: 'auto',
        '&::-webkit-scrollbar': {
            width: 5,
            backgroundColor: theme.palette.type === 'light' ? '#ffffff' : '#2e3642',
        },
        '&::-webkit-scrollbar-thumb': {
            background: theme.palette.type === 'light' ? '#cecdcdb8' : '#787e86a6',
            borderRadius: '6px',
        },
    }
}));

interface DialogBoxState {
    open: boolean;
    title: any;
    contain: any;
    actions: any;
    boxSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}
export const DialogBox: React.FC<DialogBoxState> = ({
    open, title, contain, actions, boxSize = 'md'
}) => {
    const classes = useStyles();

    return (
        <Dialog
            open={open}
            // onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth={boxSize}
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent className={classes.contain}>
                {contain}
            </DialogContent>
            <DialogActions>
                {actions}
            </DialogActions>
        </Dialog>
    )
}
