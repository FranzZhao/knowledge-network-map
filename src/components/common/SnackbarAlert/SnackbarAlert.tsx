import React from 'react';
// MD components
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'

interface State {
    open: boolean;
    type: 'success' | 'error' | 'warning' | 'info';
    msg: string;
    handleCloseSnackbar: (event?: React.SyntheticEvent, reason?: string)=>void;
    autoClose?: boolean;
    duration?: number;
};

export const SnackbarAlert:React.FC<State> = ({
    open, type, msg, handleCloseSnackbar, autoClose=true, duration=5000
}) => {
    return (
        <Snackbar open={open} autoHideDuration={duration} onClose={autoClose?handleCloseSnackbar:()=>{}} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <Alert onClose={handleCloseSnackbar} severity={type}>
                {msg}
            </Alert>
        </Snackbar>
    )
}
