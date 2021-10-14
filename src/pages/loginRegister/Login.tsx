import React from 'react';
// import MD
import clsx from 'clsx';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, IconButton, Input, InputAdornment, InputLabel, Paper, TextField, useMediaQuery } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import LockIcon from '@material-ui/icons/Lock';
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
        height: '68%',
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
        letterSpacing: '15px'
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

interface LoginState {
    email: string;
    password: string;
    showPassword: boolean;
    rememberMe: boolean;
}

export const Login: React.FC = () => {
    const classes = useStyles();
    const match = useMediaQuery('(min-width:600px)');
    const [values, setValues] = React.useState<LoginState>({
        email: '',
        password: '',
        showPassword: false,
        rememberMe: false,
    });
    const history = useHistory();

    const handleChange = (prop: keyof LoginState) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleCheckRememberMe = () => {
        setValues({
            ...values,
            rememberMe: !values.rememberMe,
        });
    }

    return (
        <div className={classes.layer}>
            <div className={clsx(classes.infoBox, {
                [classes.infoBoxNormal]: match,
                [classes.infoBoxFullScreen]: !match
            })}>
                <form className={classes.forms} noValidate autoComplete="off">
                    <h1 style={{ letterSpacing: 12 }}>欢迎登录</h1>
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
                            <Grid item className={classes.forgetBtn}>
                                <LockIcon className={classes.forgetIcon} />
                                <span> 忘记密码</span>
                            </Grid>
                        </Grid>
                    </div>


                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.loginBtn}
                        endIcon={<ExitToAppIcon />}
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
                </form>
            </div>

        </div>

    )
}
