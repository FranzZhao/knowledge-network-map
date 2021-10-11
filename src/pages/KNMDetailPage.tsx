import React, { useState } from 'react';
// import customize components
import { KnowledgeGraph, InfoPanel, BasicDataTable } from '../components/common';
// import MD
import clsx from 'clsx';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';
import PhotoSizeSelectSmallIcon from '@material-ui/icons/PhotoSizeSelectSmall';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import FormatColorFillIcon from '@material-ui/icons/FormatColorFill';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import AssignmentIcon from '@material-ui/icons/Assignment';
import MoreIcon from '@material-ui/icons/MoreVert';
import MapIcon from '@material-ui/icons/Map';
import BookIcon from '@material-ui/icons/Book';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
// import redux
import { useSelector } from '../redux/hooks';
// import mock data
import { rows } from '../settings/mocks/DefaultNotebooks';
import { nodeData, linkData, relations } from '../settings/mocks/DefaultGraph';
// import react-full-screen
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
// import panel page
import {
    NodeInfoEditPanel,
    GraphBasicInfoEditPanel,
    AddNewNodePanel,
    AddNewLinkPanel,
    ModifyGraphThemePanel,
} from './infoPanelContent';
// import Markdown Editor
import ReactMarkdown from 'react-markdown';
// import remarkGfm from 'remark-gfm';

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
    viewButton: {
        "& button": {
            color: theme.palette.type === 'light' ? '#9e9e9e' : '#eeeeee',
        },
    },
    viewButtonSelected: {
        color: theme.palette.type === 'light' ? '#b1b1b1 !important' : '#ffffff !important',
    }
}));

const materialColor = [
    "#f44336",
    "#e91e63",
    "#9c27b0",
    "#673ab7",
    "#3f51b5",
    "#2196f3",
    "#03a9f4",
    "#00bcd4",
    "#009688",
    "#4caf50",
    "#8bc34a",
    "#cddc39",
    "#ffeb3b",
    "#ffc107",
    "#ff9800",
    "#f57c00",
    "#ff5722",
    "#795548",
    "#9e9e9e",
    "#607d8b",
];

const graphColorTheme = [
    '#fafafa', '#fce4ec', '#bbdefb', '#b3e5fc', '#b2ebf2', '#b2dfdb', '#c8e6c9', '#f0f4c3', '#fff9c4', '#ffe0b2',
    '#232323', '#263238', '#193c4d', '#31354b', '#3d3f34', '#334241', '#34485f', '#1b2818', '#1b3436', '#1b2c36',
];

/**
 * * Knowledge Network Map: Main Component Page
 */
