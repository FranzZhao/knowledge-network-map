import React, { useState, useEffect } from 'react'
// import MD components & components
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
// import Main Layout Components
import {
    LeftDrawer,
    PageTabs
} from '../../components/layout';
// import redux
import { useSelector } from '../../redux/hooks';
import { useDispatch } from 'react-redux';
import { userJWTVerify } from '../../redux/user/slice';
// import router
import { useHistory } from 'react-router';
import { Route, Redirect } from 'react-router';

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
    const history = useHistory();
    const dispatch = useDispatch();
    const jwt = useSelector(state => state.user.token);
    const loading = useSelector(state => state.user.loading);

    // const jwtVerify = async () => {
    //     console.log('here!');
    //     const data = await dispatch(userJWTVerify({
    //         jwt: jwt
    //     }));
    //     console.log(data['type']);
    //     // if (loading) {
    //     //     const data = await dispatch(userJWTVerify({
    //     //         jwt: jwt
    //     //     }));
    //     //     console.log(data['type']);
    //     //     if (data['type'] === 'user/JWTVerify/rejected') {
    //     //         console.log('here!');
    //     //         return history.push('/user/login');
    //     //     }
    //     // }
    // }

    // useEffect(() => {
    //     jwtVerify();
    // },[]);

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