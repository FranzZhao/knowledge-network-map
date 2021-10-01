import React, { useState, useEffect } from 'react';
// improt MD style
import clsx from 'clsx';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
// import img
import logo from '../../../assets/image/logo.png';
import userBackground from '../../../assets/image/user-info.jpg';
import userPicture from '../../../assets/image/users/Franz.png';
// import MD components
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import { List, ListItem, ListItemIcon, ListItemText, ListSubheader, Typography } from '@material-ui/core';
// import MD icons
import MenuIcon from '@material-ui/icons/Menu';
import ArtTrackIcon from '@material-ui/icons/ArtTrack';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import SearchIcon from '@material-ui/icons/Search';
import Brightness4Icon from '@material-ui/icons/Brightness4';

// Current Page Style
const drawerWidth = 240;
const useStyle = makeStyles((theme: Theme) => createStyles({
    toolbarHeader: {
        minHeight: '56px !important',
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.common.white,
    },
    logo: {
        marginRight: theme.spacing(1),
        width: theme.spacing(4),
        height: theme.spacing(4),
        transition: 'margin 100ms',
    },
    logoSingle: {
        marginLeft: -12,
        width: theme.spacing(4),
        height: theme.spacing(4),
        transition: 'margin 100ms',
    },
    title: {
        flexGrow: 1,
        fontSize: 18,
        letterSpacing: 3,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        // zIndex: theme.zIndex.drawer + 1,
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(7) + 1,
        },
    },
    drawerContainer: {
        overflowY: 'auto',
        overflowX: 'hidden',
        marginBottom: 55,
        // zIndex: theme.zIndex.drawer + 1,
        // background: 'green',
        '&::-webkit-scrollbar': {
            width: 5,
            backgroundColor: '#ffffff',
        },
        '&::-webkit-scrollbar-thumb': {
            background: '#cecdcdb8',
            borderRadius: '2px',
        },
    },
    drawerContainerClose: {
        marginBottom: 0,
    },
    hide: {
        display: 'none',
    },
    toolbar: {
        backgroundImage: `url(${userBackground})`,
        minHeight: '135px !important',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 2),
        color: '#e8e8e8',
        backgroundSize: '240px',
        // backgroundPosition: 0,
        // necessary for content to be below app bar
        // ...theme.mixins.toolbar,
    },
    menuList: {
        height: 50,
    },
    menuButton: {
        marginTop: 5,
    },
    userHeader: {
        marginTop: 25,
        marginRight: 110,
        width: theme.spacing(6),
        height: theme.spacing(6),
        boxShadow: '0px 0px 20px #294761',
    },
    useNameBox: {
        background: '#00000099',
        marginTop: -35,
        color: '#ffffff',
        height: 35,
        lineHeight: '35px',
        fontSize: 15,
        paddingLeft: 25,
        letterSpacing: '2px',
    },
    menuIcon: {
        minWidth: 35
    },
    bottomNavLight: {
        overflow: 'hidden',
        borderTop: '1px solid #e2e2e2',
        borderRight: '1px solid #e2e2e2',
        position: 'fixed',
        bottom: 0,
        zIndex: theme.zIndex.drawer + 1,
        width: 240,
    },
    bottomNavDark: {
        overflow: 'hidden',
        borderTop: '1px solid #5f5f5f',
        borderRight: '1px solid #5f5f5f',
        position: 'fixed',
        bottom: 0,
        zIndex: theme.zIndex.drawer + 1,
        width: 240,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    listSubTitle: {
        padding: '0px !important',
    }
}));

