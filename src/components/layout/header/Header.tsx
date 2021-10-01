import React from 'react';
// import img
import logo from '../../../assets/image/logo.png';
// import MD style
import { alpha, createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
// import MD components
import { AppBar, Avatar, Badge, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@material-ui/core';
// import MD icons
import NotificationsIcon from '@material-ui/icons/Notifications';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';

// Current Page Style
const useStyle = makeStyles((theme: Theme) => createStyles({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        background: theme.palette.primary.dark,
    },
    toolbar: {
        minHeight: '58px !important',
    },
    logo: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        fontSize: 20,
        letterSpacing: 4,
    },
    leftBar: {
        marginRight: theme.spacing(1),
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
    topMenu: {
        marginTop: 40,
    },
}));

export const Header = () => {
    // style
    const classes = useStyle();
    const matches = useMediaQuery('(min-width:440px)');

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar
            position="fixed"
            className={classes.appBar}
        >
            <Toolbar className={classes.toolbar}>
                <Avatar alt="Logo" src={logo} className={classes.logo} />
                <Typography variant="h6" className={classes.title}>
                    {matches && '知识网络地图'}
                </Typography>
                <Tooltip title='查看消息通知' arrow>
                    <IconButton
                        aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}
                        aria-label="show 17 new notifications" color="inherit"
                        className={classes.leftBar}
                    >
                        <Badge badgeContent={17} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                </Tooltip>

                <Tooltip title='切换为深色模式' arrow>
                    <IconButton
                        aria-controls="simple-menu" aria-haspopup="true"
                        aria-label="show 17 new notifications" color="inherit"
                        className={classes.leftBar}
                    >
                        <Brightness4Icon />
                    </IconButton>
                </Tooltip>

                <Menu
                    className={classes.topMenu}
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};