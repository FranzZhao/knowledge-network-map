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
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';
// import MockData
import { DefaultNavItems } from '../../../settings/mocks/DefaultNavItem';
// import Redux
import { useSelector } from '../../../redux/hooks';
import { useDispatch } from 'react-redux';
import { openItemToPageTab } from '../../../redux/openPageTabs/slice';
import { leftDrawerStateChange } from '../../../redux/openLeftDrawer/slice';
import { changeCurrentTheme } from '../../../redux/changeTheme/slice';
// import Router
import { useHistory } from 'react-router-dom';

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
        // paddingLeft: 24,
        // paddingRight: 16,
    },
    logoLess600: {
        marginLeft: -6,
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
            backgroundColor: theme.palette.type === 'light' ? '#ffffff' : '#424242',
        },
        '&::-webkit-scrollbar-thumb': {
            background: theme.palette.type === 'light' ? '#cecdcdb8' : '#707070b3',
            borderRadius: '6px',
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
    menuMainIcon: {
        minWidth: 35,
    },
    menuIcon: {
        minWidth: 35,
        color: '#000000',
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
    // router
    const history = useHistory();
    // redux
    const dispatch = useDispatch();
    const currentTheme = useSelector(state => state.changeTheme.currentTheme);
    const currentActivatedNavItem = useSelector(state => state.openPage.leftDrawerActivatedItem);
    const alreadyOpenedTabs = useSelector(state => state.openPage.alreadyOpenedTabs);
    // drawer open state & style
    const [open, setOpen] = useState(true);
    const matches = useMediaQuery('(min-width:950px)');
    const matches600 = useMediaQuery('(min-width:600px)');

    // open drawer
    const handleDrawerOpen = () => {
        let newDrawerOpenState = !open;
        setOpen(newDrawerOpenState);
        dispatch(leftDrawerStateChange(newDrawerOpenState));
    };

    // listener of Media Query
    useEffect(() => {
        if (!matches) {
            setOpen(false);
        } else {
            setOpen(true);
        }
    }, [matches]);

    // click nav item: Activate Left Drawer Nav Item
    const handleClickNavItem = (title: string, router: string) => {
        // dispatch(activateLeftDrawerNavItem(title));
        dispatch(openItemToPageTab({
            openItemName: title, alreadyOpenedTabs: alreadyOpenedTabs
        }));
        history.push(router);
    };

    // change system theme
    const handleChangeTheme = () => {
        if (currentTheme === 'light') {
            dispatch(changeCurrentTheme('dark'));
        } else {
            dispatch(changeCurrentTheme('light'));
        }
    }

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
                    [classes.logoLess600]: !matches600,
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
                {
                    DefaultNavItems.map((item) => {
                        if (item.type === 'SystemNavItems') {
                            return (
                                <Tooltip title={open ? "" : item.title} arrow placement="right" key={`${item.id}-tooltip`}>
                                    <ListItem
                                        button
                                        key={`${item.id}-item`}
                                        className={classes.menuList}
                                        selected={currentActivatedNavItem.title === item.title ? true : false}
                                        onClick={() => handleClickNavItem(item.title, item.router)}
                                    >
                                        <ListItemIcon className={classes.menuMainIcon} key={`${item.id}-icon`}>
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={item.title} key={`${item.id}-text`} className={clsx({ [classes.hide]: !open })} />
                                    </ListItem>
                                </Tooltip>
                            );
                        }
                    })
                }
                {/* KNM list */}
                <Divider className={clsx({ [classes.hide]: open })} />
                <List
                    className={clsx(classes.listSubTitle, {
                        [classes.hide]: !open,
                    })}
                    subheader={<ListSubheader>知识地图</ListSubheader>}
                    key={`knm-list`}
                />
                {
                    DefaultNavItems.map((item) => {
                        if (item.type === 'UserKNMNavItems') {
                            return (
                                <Tooltip title={open ? "" : item.title} key={`${item.id}-tooltip`} arrow placement="right">
                                    <ListItem
                                        button
                                        key={`${item.id}-item`}
                                        className={classes.menuList}
                                        selected={currentActivatedNavItem.title === item.title ? true : false}
                                        onClick={() => handleClickNavItem(item.title, item.router)}
                                    >
                                        <ListItemIcon className={classes.menuIcon} key={`${item.id}-icon`}>
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={item.title} key={`${item.id}-text`} className={clsx({ [classes.hide]: !open })} />
                                    </ListItem>
                                </Tooltip>
                            );
                        }
                    })
                }
            </div>
            {/* Bottom Button: Setting & LightOrDark & Logout */}
            <BottomNavigation
                showLabels
                className={clsx(classes.bottomNavLight, {
                    [classes.bottomNavLight]: currentTheme === 'light',
                    [classes.bottomNavDark]: currentTheme === 'dark',
                    [classes.hide]: !open
                })}
            >
                <Tooltip title="设置" arrow>
                    <BottomNavigationAction icon={<SettingsIcon />} style={{ color: "#8c8c8c" }} key={'设置'} />
                </Tooltip>
                {
                    currentTheme === 'light' ? (
                        <Tooltip title='切换为深色模式' arrow>
                            <BottomNavigationAction
                                icon={<Brightness4Icon />} style={{ color: '#8c8c8c' }} key={'深色模式'}
                                onClick={handleChangeTheme}
                            />
                        </Tooltip>
                    ) : (
                        <Tooltip title='切换为浅色模式' arrow>
                            <BottomNavigationAction
                                icon={<BrightnessHighIcon />} style={{ color: '#8c8c8c' }} key={'浅色模式'}
                                onClick={handleChangeTheme}
                            />
                        </Tooltip>
                    )
                }
                <Tooltip title="退出" arrow>
                    <BottomNavigationAction
                        icon={<ExitToAppIcon />} style={{ color: "#8c8c8c" }} key={'退出'}
                    />
                </Tooltip>
            </BottomNavigation>
        </Drawer>
    );
};