export const LeftDrawer = () => {
    // style
    const classes = useStyle();
    // drawer open state
    const [open, setOpen] = useState(true);
    const matches = useMediaQuery('(min-width:950px)');

    // open drawer
    const handleDrawerOpen = () => {
        setOpen(!open);
    };

    useEffect(() => {
        console.log(!matches);
        if (!matches) {
            setOpen(false);
        } else {
            setOpen(true);
        }
    }, [matches]);

    return (
        <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
            })}
            classes={{
                paper: clsx({
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                }),
            }}
        >
            <Toolbar className={classes.toolbarHeader}>
                <Avatar alt="Logo" src={logo} className={clsx({
                    [classes.logo]: open,
                    [classes.logoSingle]: !open,
                })} />
                <Typography className={clsx(classes.title, {
                    [classes.hide]: !open
                })}>
                    知识网络地图
                </Typography>
            </Toolbar>
            <div className={clsx(classes.drawerContainer, {
                [classes.drawerContainerClose]: !open
            })}>
                {/* user info */}
                <div className={classes.toolbar}>
                    <Avatar
                        alt="User Picture" src={userPicture} className={classes.userHeader}
                    />
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="end"
                        className={classes.menuButton}
                        key={'open-drawer'}
                        onClick={handleDrawerOpen}
                    >
                        <MenuIcon />
                    </IconButton>
                </div>
                <div className={clsx(classes.useNameBox, { [classes.hide]: !open })}>
                    Franz Zhao
                </div>
                {/* Project Nav Menu*/}
                <Tooltip title={open ? "" : "所有地图"} arrow placement="right">
                    <ListItem button key={'home'} className={classes.menuList} selected={true}>
                        <ListItemIcon className={classes.menuIcon} key={`all-list-icon`}>
                            <ArtTrackIcon />
                        </ListItemIcon>
                        <ListItemText primary={'所有地图'} key={`all-list-tet`} className={clsx({ [classes.hide]: !open })} />
                    </ListItem>
                </Tooltip>
                <Tooltip title={open ? "" : "笔记检索"} arrow placement="right">
                    <ListItem button key={'search'} className={classes.menuList} selected={false}>
                        <ListItemIcon className={classes.menuIcon} key={`search-icon`}>
                            <SearchIcon />
                        </ListItemIcon>
                        <ListItemText primary={'笔记检索'} key={`search-text`} className={clsx({ [classes.hide]: !open })} />
                    </ListItem>
                </Tooltip>
                {/* 知识地图列表 */}
                <Divider className={clsx({ [classes.hide]: open })} />
                <List
                    className={clsx(classes.listSubTitle, {
                        [classes.hide]: !open,
                    })}
                    subheader={<ListSubheader>知识地图</ListSubheader>}
                    key={`knm-list`}
                />
                <Tooltip title={open ? "" : "学习科学地图"} arrow placement="right">
                    <ListItem button key={'knm1'} className={classes.menuList} selected={false}>
                        <ListItemIcon className={classes.menuIcon} key={`knm1-icon`}>
                            📚
                        </ListItemIcon>
                        <ListItemText primary={'学习科学地图'} key={`knm1-text`} className={clsx({ [classes.hide]: !open })} />
                    </ListItem>
                </Tooltip>
                <Tooltip title={open ? "" : "学习设计地图"} arrow placement="right">
                    <ListItem button key={'knm2'} className={classes.menuList} selected={false}>
                        <ListItemIcon className={classes.menuIcon} key={`knm2-icon`}>
                            🧩
                        </ListItemIcon>
                        <ListItemText primary={'学习设计地图'} key={`knm2-text`} className={clsx({ [classes.hide]: !open })} />
                    </ListItem>
                </Tooltip>
                <Tooltip title={open ? "" : "元认知地图"} arrow placement="right">
                    <ListItem button key={'knm4'} className={classes.menuList} selected={false}>
                        <ListItemIcon className={classes.menuIcon} key={`knm4-icon`}>
                            🪶
                        </ListItemIcon>
                        <ListItemText primary={'元认知地图'} key={`knm4-text`} className={clsx({ [classes.hide]: !open })} />
                    </ListItem>
                </Tooltip>
                <Tooltip title={open ? "" : "知识建构地图"} arrow placement="right">
                    <ListItem button key={'knm4'} className={classes.menuList} selected={false}>
                        <ListItemIcon className={classes.menuIcon} key={`knm4-icon`}>
                            🎁
                        </ListItemIcon>
                        <ListItemText primary={'知识建构地图'} key={`knm4-text`} className={clsx({ [classes.hide]: !open })} />
                    </ListItem>
                </Tooltip>
                <Tooltip title={open ? "" : "认识论信念地图"} arrow placement="right">
                    <ListItem button key={'knm4'} className={classes.menuList} selected={false}>
                        <ListItemIcon className={classes.menuIcon} key={`knm4-icon`}>
                            🎨
                        </ListItemIcon>
                        <ListItemText primary={'认识论信念地图'} key={`knm4-text`} className={clsx({ [classes.hide]: !open })} />
                    </ListItem>
                </Tooltip>
                <Tooltip title={open ? "" : "情境认知理论"} arrow placement="right">
                    <ListItem button key={'knm4'} className={classes.menuList} selected={false}>
                        <ListItemIcon className={classes.menuIcon} key={`knm4-icon`}>
                            🎯
                        </ListItemIcon>
                        <ListItemText primary={'情境认知理论'} key={`knm4-text`} className={clsx({ [classes.hide]: !open })} />
                    </ListItem>
                </Tooltip>
                <Tooltip title={open ? "" : "建构主义理论"} arrow placement="right">
                    <ListItem button key={'knm4'} className={classes.menuList} selected={false}>
                        <ListItemIcon className={classes.menuIcon} key={`knm4-icon`}>
                            🎗️
                        </ListItemIcon>
                        <ListItemText primary={'建构主义理论'} key={`knm4-text`} className={clsx({ [classes.hide]: !open })} />
                    </ListItem>
                </Tooltip>
                <Tooltip title={open ? "" : "认知加工主义"} arrow placement="right">
                    <ListItem button key={'knm4'} className={classes.menuList} selected={false}>
                        <ListItemIcon className={classes.menuIcon} key={`knm4-icon`}>
                            📕
                        </ListItemIcon>
                        <ListItemText primary={'认知加工主义'} key={`knm4-text`} className={clsx({ [classes.hide]: !open })} />
                    </ListItem>
                </Tooltip>
                <Tooltip title={open ? "" : "复杂系统科学地图"} arrow placement="right">
                    <ListItem button key={'knm3'} className={classes.menuList} selected={false}>
                        <ListItemIcon className={classes.menuIcon} key={`knm3-icon`}>
                            🎶
                        </ListItemIcon>
                        <ListItemText primary={'复杂系统科学地图'} key={`knm3-text`} className={clsx({ [classes.hide]: !open })} />
                    </ListItem>
                </Tooltip>
            </div>
            <BottomNavigation
                showLabels
                className={clsx(classes.bottomNavLight, {
                    // [classes.bottomNavLight]: themeMode === 'light',
                    // [classes.bottomNavDark]: themeMode === 'dark',
                    [classes.hide]: !open
                })}
            >
                <Tooltip title="设置" arrow>
                    <BottomNavigationAction icon={<SettingsIcon />} style={{ color: "#8c8c8c" }} key={'设置'} />
                </Tooltip>
                <Tooltip title="切换深色模式" arrow>
                    <BottomNavigationAction icon={<Brightness4Icon />} style={{ color: "#8c8c8c" }} key={'联系我们'} />
                </Tooltip>
                <Tooltip title="退出" arrow>
                    <BottomNavigationAction
                        icon={<ExitToAppIcon />} style={{ color: "#8c8c8c" }} key={'退出'}
                    />
                </Tooltip>
            </BottomNavigation>
        </Drawer>
    );
};