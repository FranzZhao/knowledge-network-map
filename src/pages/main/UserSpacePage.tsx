import React, { useState, useEffect } from 'react';
// import customize components
import { DialogBox } from '../../components/common';
// import MD
import clsx from 'clsx';
import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import { Paper, useMediaQuery } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import LanguageIcon from '@material-ui/icons/Language';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import BookIcon from '@material-ui/icons/Book';
import SettingsIcon from '@material-ui/icons/Settings';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import FilterDramaIcon from '@material-ui/icons/FilterDrama';
// import img
import userHeaderBgImg from '../../assets/image/loginBackground-1.jpg';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
// import jwt-decode
import jwt_decode, { JwtPayload as DefaultJwtPayload } from "jwt-decode";
// import redux
import { useSelector } from '../../redux/hooks';
// import dropzone
import { Dropzone, FileItem, FullScreenPreview } from "@dropzone-ui/react";
// import redux
import { useDispatch } from 'react-redux';
import { getUserAvatar, getUserStatics  } from '../../redux/user/slice';
// import UserSpace page
import {UserInfo, DiarySpace, KnowledgeStatics} from './userSpaceSubPage';


const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        padding: theme.spacing(3),
    },
    userInfoHeader: {
        width: '100%',
        height: 150,
        background: `url(${userHeaderBgImg})`,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        // backgroundColor: 'steelblue',
        display: 'flex',
    },
    userAvatarBox: {
        margin: 'auto',
        marginTop: 90,
    },
    userImg: {
        width: theme.spacing(12),
        height: theme.spacing(12),
        backgroundColor: theme.palette.secondary.main,
        fontWeight: 'bolder',
        fontSize: 40,
        color: theme.palette.common.white,
        textTransform: 'capitalize',
    },
    userInfoBottom: {
        width: '100%',
        height: 100,
        boxShadow: theme.palette.type === 'light' ? '0px 2px 1px #dcdbdb' : '0px 2px 1px #232323',
        backgroundColor: theme.palette.background.paper,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    userInfoBottomWhenSmall: {
        width: '100%',
        // height: 100,
        backgroundColor: theme.palette.background.paper,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    userInfoDetail: {
        padding: '0 40px',
    },
    pageBtn: {
        minWidth: 40,
        width: 40,
        boxShadow: 'none',
        backgroundColor: theme.palette.primary.dark,
    },
    userSpaceContain: {
        marginTop: theme.spacing(3),
        borderRadius: 20,
        width: '100%',
        height: '100%',
        padding: `${theme.spacing(1)}px ${theme.spacing(3)}px`,
        paddingBottom: theme.spacing(3),
        // letterSpacing: 8,
    },
    forms: {
        // marginBottom: theme.spacing(2),
        '&>*': {
            marginBottom: theme.spacing(2),
            width: '100%',
        },
    },
    notebookPropertyLeft: {
        width: 180,
        marginRight: 10,
        fontSize: 16,
        display: 'flex',
        height: 35,
        paddingLeft: 10,
        marginBottom: 10,
        "& > *": {
            marginTop: 'auto',
            marginBottom: 'auto',
        },
        "& svg": {
            marginRight: 15,
            marginLeft: 5,
        },
        "&:hover": {
            backgroundColor: '#4e4e4e4d',
            cursor: 'pointer',
            borderRadius: '8px',
        }
    }
}));

const SmallAvatar = withStyles((theme: Theme) =>
    createStyles({
        root: {
            width: theme.spacing(3),
            height: theme.spacing(3),
            backgroundColor: theme.palette.success.light,
            // border: `2px solid ${theme.palette.background.paper}`,
            "&:hover": {
                cursor: 'pointer',
            }
        },
    }),
)(Avatar);

// 自定义jwt的类型
interface JwtPayload extends DefaultJwtPayload {
    username: string
}

interface PageState {
    knowledgeStatic: boolean;
    diarySpace: boolean;
    userInfoSetting: boolean;
}

