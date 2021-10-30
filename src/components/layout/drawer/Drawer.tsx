import React, { useState, useEffect } from 'react';
// improt MD style
import clsx from 'clsx';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
// import img
import logo from '../../../assets/image/logo.png';
import userBackground from '../../../assets/image/user-info.jpg';
import userPicture from '../../../assets/image/users/Franz.png';
// import customize components
import { DialogBox } from '../../common';
// import MD components
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import { Button, Chip, List, ListItem, ListItemIcon, ListItemText, ListSubheader, TextField, Typography } from '@material-ui/core';
// import MD icons
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';
import CloudQueueIcon from '@material-ui/icons/CloudQueue';
import AddIcon from '@material-ui/icons/Add';
import LanguageIcon from '@material-ui/icons/Language';
// import MockData
import { SystemNavItems } from '../../../settings/mocks/DefaultNavItem';
import { mockTags } from '../../../settings/mocks/DefaultTags';
// import Redux
import { useSelector } from '../../../redux/hooks';
import { useDispatch } from 'react-redux';
import { openItemToPageTab, openUserSpace, updateSystemNavItem } from '../../../redux/pageTabs/slice';
import { leftDrawerStateChange } from '../../../redux/leftDrawer/slice';
import { changeCurrentTheme } from '../../../redux/theme/slice';
import { changeLanguage } from '../../../redux/language/slice';
import { UserSlice } from '../../../redux/user/slice';
import { knmList, knmCreate, knmDetail } from '../../../redux/knm/knmMapSlice';
// import Router
import { useHistory } from 'react-router-dom';
// import emoji
import 'emoji-mart/css/emoji-mart.css';
import { Emoji, Picker } from 'emoji-mart';
import Autocomplete from '@material-ui/lab/Autocomplete';

