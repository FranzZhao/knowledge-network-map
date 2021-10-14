import React from 'react';
// import MD
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
// import img
import bgImg from '../../assets/image/loginBackground.png';

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        background: `url(${bgImg})`,
        backgroundSize: 'cover',
        filter: 'brightness(0.6)',
        width: '100vw',
        height: '100vh',
    },

       
}));

export const LoginLayout: React.FC = ({children}) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <div className={classes.root}></div>
            {children}
        </React.Fragment>
    )
}
