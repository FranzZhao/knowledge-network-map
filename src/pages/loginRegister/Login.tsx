import React, { useState, useEffect } from 'react';
// import MD
import clsx from 'clsx';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Button, Checkbox, FormControlLabel, FormGroup, Grid, Paper, Typography, useMediaQuery } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CircularProgress from '@material-ui/core/CircularProgress';
// import customize
import { DialogBox, TextFieldWithVerification, PasswordWithVerification, SnackbarAlert } from '../../components/common';
// import router
import { useHistory } from 'react-router-dom';
// import customize hook
import { useKeyPress } from '../../hooks';
// import i18next
import { useTranslation } from 'react-i18next';
// import redux
import { useDispatch } from 'react-redux';
import { userLogin } from '../../redux/user/userSlice';
import { useSelector } from '../../redux/hooks';

const useStyles = makeStyles((theme: Theme) => createStyles({
    layer: {
        display: 'flex',
        position: 'fixed',
        top: 0,
        height: '100vh',
        width: '100vw',
    },
    infoBox: {
        margin: 'auto',
        display: 'flex',
        backgroundColor: '#182b36',
        textAlign: 'center',
        padding: 20,
        opacity: 0.8,
    },
    infoBoxNormal: {
        width: 500,
        height: 535,
        borderRadius: '10px',
    },
    infoBoxFullScreen: {
        display: 'flex',
        width: '100vw',
        height: '100vh',
        "&>*": {
            margin: 'auto',
        }
    },
    forms: {
        margin: 'auto',
        padding: '0 40px',
        '&>*': {
            marginBottom: theme.spacing(2),
            width: '100%',
        },
    },
    forgetBtn: {
        "&:hover": {
            cursor: 'pointer',
            color: theme.palette.secondary.main,
        }
    },
    forgetIcon: {
        fontSize: 20,
        marginBottom: -4,
    },
    loginBtn: {
        color: 'white',
        backgroundColor: '#f19813b3',
        marginTop: 4,
        letterSpacing: '15px'
    },
    loginRegister: {
        backgroundColor: '#273a4775',
        color: '#ffffffa6',
        paddingTop: 22,
        paddingBottom: 10,
        marginTop: 10,
        // marginLeft: 40,
        textAlign: 'center',
    },
    registerBtn: {
        marginTop: 5,
    },
}));

interface LoginState {
    email: string;
    emailErrorMsg: string;
    password: string;
    passwordErrorMsg: string;
    showPassword: boolean;
    rememberMe: boolean;
    openSnackbar: boolean;
    systemAlertSnackType: 'success' | 'error' | 'warning' | 'info';
    systemAlertSnackMsg: string;
}

