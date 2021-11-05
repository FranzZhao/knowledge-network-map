import React, {useState, useEffect} from 'react';
// customize components
import { DialogBox } from '../../../components/common';
// import MD components
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import TextField from '@material-ui/core/TextField';
// import jwt-decode
import jwt_decode, { JwtPayload as DefaultJwtPayload } from "jwt-decode";
// import router
import { useHistory } from 'react-router-dom';
// redux
import { useSelector } from '../../../redux/hooks';
import { useDispatch } from 'react-redux';
import { userInfoUpdate, userPasswordVerify, UserSlice } from '../../../redux/user/slice';

// 自定义jwt的类型
interface JwtPayload extends DefaultJwtPayload {
    username: string
}


export const UserInfo: React.FC = () => {
    // username & email
    const jwt = useSelector(state => state.user.token);
    const email = useSelector(state => state.user.email);
    // user info state
    interface UserInfoState {
        username: string,
        email: string,
        password: string,
    }
    const [userInfo, setUserInfo] = useState<UserInfoState>({
        username: '',
        email: '',
        password: '',
    });
    const [openDialog, setOpenDialog] = useState(false);


    // get username
    useEffect(() => {
        // jwt发生编码且存在, 对jwt进行解码
        if (jwt) {
            // 获取username
            const token = jwt_decode<JwtPayload>(jwt);
            setUserInfo({
                username: token.username,
                email: email,
                password: '',
            });
        }
    }, [jwt]);

    // change text
    const handleChangeText = (prop: keyof UserInfoState) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserInfo({
            ...userInfo,
            [prop]: event.target.value,
        });
    };

    // handle open dialog
    const handleOpenDialog = () => {
        setOpenDialog(!openDialog);
    }

    // verify dialog
    interface VerifyDialogState {
        openDialog: boolean;
        handleOpenDialog: () => void;
    }
    const VerifyDialog: React.FC<VerifyDialogState> = ({
        openDialog, handleOpenDialog
    }) => {
        const [password, setPassword] = useState('');
        const [verifyResult, setVerifyResult] = useState<'fail' | 'success' | null>(null);
        const dispatch = useDispatch();
        const history = useHistory();

        const changePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(event.target.value);
        }

        const handleVerify = async () => {
            const res = await dispatch(userPasswordVerify({
                email: email,
                password: password,
                jwt: jwt,
            }));
            if (res['type'] === 'user/verifyPassword/fulfilled') {
                setVerifyResult('success');
                // update user info
                // 使用ts中的？实现对象的动态属性 —— 只有用户修改了, 才会写入到newUserInfo中
                interface NewUserInfoState {
                    username?: any;
                    email?: any;
                    password?: any;
                }
                let newUserInfo: NewUserInfoState = {};
                let oldUserName: string = '';
                if (jwt) {
                    oldUserName = jwt_decode<JwtPayload>(jwt).username;
                }
                if (userInfo.username !== oldUserName) {
                    newUserInfo.username = userInfo.username;
                }
                if (userInfo.email !== email) {
                    newUserInfo.email = userInfo.email;
                }
                if (userInfo.password !== '') {
                    newUserInfo.password = userInfo.email;
                }

                const res = await dispatch(userInfoUpdate({
                    jwt: jwt, userInfo: newUserInfo
                }));
                console.log(res);
                if (res['type'] === 'user/userInfoUpdate/fulfilled') {
                    handleOpenDialog();
                    alert('您的用户信息已更新！请重新登陆！');
                    dispatch(UserSlice.actions.logout());
                    history.push('/user/login');
                } else {
                    handleOpenDialog();
                    alert('用户信息更新失败！用户名或邮箱已被使用，请重新尝试！');
                }
            } else {
                setVerifyResult('fail');
                setPassword('');
            }
        }

        return (
            <DialogBox
                open={openDialog}
                title={'信息修改确认'}
                boxSize="xs"
                contain={
                    <>
                        <div>请确认是否要将原信息进行修改？若确认修改，请输入您原有的用户密码进行修改确认。</div>
                        <TextField
                            id="knm-node-intro"
                            label="密码"
                            size="small"
                            value={password}
                            onChange={changePassword}
                            multiline
                            style={{ width: '100%', marginTop: 10 }}
                        />
                        {
                            verifyResult === 'fail' &&
                            <div style={{ marginTop: 8, color: 'orange', fontWeight: 'bold' }}>密码验证错误！请重新输入密码！</div>
                        }
                        {
                            verifyResult === 'success' &&
                            <>
                                <div style={{ marginTop: 8, color: 'orange', fontWeight: 'bold' }}>密码验证成功！正在为您更新用户信息！</div>
                                <LinearProgress style={{ marginTop: 10 }} color="secondary" />
                            </>
                        }
                    </>
                }
                actions={
                    <>
                        <Button variant="text" color="primary" onClick={handleOpenDialog}>取消</Button>
                        <Button variant="text" color="secondary" onClick={handleVerify}>确认</Button>
                    </>
                }
            />
        );
    }

    return (
        <React.Fragment>
            <h2>信息设置</h2>
            <Grid container spacing={2}>
                <Grid item md={4} xs={12}>
                    <TextField
                        id="knm-node-intro"
                        label="用户名"
                        size="small"
                        value={userInfo.username}
                        onChange={handleChangeText('username')}
                        multiline
                        style={{ width: '100%' }}
                    />
                </Grid>
                <Grid item md={4} xs={12}>
                    <TextField
                        id="knm-node-intro"
                        label="邮箱"
                        size="small"
                        value={userInfo.email}
                        onChange={handleChangeText('email')}
                        multiline
                        style={{ width: '100%' }}
                    />
                </Grid>
                <Grid item md={4} xs={12}>
                    <TextField
                        id="knm-node-intro"
                        label="重设密码"
                        size="small"
                        value={userInfo.password}
                        onChange={handleChangeText('password')}
                        multiline
                        style={{ width: '100%' }}
                    />
                </Grid>
                <VerifyDialog
                    openDialog={openDialog}
                    handleOpenDialog={handleOpenDialog}
                />
            </Grid>
            <Button
                variant="outlined"
                color="primary"
                style={{ marginTop: 30 }}
                onClick={handleOpenDialog}
            >
                确认修改
            </Button>
        </React.Fragment>
    );
}
