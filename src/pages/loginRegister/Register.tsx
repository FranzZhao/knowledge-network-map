import React, { useEffect } from 'react';
// import MD
import clsx from 'clsx';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Button, Paper, Typography, useMediaQuery } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// import router
import { useHistory } from 'react-router';
// import customize component
import { TextFieldWithVerification, PasswordWithVerification, SnackbarAlert } from '../../components/common';
// import customize hook
import { useKeyPress } from '../../hooks';
// import i18next
import { useTranslation } from 'react-i18next';

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
        backgroundColor: theme.palette.primary.dark,
        textAlign: 'center',
        padding: 20,
        opacity: 0.9,
    },
    infoBoxNormal: {
        width: 500,
        height: 580,
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
        // marginBottom: theme.spacing(2),
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
        letterSpacing: '5px'
    },
    loginRegister: {
        backgroundColor: '#4d7e9f75',
        color: '#ffffffa6',
        paddingTop: 22,
        paddingBottom: 10,
        marginTop: 10,
        // marginLeft: 40,
        textAlign: 'center',
    },
    registerBtn: {
        marginTop: 5
    },
}));

interface RegisterState {
    userName: string;
    userNameErrorMsg: string;
    email: string;
    emailErrorMsg: string;
    password: string;
    passwordErrorMsg: string;
    showPassword: boolean;
    repPassword: string;
    repPasswordErrorMsg: string;
    showRepPassword: boolean;
    openSnackbar: boolean;
    systemAlertSnackType: 'success' | 'error' | 'warning' | 'info';
    systemAlertSnackMsg: string;
}

export const Register: React.FC = () => {
    const classes = useStyles();
    const { t } = useTranslation();
    const match = useMediaQuery('(min-width:600px)');
    const [values, setValues] = React.useState<RegisterState>({
        userName: '',
        userNameErrorMsg: '',
        email: '',
        emailErrorMsg: '',
        password: '',
        passwordErrorMsg: '',
        showPassword: false,
        repPassword: '',
        repPasswordErrorMsg: '',
        showRepPassword: false,
        openSnackbar: false,
        systemAlertSnackType: 'success',
        systemAlertSnackMsg: '',
    });
    const history = useHistory();
    // email Reg. verification code
    const emailReg = /^([a-zA-Z]|[0-9])(\w|)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    // enter key press
    const enterPressed = useKeyPress(13);

    const handleChange = (prop: keyof RegisterState) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickRegisterBtn = () => {
        // register info error msg verification
        if (values.userName === '') {
            return setValues({
                ...values,
                userNameErrorMsg: t("form_alert_msg.user_not_null"),
                emailErrorMsg: '',
                passwordErrorMsg: '',
                repPasswordErrorMsg: '',
            });
        }

        if (values.email === '') {
            return setValues({
                ...values,
                userNameErrorMsg: '',
                emailErrorMsg: t("form_alert_msg.email_not_null"),
                passwordErrorMsg: '',
                repPasswordErrorMsg: '',
            });
        }

        if (!emailReg.test(values.email)) {
            return setValues({
                ...values,
                userNameErrorMsg: '',
                emailErrorMsg: t("form_alert_msg.email_format_error"),
                passwordErrorMsg: '',
                repPasswordErrorMsg: '',
            });
        }

        if (values.password === '') {
            return setValues({
                ...values,
                userNameErrorMsg: '',
                emailErrorMsg: '',
                passwordErrorMsg: t("form_alert_msg.password_not_null"),
                repPasswordErrorMsg: '',
            });
        }

        if (values.repPassword === '') {
            return setValues({
                ...values,
                userNameErrorMsg: '',
                emailErrorMsg: '',
                passwordErrorMsg: '',
                repPasswordErrorMsg: t("form_alert_msg.password_not_null"),
            });
        }

        if (values.repPassword !== values.password) {
            return setValues({
                ...values,
                userNameErrorMsg: '',
                emailErrorMsg: '',
                passwordErrorMsg: '',
                repPasswordErrorMsg: t("form_alert_msg.password_repeat_error"),
            });
        }

        setValues({
            ...values,
            userNameErrorMsg: '',
            emailErrorMsg: '',
            passwordErrorMsg: '',
            repPasswordErrorMsg: '',
            openSnackbar: true,
            systemAlertSnackType: 'success',
            systemAlertSnackMsg: t("snackbar_msg.register_success"),
        });

        setTimeout(() => {
            history.push('/user/login');
        }, 2000);
    }

    const handleCloseSnackbar = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setValues({
            ...values,
            openSnackbar: false
        });
    };

    // listener: enter key press
    useEffect(() => {
        if (enterPressed) {
            handleClickRegisterBtn();
        }
    });

    return (
        <div className={classes.layer}>
            <div className={clsx(classes.infoBox, {
                [classes.infoBoxNormal]: match,
                [classes.infoBoxFullScreen]: !match
            })}>
                <form className={classes.forms} noValidate autoComplete="off">
                    <Typography variant={'h4'} style={{ marginTop: 24, letterSpacing: 15 }}>{t("register.register_title")}</Typography>
                    <TextFieldWithVerification
                        id={'register-username'}
                        label={t("register.username")}
                        color={'secondary'}
                        value={values.userName}
                        handleChangeText={handleChange('userName')}
                        errorMsg={values.userNameErrorMsg}
                    />
                    <TextFieldWithVerification
                        id={'register-email'}
                        label={t("register.email")}
                        color={'secondary'}
                        value={values.email}
                        handleChangeText={handleChange('email')}
                        errorMsg={values.emailErrorMsg}
                    />
                    <PasswordWithVerification
                        id={'register-password'}
                        label={t("register.password")}
                        color={'secondary'}
                        value={values.password}
                        handleChangeText={handleChange('password')}
                        errorMsg={values.passwordErrorMsg}
                    />
                    <PasswordWithVerification
                        id={'register-repPassword'}
                        label={t("register.confirm_password")}
                        color={'secondary'}
                        value={values.repPassword}
                        handleChangeText={handleChange('repPassword')}
                        errorMsg={values.repPasswordErrorMsg}
                    />

                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.loginBtn}
                        endIcon={<ExitToAppIcon />}
                        onClick={handleClickRegisterBtn}
                    >
                        {t("register.register_btn")}
                    </Button>

                    {/* register enter */}
                    <Paper elevation={0} className={classes.loginRegister}>
                        {t("register.login_alert")}
                        <br />
                        <Button
                            color="secondary" className={classes.registerBtn}
                            onClick={() => {
                                history.push('/user/login');
                            }}
                        >
                            {t("register.login_btn")}
                        </Button>
                    </Paper>
                </form>
            </div>

            {/* System snackbar alert msg: whether user register success */}
            <SnackbarAlert
                open={values.openSnackbar}
                type={values.systemAlertSnackType}
                msg={values.systemAlertSnackMsg}
                handleCloseSnackbar={handleCloseSnackbar}
                autoClose={true}
                duration={1000}
            />
        </div>

    )
}
