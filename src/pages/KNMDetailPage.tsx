import React from 'react';
// import customize components
import { KnowledgeGraph } from '../components/common';
// import MD
import clsx from 'clsx';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Button, Tooltip, useMediaQuery } from '@material-ui/core';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';
import FormatColorFillIcon from '@material-ui/icons/FormatColorFill';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import AssignmentIcon from '@material-ui/icons/Assignment';
import MoreIcon from '@material-ui/icons/MoreVert';
// import redux
import { useSelector } from '../redux/hooks';
// import mock data
import { node_data, link_data } from '../settings/mocks/DefaultGraph';

const useStyles = makeStyles((theme: Theme) => createStyles({
    toolBarPaper: {
        borderRadius: 0,
    },
    toolBar: {
        height: '47px',
    },
    paper: {
        display: 'flex',
        flexWrap: 'wrap',
        borderRadius: 0,
        height: '47px',
        lineHeight: '47px',
        boxShadow: 'none',
    },
    divider: {
        margin: theme.spacing(1, 0.5),
    },
    graphTitle: {
        paddingLeft: 20,
        fontSize: 18,
    },
    toolBarButtons: {
        "& > *": {
            color: theme.palette.type === 'light' ? theme.palette.grey[500] : theme.palette.grey[200],
            minWidth: 50,
        },
        " & > *:hover ": {
            borderRadius: 'none',
        }
    },
    openHiddenToolBar: {
        color: theme.palette.grey[600],
        minWidth: 40,
        width: 40,
        minHeight: 40,
        borderRadius: 20,
        // marginRight: 10,
    },
    hiddenToolBar: {
        zIndex: 10,
    },
    hiddenToolBarBtn: {
        marginTop: 4,
        zIndex: 20,
        "& > *": {
            color: theme.palette.grey[500],
            minWidth: 40,
            width: 40,
            minHeight: 40,
            borderRadius: 20,
            margin: '2px 0px',
        }
    },
    hide: {
        display: 'none',
    },
    show: {
    }
}));


export const KNMDetailPage: React.FC = () => {
    const classes = useStyles();
    const currentTheme = useSelector(state => state.changeTheme.currentTheme);
    const mediaWidth = useMediaQuery('(min-width:950px)');

    const [openHiddenToolBar, setOpenHiddenToolBar] = React.useState(false);

    const handleOpen = () => {
        setOpenHiddenToolBar(!openHiddenToolBar);
    };

    return (
        <>
            {/* tool bar button */}
            <Paper className={classes.toolBarPaper}>
                {
                    mediaWidth ? (
                        <Grid
                            className={classes.toolBar}
                            container
                            direction="row"
                            // justifyContent="space-between"
                            alignItems="center"
                        >
                            <Grid item>
                                <Paper className={classes.paper}>
                                    <Grid container spacing={2} className={classes.graphTitle}>
                                        <Grid item>🧩</Grid>
                                        <Grid item>学习科学知识地图</Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                            <Grid item style={{ marginLeft: 20 }}>
                                <Paper elevation={0} className={classes.paper}>
                                    <Divider flexItem orientation="vertical" className={classes.divider} />
                                    <ToggleButtonGroup
                                        size="small"
                                        exclusive
                                        aria-label="text alignment"
                                        className={classes.toolBarButtons}
                                    >
                                        <Tooltip title="修改基本信息" arrow>
                                            <Button value="center" aria-label="centered">
                                                <AssignmentIcon />
                                            </Button>
                                        </Tooltip>
                                        <Tooltip title="添加知识节点" arrow>
                                            <Button value="center" aria-label="centered">
                                                <AddCircleOutlineIcon />
                                            </Button>
                                        </Tooltip>
                                        <Tooltip title="添加知识节点" arrow>
                                            <Button value="添加节点关联" aria-label="right aligned">
                                                <AccountTreeIcon />
                                            </Button>
                                        </Tooltip>
                                    </ToggleButtonGroup>
                                    <Divider flexItem orientation="vertical" className={classes.divider} />
                                    <ToggleButtonGroup
                                        size="small"
                                        exclusive
                                        aria-label="text alignment"
                                        className={classes.toolBarButtons}
                                    >
                                        <Tooltip title="放大" arrow>
                                            <Button value="left" aria-label="centered">
                                                <ZoomInIcon />
                                            </Button>
                                        </Tooltip>
                                        <Tooltip title="缩小" arrow>
                                            <Button value="center" aria-label="centered">
                                                <ZoomOutIcon />
                                            </Button>
                                        </Tooltip>
                                        <Tooltip title="全屏" arrow>
                                            <Button value="right" aria-label="centered">
                                                <ZoomOutMapIcon />
                                            </Button>
                                        </Tooltip>
                                        <Tooltip title="修改主题风格" arrow>
                                            <Button value="left" aria-label="centered">
                                                <FormatColorFillIcon />
                                            </Button>
                                        </Tooltip>
                                    </ToggleButtonGroup>
                                    <Divider flexItem orientation="vertical" className={classes.divider} />
                                </Paper>
                            </Grid>
                        </Grid>
                    ) : (
                        <Grid
                            className={classes.toolBar}
                            container
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Grid item>
                                <Paper className={classes.paper}>
                                    <Grid container spacing={2} className={classes.graphTitle}>
                                        <Grid item>🧩</Grid>
                                        <Grid item>学习科学知识地图</Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                            <Grid item style={{ marginRight: 20 }}>
                                <Paper elevation={0} className={classes.paper}>
                                    <div className={classes.hiddenToolBar}>
                                        <Button
                                            className={classes.openHiddenToolBar}
                                            value="center"
                                            aria-label="centered"
                                            onClick={handleOpen}
                                        >
                                            <MoreIcon />
                                        </Button>
                                        <Fade in={openHiddenToolBar}>
                                            <Grid container direction="column" className={classes.hiddenToolBarBtn}>
                                                <Tooltip title="修改基本信息" placement="left" arrow>
                                                    <Button value="center" aria-label="centered">
                                                        <AssignmentIcon />
                                                    </Button>
                                                </Tooltip>
                                                <Tooltip title="添加知识节点" placement="left" arrow>
                                                    <Button value="center" aria-label="centered">
                                                        <AddCircleOutlineIcon />
                                                    </Button>
                                                </Tooltip>
                                                <Tooltip title="添加知识节点" placement="left" arrow>
                                                    <Button value="添加节点关联" aria-label="right aligned">
                                                        <AccountTreeIcon />
                                                    </Button>
                                                </Tooltip>
                                                <Tooltip title="放大" placement="left" arrow>
                                                    <Button value="left" aria-label="centered">
                                                        <ZoomInIcon />
                                                    </Button>
                                                </Tooltip>

                                                <Tooltip title="缩小" placement="left" arrow>
                                                    <Button value="center" aria-label="centered">
                                                        <ZoomOutIcon />
                                                    </Button>
                                                </Tooltip>
                                                <Tooltip title="全屏" placement="left" arrow>
                                                    <Button value="right" aria-label="centered">
                                                        <ZoomOutMapIcon />
                                                    </Button>
                                                </Tooltip>
                                                <Tooltip title="修改主题风格" placement="left" arrow>
                                                    <Button value="left" aria-label="centered">
                                                        <FormatColorFillIcon />
                                                    </Button>
                                                </Tooltip>
                                            </Grid>
                                        </Fade>
                                    </div>
                                </Paper>
                            </Grid>
                        </Grid>
                    )
                }
            </Paper>
            {/* graph */}
            <KnowledgeGraph 
                node_data={node_data}
                link_data={link_data}
                themeMode={'black'}
            />
        </>
    )
}