export const KNMDetailPage: React.FC = () => {
    // component class style
    const classes = useStyles();
    // redux
    const currentTheme = useSelector(state => state.changeTheme.currentTheme);
    // media query
    const mediaWidth = useMediaQuery('(min-width:950px)');
    /**
     * * Components State
     */
    // graph edit tool bar
    const [openHiddenToolBar, setOpenHiddenToolBar] = useState(false);
    // node & link info panel: graph basic info + new node + new link + modify node or link info + ...
    const [openInfoPanel, setOpenInfoPanel] = useState({
        graphBasicInfoEditPanel: false,
        addNewNodePanel: false,
        addNewLinkPanel: false,
        modifyGraphThemePanel: false,
        nodeInfoEditPanel: false,
    });
    const [nodeName, setNodeName] = useState('');   // node name show in InfoPanel
    // Graph state
    const [graph, setGraph] = useState({
        node: nodeData,
        link: linkData,
        relations: relations,
    });

    // open hidden tool bar when media width less than 950px
    const handleToolBarOpen = () => {
        setOpenHiddenToolBar(!openHiddenToolBar);
    };

    // close all info panel
    const handleCloseInfoPanel = () => {
        setOpenInfoPanel({
            graphBasicInfoEditPanel: false,
            addNewNodePanel: false,
            addNewLinkPanel: false,
            modifyGraphThemePanel: false,
            nodeInfoEditPanel: false,
        });
    };

    // open Graph Basic Info Edit Panel
    const handleOpenGraphBasicInfoEditPanel = () => {
        setOpenInfoPanel({
            graphBasicInfoEditPanel: true,
            addNewNodePanel: false,
            addNewLinkPanel: false,
            modifyGraphThemePanel: false,
            nodeInfoEditPanel: false,
        });
    };

    // open Add New Node Panel
    const handleOpenAddNewNodePanel = () => {
        setOpenInfoPanel({
            graphBasicInfoEditPanel: false,
            addNewNodePanel: true,
            addNewLinkPanel: false,
            modifyGraphThemePanel: false,
            nodeInfoEditPanel: false,
        });
    };

    // open Add New Link Panel
    const handleOpenAddNewLinkPanel = () => {
        setOpenInfoPanel({
            graphBasicInfoEditPanel: false,
            addNewNodePanel: false,
            addNewLinkPanel: true,
            modifyGraphThemePanel: false,
            nodeInfoEditPanel: false,
        });
    };

    // open Modify Graph Theme Panel
    const handleOpenModifyGraphThemePanel = () => {
        setOpenInfoPanel({
            graphBasicInfoEditPanel: false,
            addNewNodePanel: false,
            addNewLinkPanel: true,
            modifyGraphThemePanel: true,
            nodeInfoEditPanel: false,
        });
    };


    // handle graph elements click
    const echartsClick = {
        'click': (e) => {
            if (e.dataType === 'node') {
                setNodeName(e.name);
                setOpenInfoPanel({
                    graphBasicInfoEditPanel: false,
                    addNewNodePanel: false,
                    addNewLinkPanel: false,
                    modifyGraphThemePanel: false,
                    nodeInfoEditPanel: true,
                });
            }
            if (e.dataType === 'edge') {
                setNodeName(e.value);
                setOpenInfoPanel({
                    graphBasicInfoEditPanel: false,
                    addNewNodePanel: false,
                    addNewLinkPanel: false,
                    modifyGraphThemePanel: false,
                    nodeInfoEditPanel: true,
                });
            }
        }
    };

    // add graph node
    const addNode = () => {
        // 将原本的数组深拷贝到新的数组中, 防止useState无法检测数组内容的变化
        let nodes = graph.node.concat();
        let newNode = {
            name: "new Node!",
            draggable: true,
            symbolSize: [100, 100],
            itemStyle: {
                color: '#FF963F'
            },
        };
        nodes.push(newNode);
        setGraph({
            ...graph,
            node: nodes
        })
    };

    // zoom in
    const [zoom, setZoom] = useState(1);
    const zoomIn = () => {
        if (zoom < 2) {
            setZoom(zoom + 0.1);
        }
    };
    const zoomOut = () => {
        if (zoom > 0.5) {
            setZoom(zoom - 0.1);
        }
    };
    const zoomReset = () => {
        setZoom(1);
    };

    const handleFullScreen = useFullScreenHandle();

    // switch view
    const [views, setViews] = useState<string>('graphView');
    const handleSwitchViews = (newView) => {
        if (newView !== null) {
            setViews(newView);
        }
    };

    return (
        // Full Screen Control
        <FullScreen handle={handleFullScreen}>
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
                                        exclusive
                                        aria-label="text alignment"
                                        size="small"
                                        className={clsx(classes.toolBarButtons, classes.viewButton)}
                                    >
                                        {
                                            views === 'graphView' ? (
                                                <Button
                                                    className={classes.viewButtonSelected}
                                                    value="graphView"
                                                    aria-label="centered"
                                                    disabled
                                                    variant="contained"
                                                    onClick={() => handleSwitchViews('graphView')}
                                                >
                                                    <MapIcon />
                                                </Button>
                                            ) : (
                                                <Tooltip title='知识地图视图' arrow>
                                                    <Button
                                                        value="graphView"
                                                        aria-label="centered"
                                                        onClick={() => handleSwitchViews('graphView')}
                                                    >
                                                        <MapIcon />
                                                    </Button>
                                                </Tooltip>
                                            )
                                        }
                                        {
                                            views === 'notebookListView' ? (
                                                <Button
                                                    className={classes.viewButtonSelected}
                                                    value="notebookListView"
                                                    aria-label="centered"
                                                    disabled
                                                    variant="contained"
                                                    onClick={() => handleSwitchViews('notebookListView')}
                                                >
                                                    <BookIcon />
                                                </Button>
                                            ) : (
                                                <Tooltip title='知识笔记视图' arrow>
                                                    <Button
                                                        value="notebookListView"
                                                        aria-label="centered"
                                                        onClick={() => handleSwitchViews('notebookListView')}
                                                    >
                                                        <BookIcon />
                                                    </Button>
                                                </Tooltip>
                                            )
                                        }
                                        {
                                            views === 'newNotebookView' ? (
                                                <Button
                                                    className={classes.viewButtonSelected}
                                                    value="newNotebookView"
                                                    aria-label="centered"
                                                    disabled
                                                    variant="contained"
                                                    onClick={() => handleSwitchViews('newNotebookView')}
                                                >
                                                    <NoteAddIcon />
                                                </Button>
                                            ) : (
                                                <Tooltip title='新建知识笔记' arrow>
                                                    <Button
                                                        value="newNotebookView"
                                                        aria-label="centered"
                                                        onClick={() => handleSwitchViews('newNotebookView')}
                                                    >
                                                        <NoteAddIcon />
                                                    </Button>
                                                </Tooltip>
                                            )
                                        }
                                    </ToggleButtonGroup>
                                    <Divider flexItem orientation="vertical" className={classes.divider} />
                                    <ToggleButtonGroup
                                        size="small"
                                        exclusive
                                        aria-label="text alignment"
                                        className={classes.toolBarButtons}
                                    >
                                        <Tooltip title="修改基本信息" arrow>
                                            <Button value="修改基本信息" aria-label="centered" onClick={handleOpenGraphBasicInfoEditPanel}>
                                                <AssignmentIcon />
                                            </Button>
                                        </Tooltip>
                                        <Tooltip title="添加知识节点" arrow>
                                            <Button value="添加知识节点" aria-label="centered" onClick={handleOpenAddNewNodePanel}>
                                                <AddCircleOutlineIcon />
                                            </Button>
                                        </Tooltip>
                                        <Tooltip title="添加节点关联" arrow>
                                            <Button value="添加节点关联" aria-label="right aligned" onClick={handleOpenAddNewLinkPanel}>
                                                <AccountTreeIcon />
                                            </Button>
                                        </Tooltip>
                                        <Tooltip title="修改主题风格" arrow>
                                            <Button value="修改主题风格" aria-label="centered" onClick={handleOpenModifyGraphThemePanel}>
                                                <FormatColorFillIcon />
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
                                            <Button value="放大" aria-label="centered" onClick={zoomIn}>
                                                <ZoomInIcon />
                                            </Button>
                                        </Tooltip>
                                        <Tooltip title="缩小" arrow>
                                            <Button value="缩小" aria-label="centered" onClick={zoomOut}>
                                                <ZoomOutIcon />
                                            </Button>
                                        </Tooltip>
                                        <Tooltip title="大小恢复" arrow>
                                            <Button value="大小恢复" aria-label="centered" onClick={zoomReset}>
                                                <RotateLeftIcon />
                                            </Button>
                                        </Tooltip>
                                        {
                                            handleFullScreen.active ? (
                                                <Tooltip title="退出全屏" arrow placement="bottom">
                                                    <Button value="退出全屏" aria-label="centered" onClick={handleFullScreen.exit}>
                                                        <PhotoSizeSelectSmallIcon />
                                                    </Button>
                                                </Tooltip>
                                            ) : (
                                                <Tooltip title="全屏" arrow placement="bottom">
                                                    <Button value="全屏" aria-label="centered" onClick={handleFullScreen.enter}>
                                                        <ZoomOutMapIcon />
                                                    </Button>
                                                </Tooltip>
                                            )
                                        }
                                    </ToggleButtonGroup>
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
                                            onClick={handleToolBarOpen}
                                        >
                                            <MoreIcon />
                                        </Button>
                                        <Fade in={openHiddenToolBar}>
                                            <Grid container direction="column" className={classes.hiddenToolBarBtn}>
                                                <Tooltip title="修改基本信息" placement="left" arrow>
                                                    <Button value="修改基本信息" aria-label="centered" onClick={handleOpenGraphBasicInfoEditPanel}>
                                                        <AssignmentIcon />
                                                    </Button>
                                                </Tooltip>
                                                <Tooltip title="添加知识节点" placement="left" arrow>
                                                    <Button value="添加知识节点" aria-label="centered" onClick={handleOpenAddNewNodePanel}>
                                                        <AddCircleOutlineIcon />
                                                    </Button>
                                                </Tooltip>
                                                <Tooltip title="添加节点关联" placement="left" arrow>
                                                    <Button value="添加节点关联" aria-label="right aligned" onClick={handleOpenAddNewLinkPanel}>
                                                        <AccountTreeIcon />
                                                    </Button>
                                                </Tooltip>
                                                <Tooltip title="修改主题风格" placement="left" arrow>
                                                    <Button value="修改主题风格" aria-label="centered" onClick={handleOpenModifyGraphThemePanel}>
                                                        <FormatColorFillIcon />
                                                    </Button>
                                                </Tooltip>
                                                <Tooltip title="放大" placement="left" arrow>
                                                    <Button value="放大" aria-label="centered">
                                                        <ZoomInIcon />
                                                    </Button>
                                                </Tooltip>

                                                <Tooltip title="缩小" placement="left" arrow>
                                                    <Button value="缩小" aria-label="centered">
                                                        <ZoomOutIcon />
                                                    </Button>
                                                </Tooltip>
                                                <Tooltip title="全屏" placement="left" arrow>
                                                    <Button value="全屏" aria-label="centered">
                                                        <ZoomOutMapIcon />
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
            <React.Fragment>
                {
                    views === 'graphView' &&
                    <>
                        <KnowledgeGraph
                            nodeData={graph.node}
                            linkData={graph.link}
                            relations={graph.relations}
                            themeMode={currentTheme === 'light' ? 'white' : 'black'}
                            zoom={zoom}
                            echartsClick={echartsClick}
                            isFullScreen={handleFullScreen.active}
                        />
                        {/* node info edit panel */}
                        {
                            openInfoPanel.nodeInfoEditPanel &&
                            <InfoPanel
                                title={'知识节点 | 信息编辑'}
                                handleClosePanel={handleCloseInfoPanel}
                                contain={
                                    <NodeInfoEditPanel
                                        nodeName={nodeName}
                                    />
                                }
                                isFullScreen={handleFullScreen.active}
                            />
                        }
                        {/* graph info edit panel */}
                        {
                            openInfoPanel.graphBasicInfoEditPanel &&
                            <InfoPanel
                                title={'知识笔记 | 基础信息'}
                                handleClosePanel={handleCloseInfoPanel}
                                contain={
                                    <GraphBasicInfoEditPanel />
                                }
                                isFullScreen={handleFullScreen.active}
                            />
                        }
                        {/* add new node panel */}
                        {
                            openInfoPanel.addNewNodePanel &&
                            <InfoPanel
                                title={'知识笔记 | 新增知识节点'}
                                handleClosePanel={handleCloseInfoPanel}
                                contain={
                                    <AddNewNodePanel
                                        materialColor={materialColor}
                                    />
                                }
                                isFullScreen={handleFullScreen.active}
                            />
                        }
                        {/* add new link panel */}
                        {
                            openInfoPanel.addNewLinkPanel &&
                            <InfoPanel
                                title={'知识笔记 | 新增知识关联'}
                                handleClosePanel={handleCloseInfoPanel}
                                contain={
                                    <AddNewLinkPanel />
                                }
                                isFullScreen={handleFullScreen.active}
                            />
                        }
                        {/* modify graph theme panel */}
                        {
                            openInfoPanel.modifyGraphThemePanel &&
                            <InfoPanel
                                title={'知识笔记 | 修改主题样式'}
                                handleClosePanel={handleCloseInfoPanel}
                                contain={
                                    <ModifyGraphThemePanel
                                        graphColorTheme={graphColorTheme}
                                    />
                                }
                                isFullScreen={handleFullScreen.active}
                            />
                        }
                    </>
                }
                {
                    views === 'notebookListView' &&
                    <React.Fragment>
                        <h1>这是知识地图笔记列表</h1>
                        <BasicDataTable
                            header={["笔记标题", "引用", "标签", "时间"]}
                            rows={rows}
                        />
                    </React.Fragment>
                }
                {
                    views === 'newNotebookView' &&
                    <React.Fragment>
                        <h1>新建知识笔记</h1>
                        <ReactMarkdown>
                            This ~is not~ strikethrough, but ~~this is~~!
                        </ReactMarkdown>
                    </React.Fragment>
                }
            </React.Fragment>
        </FullScreen>
    )
}
