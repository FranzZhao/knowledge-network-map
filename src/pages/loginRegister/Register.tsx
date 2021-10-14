import React from 'react';
// import MD
import clsx from 'clsx';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Button, FormControl, IconButton, Input, InputAdornment, InputLabel, Paper, TextField, useMediaQuery } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// import router
import { useHistory } from 'react-router';

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
        opacity: 0.88,
    },
    infoBoxNormal: {
        width: 500,
        height: '78%',
        borderRadius: '15px',
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
        backgroundColor: '#69b9ef1a',
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
    email: string;
    password: string;
    showPassword: boolean;
    repPassword: string;
    showRepPassword: boolean;
}

export const Register: React.FC = () => {
    const classes = useStyles();
    const match = useMediaQuery('(min-width:600px)');
    const [values, setValues] = React.useState<RegisterState>({
        userName: '',
        email: '',
        password: '',
        showPassword: false,
        repPassword: '',
        showRepPassword: false,
    });
    const history = useHistory();

    const handleChange = (prop: keyof RegisterState) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleClickShowRepPassword = () => {
        setValues({ ...values, showRepPassword: !values.showRepPassword });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <div className={classes.layer}>
            <div className={clsx(classes.infoBox, {
                [classes.infoBoxNormal]: match,
                [classes.infoBoxFullScreen]: !match
            })}>
                <form className={classes.forms} noValidate autoComplete="off">
                    <h1 style={{ letterSpacing: 12 }}>用户注册</h1>
                    <TextField
                        id="knm-node-name"
                        label="用户名"
                        color="secondary"
                        value={values.userName}
                        onChange={handleChange('userName')}
                    />
                    <TextField
                        id="knm-node-name"
                        label="邮箱"
                        color="secondary"
                        value={values.email}
                        onChange={handleChange('email')}
                    />
                    <FormControl>
                        <InputLabel htmlFor="standard-adornment-password" color="secondary">密码</InputLabel>
                        <Input
                            id="standard-adornment-password"
                            type={values.showPassword ? 'text' : 'password'}
                            color="secondary"
                            value={values.password}
                            onChange={handleChange('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="standard-adornment-password" color="secondary">确认密码</InputLabel>
                        <Input
                            id="standard-adornment-password"
                            type={values.showRepPassword ? 'text' : 'password'}
                            color="secondary"
                            value={values.repPassword}
                            onChange={handleChange('repPassword')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowRepPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {values.showRepPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>

                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.loginBtn}
                        endIcon={<ExitToAppIcon />}
                    >
                        注册账号
                    </Button>

                    {/* register enter */}
                    <Paper elevation={0} className={classes.loginRegister}>
                        已经拥有账号？立即登录！
                        <br />
                        <Button
                            color="secondary" className={classes.registerBtn}
                            onClick={() => {
                                history.push('/user/login');
                            }}
                        >
                            立即登录
                        </Button>
                    </Paper>
                </form>
            </div>

        </div>

    )
}
