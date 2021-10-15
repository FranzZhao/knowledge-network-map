import React, { useState } from 'react';
// import customize components
import { TinyMCE } from '../../components/common';
// import MD
import clsx from 'clsx';
import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import { Paper, TextField, useMediaQuery } from '@material-ui/core';
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
import userImg from '../../assets/image/users/Franz.png';
import userHeaderBgImg from '../../assets/image/loginBackground-1.jpg';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
// echarts
import ReactECharts from 'echarts-for-react';

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
        // borderRadius: `2px solid white`,
    },
    userInfoBottom: {
        width: '100%',
        height: 100,
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
        letterSpacing: 8,
    },
    forms: {
        // marginBottom: theme.spacing(2),
        '&>*': {
            marginBottom: theme.spacing(2),
            width: '100%',
        },
    },
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

interface PageState {
    knowledgeStatic: boolean;
    dailySpace: boolean;
    userInfoSetting: boolean;
}

export const UserSpacePage: React.FC = () => {
    const classes = useStyles();
    const match = useMediaQuery('(min-width:850px)');
    const [openPages, setOpenPages] = useState<PageState>({
        knowledgeStatic: true,
        dailySpace: false,
        userInfoSetting: false,
    });

    const handleOpenPage = (prop: keyof PageState) => {
        if (prop === 'dailySpace') {
            setOpenPages({
                dailySpace: true,
                knowledgeStatic: false,
                userInfoSetting: false,
            });
        } else if (prop === 'knowledgeStatic') {
            setOpenPages({
                dailySpace: false,
                knowledgeStatic: true,
                userInfoSetting: false,
            });
        } else {
            setOpenPages({
                dailySpace: false,
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
                            <SmallAvatar>
                                <CameraAltIcon fontSize="small" style={{ fontSize: 16, color: 'darkgreen' }} />
                            </SmallAvatar>
                        </Tooltip>
                    }
                >
                    <Avatar alt="Travis Howard" src={userImg} className={classes.userImg} />
                </Badge>
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
                                                <Grid item >54</Grid>
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
                                                <Grid item>134</Grid>
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
                                                <Grid item >341</Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item style={{ textAlign: 'center' }}><h2 style={{ paddingTop: 30 }}>Franz Zhao</h2></Grid>
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
                                                    onClick={() => { handleOpenPage('dailySpace') }}
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
                                                    onClick={() => { handleOpenPage('dailySpace') }}
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
                    openPages.dailySpace && <DailySpace />
                }
                {
                    openPages.knowledgeStatic && <KnowledgeStatic />
                }
                {
                    openPages.userInfoSetting && <UserInfoSetting />
                }
            </Paper>
        </div>
    )
}

const KnowledgeStatic = () => {
    const options = {
        grid: { top: 8, right: 8, bottom: 24, left: 36 },
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                smooth: true,
            },
        ],
        tooltip: {
            trigger: 'axis',
        },
    };

    return (
        <React.Fragment>
            <h2>知识统计</h2>
            <ReactECharts option={options} />
        </React.Fragment>
    )
}

const DailySpace = () => {
    return (
        <React.Fragment>
            <h2>日志空间</h2>
            <TinyMCE />
        </React.Fragment>
    );
}

const UserInfoSetting = () => {
    return (
        <React.Fragment>
            <h2>信息设置</h2>
            <Grid container spacing={2}>
                <Grid item md={4} xs={12}>
                    <TextField
                        id="knm-node-intro"
                        label="用户名"
                        size="small"
                        value={'Franz Zhao'}
                        // onChange={handleChangeText('nodeIntro')}
                        multiline
                        style={{ width: '100%' }}
                    />
                </Grid>
                <Grid item md={4} xs={12}>
                    <TextField
                        id="knm-node-intro"
                        label="邮箱"
                        size="small"
                        value={'franzzhao97@gmail.com'}
                        // onChange={handleChangeText('nodeIntro')}
                        multiline
                        style={{ width: '100%' }}
                    />
                </Grid>
                <Grid item md={4} xs={12}>
                    <TextField
                        id="knm-node-intro"
                        label="重设密码"
                        size="small"
                        // defaultValue={values.nodeIntro}
                        // onChange={handleChangeText('nodeIntro')}
                        multiline
                        style={{ width: '100%' }}
                    />
                </Grid>
            </Grid>
            <Button variant="outlined" color="primary" style={{ marginTop: 30 }}>确认修改</Button>
        </React.Fragment>
    );
}