export const UserSpacePage: React.FC = () => {
    const classes = useStyles();
    const match = useMediaQuery('(min-width:980px)');
    const [openPages, setOpenPages] = useState<PageState>({
        knowledgeStatic: true,
        diarySpace: false,
        userInfoSetting: false,
    });
    // redux
    const dispatch = useDispatch();
    const jwt = useSelector(state => state.user.token);
    const userAvatar = useSelector(state => state.user.userAvatar);
    const userStatic = useSelector(state => state.user.userStatics);
    // show username
    const [username, setUsername] = useState("");
    // upload user avatar
    const [openUploadDialog, setOpenUploadDialog] = useState(false);

    // get username
    useEffect(() => {
        // jwt发生编码且存在, 对jwt进行解码
        if (jwt) {
            // 获取username
            const token = jwt_decode<JwtPayload>(jwt);
            setUsername(token.username);
            // 获取用户头像
            dispatch(getUserAvatar({ jwt: jwt }));
            // 获取用户统计信息
            dispatch(getUserStatics({ jwt: jwt }));
        }
    }, [jwt]);

    // useEffect(()=>{
    //     console.log(userStatic);
    // },[userStatic]);

    const handleOpenUploadDialog = () => {
        setOpenUploadDialog(!openUploadDialog);
    }

    const handleOpenPage = (prop: keyof PageState) => {
        if (prop === 'diarySpace') {
            setOpenPages({
                diarySpace: true,
                knowledgeStatic: false,
                userInfoSetting: false,
            });
        } else if (prop === 'knowledgeStatic') {
            setOpenPages({
                diarySpace: false,
                knowledgeStatic: true,
                userInfoSetting: false,
            });
        } else {
            setOpenPages({
                diarySpace: false,
                knowledgeStatic: false,
                userInfoSetting: true,
            });
        }
    }

    return (
        <div className={classes.root}>
            <div className={classes.userInfoHeader}>
                <Badge
                    className={classes.userAvatarBox}
                    overlap="circular"
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    badgeContent={
                        // <SmallAvatar alt="Remy Sharp" src={userImg} />
                        <Tooltip title="更换头像" arrow>
                            <SmallAvatar onClick={handleOpenUploadDialog}>
                                <CameraAltIcon fontSize="small" style={{ fontSize: 16, color: 'darkgreen' }} />
                            </SmallAvatar>
                        </Tooltip>
                    }
                >
                    <Avatar alt={username} src={userAvatar} className={classes.userImg} />
                </Badge>
                {/* upload user avatar dialog */}
                <UploadUserAvatarDialog
                    openDialog={openUploadDialog}
                    handleOpenUploadDialog={handleOpenUploadDialog}
                />
            </div>
            <div className={clsx({
                [classes.userInfoBottom]: match,
                [classes.userInfoBottomWhenSmall]: !match,
            })}>
                <div className={classes.userInfoDetail}>
                    {
                        match ? (
                            // normal screen
                            <Grid
                                container
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                            // style={{width: '100%'}}
                            >
                                <Grid item>
                                    <Grid container spacing={4}>
                                        <Grid item>
                                            <Grid
                                                container
                                                direction="column"
                                                justifyContent="center"
                                                alignItems="center"
                                            >
                                                <Grid item ><LanguageIcon /></Grid>
                                                <Grid item >知识地图</Grid>
                                                <Grid item >{userStatic['knmNumbers']}</Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item >
                                            <Grid
                                                container
                                                direction="column"
                                                justifyContent="center"
                                                alignItems="center"
                                            >
                                                <Grid item ><BubbleChartIcon /></Grid>
                                                <Grid item>知识节点</Grid>
                                                <Grid item>{userStatic['nodeNumbers']}</Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item >
                                            <Grid
                                                container
                                                direction="column"
                                                justifyContent="center"
                                                alignItems="center"
                                            >
                                                <Grid item ><BookIcon /></Grid>
                                                <Grid item >知识笔记</Grid>
                                                <Grid item >{userStatic['notebookNumbers']}</Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item style={{ textAlign: 'center' }}><h2 style={{ paddingTop: 30 }}>{username}</h2></Grid>
                                <Grid item>
                                    <Grid container spacing={7}>
                                        <Grid item >
                                            <Tooltip title="知识统计" arrow>
                                                <Button
                                                    className={classes.pageBtn}
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => { handleOpenPage('knowledgeStatic') }}
                                                ><EqualizerIcon /></Button>
                                            </Tooltip>
                                        </Grid>
                                        <Grid item >
                                            <Tooltip title="日志空间" arrow>
                                                <Button
                                                    className={classes.pageBtn}
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => { handleOpenPage('diarySpace') }}
                                                ><FilterDramaIcon /></Button>
                                            </Tooltip>
                                        </Grid>
                                        <Grid item >
                                            <Tooltip title="信息设置" arrow>
                                                <Button
                                                    className={classes.pageBtn}
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => { handleOpenPage('userInfoSetting') }}
                                                ><SettingsIcon /></Button>
                                            </Tooltip>
                                        </Grid>
                                    </Grid>

                                </Grid>

                            </Grid>
                        ) : (
                            // small screen
                            <div style={{ display: 'flex', width: '100%' }}>
                                <div style={{ margin: 'auto', textAlign: 'center', marginTop: 30, marginBottom: 10 }}>
                                    <h2>Franz Zhao</h2>
                                    <Grid container spacing={4}>
                                        <Grid item xs={4}>
                                            <Grid
                                                container
                                                direction="column"
                                                justifyContent="center"
                                                alignItems="center"
                                            >
                                                <Grid item ><LanguageIcon /></Grid>
                                                <Grid item >知识地图</Grid>
                                                <Grid item >54</Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Grid
                                                container
                                                direction="column"
                                                justifyContent="center"
                                                alignItems="center"
                                            >
                                                <Grid item ><BubbleChartIcon /></Grid>
                                                <Grid item>知识节点</Grid>
                                                <Grid item>134</Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Grid
                                                container
                                                direction="column"
                                                justifyContent="center"
                                                alignItems="center"
                                            >
                                                <Grid item ><BookIcon /></Grid>
                                                <Grid item >知识笔记</Grid>
                                                <Grid item >341</Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid
                                        container
                                        spacing={7}
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                    >
                                        <Grid item xs={4}>
                                            <Tooltip title="知识统计" arrow>
                                                <Button
                                                    className={classes.pageBtn}
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => { handleOpenPage('knowledgeStatic') }}
                                                ><EqualizerIcon /></Button>
                                            </Tooltip>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Tooltip title="日志空间" arrow>
                                                <Button
                                                    className={classes.pageBtn}
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => { handleOpenPage('diarySpace') }}
                                                ><FilterDramaIcon /></Button>
                                            </Tooltip>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Tooltip title="信息设置" arrow>
                                                <Button
                                                    className={classes.pageBtn}
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => { handleOpenPage('userInfoSetting') }}
                                                ><SettingsIcon /></Button>
                                            </Tooltip>
                                        </Grid>
                                    </Grid>
                                </div>
                            </div>
                        )
                    }

                </div>
            </div>
            <Paper className={classes.userSpaceContain}>
                {
                    openPages.diarySpace && <DiarySpace />
                }
                {
                    openPages.knowledgeStatic && <KnowledgeStatics />
                }
                {
                    openPages.userInfoSetting && <UserInfo />
                }
            </Paper>
        </div>
    )
}