interface LoginPageState {
    handleLogin: () => void;
}
export const Login: React.FC<LoginPageState> = ({
    handleLogin
}) => {
    // style
    const classes = useStyles();
    // i18n
    const { t } = useTranslation();
    // screen
    const match = useMediaQuery('(min-width:600px)');
    // user login value React State
    const [values, setValues] = useState<LoginState>({
        email: '',
        emailErrorMsg: '',
        password: '',
        passwordErrorMsg: '',
        showPassword: false,
        rememberMe: false,
        openSnackbar: false,
        systemAlertSnackType: 'success',
        systemAlertSnackMsg: '',
    });
    // router
    const history = useHistory();
    // email Reg. verification code
    const emailReg = /^([a-zA-Z]|[0-9])(\w|)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    // open forget password dialog
    const [open, setOpen] = React.useState(false);
    // key press hook
    const enterPressed = useKeyPress(13);
    // redux
    const dispatch = useDispatch();
    const loginLoading = useSelector(state => state.user.loading);
    const jwt = useSelector(state => state.user.token);

    const handleOpenDialog = () => {
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };

    // change text file value
    const handleChange = (prop: keyof LoginState) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    // remember me 
    const handleCheckRememberMe = () => {
        setValues({
            ...values,
            rememberMe: !values.rememberMe,
        });
    };

    // * handle click login button
    const handleClickLoginButton = async () => {
        // info verification
        // email is null
        if (values.email === '') {
            return setValues({
                ...values,
                emailErrorMsg: t("form_alert_msg.email_not_null"),
                passwordErrorMsg: '',
            });
        }
        // email format error
        if (!emailReg.test(values.email)) {
            return setValues({
                ...values,
                emailErrorMsg: t("form_alert_msg.email_format_error"),
                passwordErrorMsg: '',
            });
        }
        // password is null
        if (values.password === '') {
            return setValues({
                ...values,
                emailErrorMsg: '',
                passwordErrorMsg: t("form_alert_msg.password_not_null"),
            });
        }

        // redux: send the user info to server
        if (!loginLoading) {
            const result = await dispatch(userLogin({
                email: values.email,
                password: values.password,
                rememberMe: values.rememberMe
            }));
            // login error
            if (result['type'] === 'user/Login/rejected') {
                return setValues({
                    ...values,
                    emailErrorMsg: '',
                    passwordErrorMsg: '',
                    openSnackbar: true,
                    systemAlertSnackType: 'error',
                    systemAlertSnackMsg: result['payload'].response.data.message,
                    // systemAlertSnackMsg: t("snackbar_msg.login_fail"),
                });
            }
            // login success
            // if (result['type'] === 'user/Login/fulfilled') {
                
            // }
        }
    };

    // listener: whether jwt changed
    useEffect(() => {
        // redirect to home page
        if (jwt !== null) {
            setValues({
                ...values,
                emailErrorMsg: '',
                passwordErrorMsg: '',
                openSnackbar: true,
                systemAlertSnackType: 'success',
                systemAlertSnackMsg: t("snackbar_msg.login_success"),
            });
            setTimeout(() => { 
                handleLogin();
            }, 1000);
        }
    }, [jwt]);

    // listener: enter key press
    useEffect(() => {
        if (enterPressed) {
            handleClickLoginButton();
        }
    });

    const handleCloseSnackbar = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setValues({
            ...values,
            openSnackbar: false
        });
    };

    return (
        <div className={classes.layer}>
            <div className={clsx(classes.infoBox, {
                [classes.infoBoxNormal]: match,
                [classes.infoBoxFullScreen]: !match
            })}>
                <form className={classes.forms} noValidate autoComplete="off">
                    <Typography variant={'h4'} style={{ marginTop: 24, letterSpacing: 15 }}>{t("login.welcome")}</Typography>
                    <TextFieldWithVerification
                        id={'login-email'}
                        label={t("login.email")}
                        color={'secondary'}
                        value={values.email}
                        handleChangeText={handleChange('email')}
                        errorMsg={values.emailErrorMsg}
                    />
                    <PasswordWithVerification
                        id={'login-password'}
                        label={t("login.password")}
                        color={'secondary'}
                        value={values.password}
                        handleChangeText={handleChange('password')}
                        errorMsg={values.passwordErrorMsg}
                    />

                    {/* remember me & forget password */}
                    <div>
                        <Grid container direction="row" justifyContent="space-between" alignItems="center">
                            {/* remember me */}
                            <Grid item>
                                <FormGroup row>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={values.rememberMe}
                                                onChange={handleCheckRememberMe}
                                                name="rememberMe"
                                                color="secondary"
                                            />}
                                        label={t("login.remember_me")}
                                    />
                                </FormGroup>
                            </Grid>
                            {/* forget password */}
                            <Grid item className={classes.forgetBtn} onClick={handleOpenDialog}>
                                <LockIcon className={classes.forgetIcon} />
                                <span> {t("login.forget_password")}</span>
                            </Grid>
                        </Grid>
                    </div>

                    {/* Login Button */}
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.loginBtn}
                        endIcon={loginLoading ? (
                            <CircularProgress style={{ width: 20, height: 20, color: 'white' }} />
                        ) : (
                            <ExitToAppIcon />
                        )}
                        onClick={handleClickLoginButton}
                    >
                        {t("login.login_btn")}
                    </Button>

                    {/* register enter */}
                    <Paper elevation={0} className={classes.loginRegister}>
                        {t("login.register_alert")}
                        <br />
                        <Button
                            color="secondary" className={classes.registerBtn}
                            onClick={async () => {
                                history.push('/user/register');
                            }}
                        >
                            {t("login.register_btn")}
                        </Button>
                    </Paper>

                    {/* forget password */}
                    <ForgetPasswordDialog
                        open={open}
                        handleClose={handleCloseDialog}
                    />
                </form>
            </div>

            {/* System snackbar alert msg: whether user login success */}
            <SnackbarAlert
                open={values.openSnackbar}
                type={values.systemAlertSnackType}
                msg={values.systemAlertSnackMsg}
                handleCloseSnackbar={handleCloseSnackbar}
                autoClose={true}
                duration={1000}
            />
        </div >
    )
};

interface ForgetPasswordDialogState {
    open: boolean;
    handleClose: () => void;
};
const ForgetPasswordDialog: React.FC<ForgetPasswordDialogState> = ({
    open, handleClose
}) => {
    // i18n
    const { t } = useTranslation();
    // email Reg. verification code
    const emailReg = /^([a-zA-Z]|[0-9])(\w|)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    const [forgetPasswordEmail, setForgetPasswordEmail] = React.useState('');
    const [errorMsg, setErrorMsg] = React.useState('');

    const handleForgetPasswordEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForgetPasswordEmail(
            event.target.value
        );
    };

    const handleClickSubmitBtn = () => {
        if (forgetPasswordEmail === '') {
            return setErrorMsg(t("form_alert_msg.email_not_null"));
        }
        if (!emailReg.test(forgetPasswordEmail)) {
            return setErrorMsg(t("form_alert_msg.email_format_error"));
        }
        setErrorMsg('');
        return handleClose();
    };

    return (
        <DialogBox
            boxSize={'xs'}
            open={open}
            title={t("login.find_password")}
            contain={
                <form noValidate autoComplete="off" style={{ width: '100%' }}>
                    <div>{t("login.find_password_msg")}</div>
                    <TextFieldWithVerification
                        id={'reset-email'}
                        label={t("login.email")}
                        color={'secondary'}
                        value={forgetPasswordEmail}
                        handleChangeText={handleForgetPasswordEmail}
                        errorMsg={errorMsg}
                        style={{ width: '100%', margin: '10px 0' }}
                    />
                </form>
            }
            actions={
                <React.Fragment>
                    <Button onClick={handleClose} color="secondary">
                        {t("common.btn_cancel")}
                    </Button>
                    <Button onClick={handleClickSubmitBtn} color="primary" autoFocus>
                        {t("common.btn_confirm")}
                    </Button>
                </React.Fragment>
            }
        />
    );
};