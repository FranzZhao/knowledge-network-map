import React, { useEffect } from 'react';
// import MD
import clsx from 'clsx';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Button, Checkbox, FormControlLabel, FormGroup, Grid, Paper, Snackbar, Typography, useMediaQuery } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// import customize
import { DialogBox, TextFieldWithVerification, PasswordWithVerification, SnackbarAlert } from '../../components/common';
// import router
import { useHistory } from 'react-router';
// import customize hook
import { useKeyPress } from '../../hooks';
import Alert from '@material-ui/lab/Alert';

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
        backgroundColor: theme.palette.primary.dark,
        textAlign: 'center',
        padding: 20,
        opacity: 0.9,
    },
    infoBoxNormal: {
        width: 500,
        height: '75%',
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
        backgroundColor: '#4d7e9f75',
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
    const classes = useStyles();
    const match = useMediaQuery('(min-width:600px)');
    const [values, setValues] = React.useState<LoginState>({
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
    const history = useHistory();
    // email Reg. verification code
    const emailReg = /^([a-zA-Z]|[0-9])(\w|)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    // open forget password dialog
    const [open, setOpen] = React.useState(false);
    // key press hook
    const enterPressed = useKeyPress(13);

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

    // handle click login button
    const handleClickLoginButton = () => {
        // info verification
        if (values.email === '') {
            return setValues({
                ...values,
                emailErrorMsg: '邮箱不能为空',
                passwordErrorMsg: '',
            });
        }
        if (!emailReg.test(values.email)) {
            return setValues({
                ...values,
                emailErrorMsg: '邮箱格式错误',
                passwordErrorMsg: '',
            });
        }
        if (values.password === '') {
            return setValues({
                ...values,
                emailErrorMsg: '',
                passwordErrorMsg: '密码不能为空',
            });
        }

        setValues({
            ...values,
            emailErrorMsg: '',
            passwordErrorMsg: '',
        });

        if (values.email==='1234@1234.com' && values.password==='1234') {
            setValues({
                ...values,
                systemAlertSnackType: 'success',
                systemAlertSnackMsg: '登录成功',
            });
        } else {
            setValues({
                ...values,
                systemAlertSnackType: 'error',
                systemAlertSnackMsg: '用户名或密码错误',
            });
        }
        setValues({
            ...values,
            openSnackbar: true
        });
        // login success
        // return handleLogin();
    };

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
                    <Typography variant={'h4'} style={{ marginTop: 24, letterSpacing: 15 }}>欢迎登录</Typography>
                    <TextFieldWithVerification
                        id={'login-email'}
                        label={'邮箱'}
                        color={'secondary'}
                        value={values.email}
                        handleChangeText={handleChange('email')}
                        errorMsg={values.emailErrorMsg}
                    />
                    <PasswordWithVerification
                        id={'login-password'}
                        label={'密码'}
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
                                        label="记住我"
                                    />
                                </FormGroup>
                            </Grid>
                            {/* forget password */}
                            <Grid item className={classes.forgetBtn} onClick={handleOpenDialog}>
                                <LockIcon className={classes.forgetIcon} />
                                <span> 忘记密码</span>
                            </Grid>
                        </Grid>
                    </div>

                    {/* Login Button */}
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.loginBtn}
                        endIcon={<ExitToAppIcon />}
                        onClick={handleClickLoginButton}
                    >
                        登录
                    </Button>

                    {/* register enter */}
                    <Paper elevation={0} className={classes.loginRegister}>
                        还未拥有账号？立刻注册新账号！
                        <br />
                        <Button
                            color="secondary" className={classes.registerBtn}
                            onClick={() => {
                                history.push('/user/register');
                            }}
                        >
                            注册账号
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
                duration={4000}
            />
        </div>
    )
};

interface ForgetPasswordDialogState {
    open: boolean;
    handleClose: () => void;
};
const ForgetPasswordDialog: React.FC<ForgetPasswordDialogState> = ({
    open, handleClose
}) => {
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
            return setErrorMsg('邮箱不能为空');
        }
        if (!emailReg.test(forgetPasswordEmail)) {
            return setErrorMsg('邮箱格式错误');
        }
        setErrorMsg('');
        return handleClose();
    };

    return (
        <DialogBox
            open={open}
            title={'找回密码'}
            contain={
                <form noValidate autoComplete="off" style={{ width: '100%' }}>
                    <div>输入您的邮箱，我们将会设置随机的新密码，并发送到您的邮箱。<br />使用随机密码登录后，请立即重新设置密码！</div>
                    <TextFieldWithVerification
                        id={'reset-email'}
                        label={'邮箱'}
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
                        取消
                    </Button>
                    <Button onClick={handleClickSubmitBtn} color="primary" autoFocus>
                        确定
                    </Button>
                </React.Fragment>
            }
        />
    );
};