// Current Page Style
const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) => createStyles({
    toolbarHeader: {
        minHeight: '56px !important',
        backgroundColor: theme.palette.type === 'light' ? theme.palette.primary.dark : '#233044',
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
        "& .MuiDrawer-paper": {
            backgroundColor: theme.palette.type === 'light' ? '#ffffff' : '#233044',
        },
        "& .MuiDrawer-paperAnchorDockedLeft": {
            borderRight: 0,
        },
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
        backgroundColor: theme.palette.type === 'light' ? '#ffffff' : '#233044',
        '&::-webkit-scrollbar': {
            width: 5,
            backgroundColor: theme.palette.type === 'light' ? '#ffffff' : '#233044',
        },
        '&::-webkit-scrollbar-thumb': {
            background: theme.palette.type === 'light' ? '#cecdcdb8' : '#444a53a6',
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
        position: 'fixed',
        bottom: 0,
        zIndex: theme.zIndex.drawer + 1,
        width: 240,
        backgroundColor: '#f3f2f2',
        "& .MuiBottomNavigationAction-root": {
            minWidth: 60,
        }
    },
    bottomNavDark: {
        overflow: 'hidden',
        position: 'fixed',
        bottom: 0,
        zIndex: theme.zIndex.drawer + 1,
        width: 240,
        color: theme.palette.common.white,
        backgroundColor: '#202b3b',
        "& .MuiBottomNavigationAction-root": {
            minWidth: 60,
        }
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    listSubTitle: {
        padding: '0px !important',
    },
    bottomNavIcon: {
        color: theme.palette.type === 'light' ? '#848484' : '#f2f2f2',
        "& .MuiSvgIcon-root": {
            width: 22,
        }
    },
    emojiPicker: {
        "& .emoji-mart-scroll": {
            height: 160,
            '&::-webkit-scrollbar': {
                width: 5,
                backgroundColor: theme.palette.type === 'light' ? '#ffffff' : '#222222',
            },
            '&::-webkit-scrollbar-thumb': {
                background: theme.palette.type === 'light' ? '#cecdcdb8' : '#444a53a6',
                borderRadius: '6px',
            },
        }
    },
    emojiStyle: {
        "& > span": {
            left: 10,
            top: 5,
        }
    },
}));

export const LeftDrawer = () => {
    // style
    const classes = useStyles();
    // router
    const history = useHistory();
    // redux
    const dispatch = useDispatch();
    const jwt = useSelector(state => state.user.token);
    const currentTheme = useSelector(state => state.theme.currentTheme);
    const currentLanguage = useSelector(state => state.language.language);
    const currentSystemNavItems = useSelector(state => state.pageTabs.projectNavMenuItems);
    const currentActivatedNavItem = useSelector(state => state.pageTabs.leftDrawerActivatedItem);
    const alreadyOpenedTabs = useSelector(state => state.pageTabs.alreadyOpenedTabs);
    const knmListInfo = useSelector(state => state.knmMap.info);
    // drawer open state & style
    const [open, setOpen] = useState(true);
    const matches = useMediaQuery('(min-width:1000px)');
    const matches600 = useMediaQuery('(min-width:600px)');
    // open add new knm dialog
    const [openDialog, setOpenDialog] = useState(false);
    // knm List with detail info
    const [currentKnmList, setCurrentKnmList] = useState<any[]>([]);

    // get current knm list: when drawer dom show
    useEffect(() => {
        dispatch(knmList({ jwt: jwt }));
    }, []);

    // open add new knm dialog
    const handleOpenAddKNMDialog = () => {
        setOpenDialog(true);
    };

    // close add new knm dialog
    const handleCloseAddKNMDialog = () => {
        setOpenDialog(false);
    };

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

    // listener: current knm list -> listen whether list have changed
    useEffect(() => {
        let newList: any[] = [];
        knmListInfo.map(item => {
            newList.push({
                id: item['_id'],
                title: item['title'],
                icon: item['emoji'],
            });
        });
        setCurrentKnmList(newList);
        dispatch(updateSystemNavItem({
            knmNavItems: knmListInfo
        }));
    }, [knmListInfo]);

    // handle open detail knm page
    const handleOpenDetailKnmPage = async (knmId: string) => {
        const openKnmPage = await dispatch(knmDetail({
            knmId: knmId, jwt: jwt
        }));
        // console.log(openKnmPage['payload']['title']);
        // console.log(knmListInfo);

        dispatch(openItemToPageTab({
            openItemName: openKnmPage['payload']['title'],
            alreadyOpenedTabs: alreadyOpenedTabs,
            projectNavMenuItems: currentSystemNavItems,
        }));
        history.push('/main/detail');
    }

    // click nav item: Activate Left Drawer Nav Item
    const handleClickNavItem = (title: string, router: string) => {
        dispatch(openItemToPageTab({
            openItemName: title,
            alreadyOpenedTabs: alreadyOpenedTabs,
            projectNavMenuItems: currentSystemNavItems,
        }));
        history.push(router);
    };

    // bottom btn: enter user space
    const handleClickUserSpace = () => {
        dispatch(openUserSpace(alreadyOpenedTabs));
        history.push('/main/userSpace');
    };

    // bottom btn: change system theme
    const handleChangeTheme = () => {
        if (currentTheme === 'light') {
            dispatch(changeCurrentTheme('dark'));
        } else {
            dispatch(changeCurrentTheme('light'));
        }
    };

    // bottom btn: change system language
    const handleChangeLanguage = () => {
        dispatch(changeLanguage(currentLanguage));
    };

    // bottom btn: logout
    const handleLogout = () => {
        dispatch(UserSlice.actions.logout());
        // 重定向到登录页面
        history.push('/user/login');
    };

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
                    SystemNavItems.map((item) => {
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
                    currentKnmList.map((item) => {
                        return (
                            <Tooltip title={open ? "" : item.title} key={`${item.id}-tooltip`} arrow placement="right">
                                <ListItem
                                    button
                                    key={`${item.id}-item`}
                                    className={classes.menuList}
                                    selected={currentActivatedNavItem.title === item.title ? true : false}
                                    onClick={() => handleOpenDetailKnmPage(item.id)}
                                >
                                    <ListItemIcon className={classes.menuIcon} key={`${item.id}-icon`}>
                                        <Emoji emoji={item.icon} set='twitter' size={20} />
                                    </ListItemIcon>
                                    <ListItemText primary={item.title} key={`${item.id}-text`} className={clsx({ [classes.hide]: !open })} />
                                </ListItem>
                            </Tooltip>
                        );
                    })
                }
                <ListItem
                    button
                    key={`add-knm-item`}
                    className={classes.menuList}
                    // selected={currentActivatedNavItem.title === item.title ? true : false}
                    onClick={handleOpenAddKNMDialog}
                >
                    <ListItemIcon className={classes.menuMainIcon} style={{ color: '#959595' }} key={`add-knm-icon`}>
                        <AddIcon />
                    </ListItemIcon>
                    <ListItemText primary={'添加知识地图'} style={{ color: '#959595' }} key={`add-knm-text`} className={clsx({ [classes.hide]: !open })} />
                </ListItem>

                {/* add knm dialog */}
                <AddKNMDialog
                    openDialog={openDialog}
                    handleCloseDialog={handleCloseAddKNMDialog}
                />
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
                <Tooltip title="用户空间" arrow>
                    <BottomNavigationAction
                        icon={<CloudQueueIcon />}
                        className={classes.bottomNavIcon}
                        key={'设置'}
                        onClick={handleClickUserSpace}
                    />
                </Tooltip>
                {
                    currentTheme === 'light' ? (
                        <Tooltip title='切换为深色模式' arrow>
                            <BottomNavigationAction
                                icon={<Brightness4Icon />} className={classes.bottomNavIcon} key={'深色模式'}
                                onClick={handleChangeTheme}
                            />
                        </Tooltip>
                    ) : (
                        <Tooltip title='切换为浅色模式' arrow>
                            <BottomNavigationAction
                                icon={<BrightnessHighIcon />} className={classes.bottomNavIcon} key={'浅色模式'}
                                onClick={handleChangeTheme}
                            />
                        </Tooltip>
                    )
                }
                <Tooltip title="语言切换" arrow>
                    {/* LanguageIcon */}
                    <BottomNavigationAction
                        icon={<LanguageIcon />} className={classes.bottomNavIcon} key={'语言切换'}
                        onClick={handleChangeLanguage}
                    />
                </Tooltip>
                <Tooltip title="退出" arrow>
                    <BottomNavigationAction
                        icon={<ExitToAppIcon />} className={classes.bottomNavIcon} key={'退出'}
                        onClick={handleLogout}
                    />
                </Tooltip>
            </BottomNavigation>
        </Drawer>
    );
};

interface AddKNMDialogState {
    openDialog: boolean;
    handleCloseDialog: () => void;
}
interface NewKNMInfoState {
    title: string;
    tags: any[];
    intro: string;
    emoji: string;
}
const AddKNMDialog: React.FC<AddKNMDialogState> = ({
    openDialog, handleCloseDialog
}) => {
    // redux
    const dispatch = useDispatch();
    const currentTheme = useSelector(state => state.theme.currentTheme);
    const jwt = useSelector(state => state.user.token);
    const currentKnmMaps = useSelector(state => state.knmMap.info);
    // style
    const classes = useStyles();
    const [values, setValues] = useState<NewKNMInfoState>({
        title: '',
        tags: [mockTags[1].title],
        intro: '',
        emoji: 'books',
    });
    // emoji i18n
    const emojiI18n = {
        search: '搜索',
        clear: '清空', // Accessible label on "clear" button
        notfound: '没有找到Emoji',
        skintext: '选择你的默认肤色',
        categories: {
            search: '搜索结果',
            recent: '常用',
            smileys: '笑脸 & 表情',
            people: '人 & 身体',
            nature: '动物 & 自然',
            foods: '食物 & 饮品',
            activity: '活动',
            places: '旅行 & 场地',
            objects: '物品',
            symbols: '符号',
            flags: '旗帜',
            custom: '自定义',
        },
        categorieslabel: 'Emoji类别', // Accessible title for the list of categories
        skintones: {
            1: '默认肤色',
            2: '浅肤色',
            3: '适中浅肤色',
            4: '适中肤色',
            5: '适中深肤色',
            6: '深肤色',
        },
    };

    const handleChangeValues = (prop: keyof NewKNMInfoState) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [prop]: event.target.value
        });
    };

    const handleChangeEmoji = (emoji) => {
        setValues({
            ...values,
            emoji: emoji.id
        });
    };

    const handleNewKNM = () => {
        dispatch(knmCreate({
            currentKnmMaps: currentKnmMaps,
            jwt: jwt,
            title: values.title,
            tags: values.tags,
            introduction: values.intro,
            emoji: values.emoji
        }));
        handleCloseDialog();
    };

    return (
        <DialogBox
            boxSize={'lg'}
            open={openDialog}
            title={'添加知识地图'}
            contain={
                <React.Fragment>
                    <TextField
                        id="knm-node-name"
                        label="知识地图标题"
                        size="small"
                        value={values.title}
                        onChange={handleChangeValues('title')}
                        style={{ width: '100%', marginBottom: 10 }}
                    />
                    <Autocomplete
                        style={{ width: '100%', flex: 1, marginBottom: 10 }}
                        multiple
                        id="tags-filled"
                        options={mockTags.map((option) => option.title)}
                        value={values.tags}
                        onChange={(event, newValue) => {
                            setValues({
                                ...values,
                                tags: newValue
                            });
                        }}
                        renderTags={(value: string[], getTagProps) => (
                            value.map((option: string, index: number) => (
                                (<Chip variant="default" label={option} size="small" color="primary" {...getTagProps({ index })} />)
                            ))
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder="选择或输入新标签"
                            />
                        )}
                    />
                    <TextField
                        id="knm-node-intro"
                        label="知识节点简介"
                        size="small"
                        value={values.intro}
                        onChange={handleChangeValues('intro')}
                        multiline
                        style={{ width: '100%', marginBottom: 10 }}
                    />
                    <div className={classes.emojiStyle} style={{ width: '100%', marginBottom: 20, fontSize: 16 }}>
                        知识地图小图标: <Emoji emoji={values.emoji} set='twitter' size={30} /> &nbsp;&nbsp;（请选择合适的emoji）
                    </div>
                    <div className={classes.emojiPicker}>
                        <Picker
                            style={{
                                width: 451,
                            }}
                            set='twitter'
                            title={'选择项目图标'}
                            emoji='point_up'
                            i18n={emojiI18n}
                            onSelect={handleChangeEmoji}
                            theme={currentTheme === 'light' ? 'light' : 'dark'}
                        />
                    </div>
                </React.Fragment >
            }
            actions={
                <React.Fragment>
                    <Button variant="text" color="secondary" onClick={handleCloseDialog}>取消</Button>
                    <Button variant="text" color="primary" onClick={handleNewKNM}>新建</Button>
                </React.Fragment>
            }
        />
    );
};