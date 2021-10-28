import React, { useEffect, useState } from 'react';
// import MD
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
// import img
import bgImg from '../../assets/image/loginBackground.png';
// import redux
import { useDispatch } from 'react-redux';
import { useSelector } from '../../redux/hooks';
import { changeCurrentTheme } from '../../redux/changeTheme/slice';
// router
import { useHistory, useLocation } from 'react-router-dom';
// import page
import { Login, Register } from '../../pages/loginRegister';

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
    const currentRouter = useLocation().pathname;
    const history = useHistory();
    // change login page to dark theme => let the form show white color
    const currentTheme = useSelector(state => state.changeTheme.currentTheme);
    const dispatch = useDispatch();
    const [changeColor, setChangeColor] = useState(false);

    useEffect(()=>{
        // console.log(currentRouter);
        if (currentTheme === 'light'){
            dispatch(changeCurrentTheme('dark'));
            setChangeColor(true);
        }
    },[]);

    const handleLogin = () => {
        if (changeColor){
            dispatch(changeCurrentTheme('light'));
        }
        history.push('/');
    };

    return (
        <React.Fragment>
            <div className={classes.root}></div>
            {
                currentRouter === '/user/login/' || currentRouter === '/user/login' ? (
                    // login page
                    <Login 
                        handleLogin={handleLogin}
                    />
                ) : (
                    // register page
                    <Register />
                )
            }
        </React.Fragment>
    )
}