// Dialog Bos Component
interface UploadUserAvatarDialogState {
    openDialog: boolean;
    handleOpenUploadDialog: () => void;
}
const UploadUserAvatarDialog: React.FC<UploadUserAvatarDialogState> = ({
    openDialog, handleOpenUploadDialog
}) => {
    // redux
    const dispatch = useDispatch();
    const jwt = useSelector(state => state.user.token);
    // dropzone
    const [files, setFiles] = useState([]);
    const [imageSrc, setImageSrc] = useState(undefined);
    // confirm upload
    const [confirmUpload, setConfirmUpload] = useState(false);

    useEffect(() => {
        if (openDialog) {
            setConfirmUpload(false);
        } else {
            setConfirmUpload(true);
        }
    }, [openDialog]);

    // const updateFiles = (incommingFiles) => {
    //     console.log("incomming files", incommingFiles);
    //     setFiles(incommingFiles);
    // };

    const updateFiles = (incommingFiles) => {
        // console.log("incomming files", incommingFiles);
        setFiles(incommingFiles);
    };

    const onDelete = (id) => {
        setFiles(files.filter((x) => x['id'] !== id));
    };

    const handleSee = (imageSource) => {
        setImageSrc(imageSource);
    };

    const handleGetNewAvatar = () => {
        dispatch(getUserAvatar({
            jwt: jwt
        }));
        handleOpenUploadDialog();
        setFiles([]);
        setImageSrc(undefined);
    };

    return (
        <DialogBox
            open={openDialog}
            boxSize="sm"
            title={'上传头像'}
            contain={
                <>
                    <div style={{ marginBottom: 10, fontSize: 16 }}>选择图片后，点击上方的<b style={{ color: 'orange' }}>"upload files"按钮</b>即可上传头像，若成功将会查看到success信息提示！</div>
                    <Dropzone
                        style={{ minWidth: "100%" }}
                        //view={"list"}
                        onChange={updateFiles}
                        value={files}
                        maxFiles={1}
                        //header={false}
                        // footer={false}
                        maxFileSize={2998000}
                        label="点击或拖拽图片至此"
                        //label="Suleta tus archivos aquí"
                        accept=".png,image/*"
                        uploadingMessage={"Uploading..."}
                        url="http://localhost:3001/user/avatar"
                        config={
                            {
                                headers: {
                                    "content-type": "multipart/form-data;",
                                    "Authorization": `bearer ${jwt}`
                                },
                            }
                        }
                        method="POST"
                    >
                        {files.map((file) => (
                            <FileItem
                                {...file}
                                key={file['id']}
                                onDelete={onDelete}
                                onSee={handleSee}
                                //localization={"FR-fr"}
                                //localization={"ES-es"}
                                preview
                                info
                                hd
                            />
                        ))}
                        <FullScreenPreview
                            imgSource={imageSrc}
                            openImage={imageSrc}
                            onClose={(e) => handleSee(undefined)}
                        />
                    </Dropzone>
                    {
                        confirmUpload &&
                        <div style={{ marginTop: 10, fontSize: 16, color: 'red', fontWeight: 'bold' }}>请再次确认是否上传（点击Upload files并提示success），若已完成则点击 “确认完成”</div>
                    }
                </>
            }
            actions={
                <React.Fragment>
                    <Button variant='text' color="primary" onClick={handleOpenUploadDialog}>退出</Button>
                    {
                        confirmUpload ? (
                            <Button variant='text' color="secondary" onClick={handleGetNewAvatar}>确认完成</Button>
                        ) : (
                            <Button variant='text' color="secondary" onClick={() => { setConfirmUpload(true) }}>完成</Button>
                        )
                    }
                </React.Fragment>
            }
        />
    );
}