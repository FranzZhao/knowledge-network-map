import React, { useEffect, useState } from 'react';
// import customize components
import { KnowledgeGraph, InfoPanel, PaginationDataTable } from '../../components/common';
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
import FormatColorFillIcon from '@material-ui/icons/FormatColorFill';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import AssignmentIcon from '@material-ui/icons/Assignment';
import MoreIcon from '@material-ui/icons/MoreVert';
import MapIcon from '@material-ui/icons/Map';
import BookIcon from '@material-ui/icons/Book';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import ListAltIcon from '@material-ui/icons/ListAlt';
import { CircularProgress } from '@material-ui/core';
// import redux
import { useSelector } from '../../redux/hooks';
import { useDispatch } from 'react-redux';
import { getGraphDetail, updateGraphTheme } from '../../redux/knm/graphSlice';
// import mock data
import { rows } from '../../settings/mocks/DefaultNotebooks';
import { nodeData, linkData, relations } from '../../settings/mocks/DefaultGraph';
// import panel page
import {
    NodeInfoEditPanel,
    LinkInfoEditPanel,
    GraphBasicInfoEditPanel,
    AddNewNodePanel,
    AddNewLinkPanel,
    ModifyGraphThemePanel,
} from './infoPanelContent';
// import notebook edit
import { NewNoteBookView } from './newNotebookView';
// import emoji
import { Emoji } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';


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
        marginRight: 10,
    },
    hiddenToolBar: {
        zIndex: 10,
    },
    hiddenToolBarBtn: {
        marginTop: 4,
        zIndex: 20,
        background: theme.palette.background.paper,
        borderRadius: 10,
        padding: 5,
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

const lineColor = [
    '#ffffff', '#ff9800', '#ffeb3b', '#ff5722', '#8bc34a',
    '#2d6986', '#1b3436', '#194d48', '#862d4b', '#232323'
];

interface KnowledgeGraphState {
    node: any[];
    link: any[];
    relations: any[];
    themeColor: string; // 主题颜色
    lineStyleType: 'solid' | 'dashed' | 'dotted';   //关联线样式
    lineStyleColor: string;     // 关联线颜色
    lineStyleWidth: number;     // 关联线宽度
    lineStyleOpacity: number;   // 关联线透明度
    lineStyleCurveness: number; // 关联线曲度
    labelFontSize: number;         //节点标签字体大小
    labelPosition: 'top' | 'left' | 'right' | 'bottom' | 'inside';
    edgeLabelFontSize: number;
    layout: 'force' | 'circular';
    forcePower: number;
};
/**
 * * Knowledge Network Map: Main Component Page
 */
export const KNMDetailPage: React.FC = () => {
    // component class style
    const classes = useStyles();
    // redux
    const dispatch = useDispatch();
    const jwt = useSelector(state => state.user.token);
    const currentKnmMapInfo = useSelector(state => state.knmMap.currentOpenMapInfo);
    const knmInfoLoading = useSelector(state => state.knmMap.loading);
    const currentTheme = useSelector(state => state.theme.currentTheme);
    const currentOpenGraphInfo = useSelector(state => state.graph.currentOpenGraphInfo);
    const currentActivatedTab = useSelector(state => state.pageTabs.currentActivatedTab);
    // media query
    const mediaWidth = useMediaQuery('(min-width:1050px)');
    /**
     * * Components State
     */
    // graph edit tool bar
    const [openHiddenToolBar, setOpenHiddenToolBar] = useState(false);
    // switch view
    const [views, setViews] = useState<string>('graphView');
    // Edit Panel : node & link info panel: graph basic info + new node + new link + modify node or link info + ...
    const [openInfoPanel, setOpenInfoPanel] = useState({
        graphBasicInfoEditPanel: false,
        addNewNodePanel: false,
        addNewLinkPanel: false,
        modifyGraphThemePanel: false,
        nodeInfoEditPanel: false,
        linkInfoEditPanel: false,
    });
    useEffect(() => {
        // each time when change currenOpenGraphInfo, close the info panel
        handleCloseInfoPanel();
    }, [currentActivatedTab]);
    // node name show in InfoPanel
    const [nodeName, setNodeName] = useState('');
    // Graph state
    const [graph, setGraph] = useState<KnowledgeGraphState>({
        node: [],
        link: [],
        relations: currentOpenGraphInfo['relations'],
        themeColor: currentOpenGraphInfo['themeColor'], // 主题颜色
        lineStyleType: currentOpenGraphInfo['lineStyleType'],   //关联线样式
        lineStyleColor: currentOpenGraphInfo['lineStyleColor'],     // 关联线颜色
        lineStyleWidth: currentOpenGraphInfo['lineStyleWidth'],     // 关联线宽度
        lineStyleOpacity: currentOpenGraphInfo['lineStyleOpacity'],   // 关联线透明度
        lineStyleCurveness: currentOpenGraphInfo['lineStyleCurveness'], // 关联线曲度
        labelFontSize: currentOpenGraphInfo['labelFontSize'],         //节点标签字体大小
        labelPosition: currentOpenGraphInfo['labelPosition'],
        edgeLabelFontSize: currentOpenGraphInfo['edgeLabelFontSize'],
        layout: currentOpenGraphInfo['layout'],
        forcePower: currentOpenGraphInfo['forcePower'],
    });
    useEffect(() => {
        // change the format to which echarts could read
        if (Object.keys(currentOpenGraphInfo).length !== 0) {
            let graphNode: any[] = [];
            let graphLink: any[] = [];
            currentOpenGraphInfo['nodes'].map(node => {
                graphNode.push({
                    name: node['name'],
                    draggable: true,                // 节点是否可拖拽，只在使用力引导布局的时候有用。
                    symbolSize: [node['size'], node['size']],
                    itemStyle: {
                        color: node['color']
                    },
                });
            });
            currentOpenGraphInfo['links'].map(link => {
                let source;
                let target;
                currentOpenGraphInfo['nodes'].map(node => {
                    if (node['_id'] === link['source']) {
                        source = node['name'];
                    }
                    if (node['_id'] === link['target']) {
                        target = node['name'];
                    }
                })
                graphLink.push({
                    value: link['name'],
                    source: source,
                    target: target,
                });
            });
            setGraph({
                node: graphNode,
                link: graphLink,
                relations: currentOpenGraphInfo['relations'],
                themeColor: currentOpenGraphInfo['themeColor'], // 主题颜色
                lineStyleType: currentOpenGraphInfo['lineStyleType'],   //关联线样式
                lineStyleColor: currentOpenGraphInfo['lineStyleColor'],     // 关联线颜色
                lineStyleWidth: currentOpenGraphInfo['lineStyleWidth'],     // 关联线宽度
                lineStyleOpacity: currentOpenGraphInfo['lineStyleOpacity'],   // 关联线透明度
                lineStyleCurveness: currentOpenGraphInfo['lineStyleCurveness'], // 关联线曲度
                labelFontSize: currentOpenGraphInfo['labelFontSize'],         //节点标签字体大小
                labelPosition: currentOpenGraphInfo['labelPosition'],
                edgeLabelFontSize: currentOpenGraphInfo['edgeLabelFontSize'],
                layout: currentOpenGraphInfo['layout'],
                forcePower: currentOpenGraphInfo['forcePower'],
            });
        }
    }, [currentOpenGraphInfo]);
    // detail page info : map title & emoji
    const [detailPageKnmInfo, setDetailPageKnmInfo] = useState({
        icon: currentKnmMapInfo['emoji'],
        title: currentKnmMapInfo['title'],
    });

    useEffect(() => {
        setDetailPageKnmInfo({
            icon: currentKnmMapInfo['emoji'],
            title: currentKnmMapInfo['title'],
        });
    }, [currentKnmMapInfo]);

    // switch view -> graph edit tool bar: three view - graphView & notebookListView & newNotebookView
    const handleSwitchViews = (newView) => {
        if (newView !== null) {
            setViews(newView);
            setOpenHiddenToolBar(false);
        }
    };

    // open hidden tool bar when media width less than 950px
    const handleToolBarOpen = () => {
        setOpenHiddenToolBar(!openHiddenToolBar);
    };

    // close all info panel
    const handleCloseInfoPanel = async () => {
        await setOpenInfoPanel({
            graphBasicInfoEditPanel: false,
            addNewNodePanel: false,
            addNewLinkPanel: false,
            modifyGraphThemePanel: false,
            nodeInfoEditPanel: false,
            linkInfoEditPanel: false,
        });
    };

    // open Graph Basic Info Edit Panel
    const handleOpenGraphBasicInfoEditPanel = () => {
        setOpenHiddenToolBar(false);
        setOpenInfoPanel({
            graphBasicInfoEditPanel: true,
            addNewNodePanel: false,
            addNewLinkPanel: false,
            modifyGraphThemePanel: false,
            nodeInfoEditPanel: false,
            linkInfoEditPanel: false,
        });
    };

    // open Add New Node Panel
    const handleOpenAddNewNodePanel = () => {
        setOpenHiddenToolBar(false);
        setOpenInfoPanel({
            graphBasicInfoEditPanel: false,
            addNewNodePanel: true,
            addNewLinkPanel: false,
            modifyGraphThemePanel: false,
            nodeInfoEditPanel: false,
            linkInfoEditPanel: false,
        });
    };

    // open Add New Link Panel
    const handleOpenAddNewLinkPanel = () => {
        setOpenHiddenToolBar(false);
        setOpenInfoPanel({
            graphBasicInfoEditPanel: false,
            addNewNodePanel: false,
            addNewLinkPanel: true,
            modifyGraphThemePanel: false,
            nodeInfoEditPanel: false,
            linkInfoEditPanel: false,
        });
    };

    // open Modify Graph Theme Panel
    const handleOpenModifyGraphThemePanel = () => {
        setOpenHiddenToolBar(false);
        setOpenInfoPanel({
            graphBasicInfoEditPanel: false,
            addNewNodePanel: false,
            addNewLinkPanel: true,
            modifyGraphThemePanel: true,
            nodeInfoEditPanel: false,
            linkInfoEditPanel: false,
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
                    linkInfoEditPanel: false,
                });
            }
            if (e.dataType === 'edge') {
                setNodeName(e.value);
                setOpenInfoPanel({
                    graphBasicInfoEditPanel: false,
                    addNewNodePanel: false,
                    addNewLinkPanel: false,
                    modifyGraphThemePanel: false,
                    nodeInfoEditPanel: false,
                    linkInfoEditPanel: true,
                });
            }
        }
    };

    // add graph node
    const handleAddNode = (newNode) => {
        // 将原本的数组深拷贝到新的数组中, 防止useState无法检测数组内容的变化
        let nodes = graph.node.concat();
        nodes.push(newNode);
        setGraph({
            ...graph,
            node: nodes,
        })
    };

    // add graph link & relation
    const handleAddNewLink = (newLink, newRelation) => {
        let link = graph.link.concat();
        link.push(newLink);
        let relations = graph.relations.concat();
        relations.push(newRelation);
        setGraph({
            ...graph,
            link: link,
            relations: relations,
        });
    };

    // modify graph theme style
    const handleModifyGraph = (target, newValue) => {
        setGraph({
            ...graph,
            [target]: newValue
        });
        // console.log(target,' => ',newValue);
    };
    // save the graph theme
    const handleSaveGraphTheme = async () => {
        // 1. update theme to server
        await dispatch(updateGraphTheme({
            jwt: jwt,
            currentOpenMapId: currentKnmMapInfo['_id'],
            currentGraphId: currentOpenGraphInfo['_id'],
            newGraphTheme: graph,
        }));
        // 2. get new knm graph detail
        dispatch(getGraphDetail({
            currentOpenMapId: currentKnmMapInfo['_id'],
            jwt: jwt,
        }))
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
                                        {
                                            knmInfoLoading ? (
                                                <CircularProgress color="secondary" style={{ width: 30, height: 30, margin: '16px 10px' }} />
                                            ) : (
                                                <React.Fragment>
                                                    <Grid item style={{ paddingTop: 14 }}>
                                                        {
                                                            (detailPageKnmInfo.icon && (typeof detailPageKnmInfo.icon !== 'object')) ? (
                                                                <Emoji emoji={detailPageKnmInfo.icon as string} set='twitter' size={24} />
                                                            ) : ''
                                                        }
                                                    </Grid>
                                                    <Grid item>{detailPageKnmInfo.title}</Grid>
                                                </React.Fragment>
                                            )
                                        }
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
                                                    <ListAltIcon />
                                                </Button>
                                            ) : (
                                                <Tooltip title='知识列表视图' arrow>
                                                    <Button
                                                        value="notebookListView"
                                                        aria-label="centered"
                                                        onClick={() => handleSwitchViews('notebookListView')}
                                                    >
                                                        <ListAltIcon />
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
                                                    <BookIcon />
                                                </Button>
                                            ) : (
                                                <Tooltip title='知识笔记视图' arrow>
                                                    <Button
                                                        value="newNotebookView"
                                                        aria-label="centered"
                                                        onClick={() => handleSwitchViews('newNotebookView')}
                                                    >
                                                        <BookIcon />
                                                    </Button>
                                                </Tooltip>
                                            )
                                        }
                                    </ToggleButtonGroup>
                                    {
                                        views === 'graphView' &&
                                        <>
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
                                        </>
                                    }
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
                                        <Grid item style={{ paddingTop: 14 }}>
                                            {
                                                (detailPageKnmInfo.icon && (typeof detailPageKnmInfo.icon !== 'object')) ? (
                                                    <Emoji emoji={detailPageKnmInfo.icon as string} set='twitter' size={24} />
                                                ) : ''
                                            }
                                        </Grid>
                                        <Grid item>{detailPageKnmInfo.title}</Grid>
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
                                        <Fade in={openHiddenToolBar} style={{ display: openHiddenToolBar ? 'flex' : 'none' }}>
                                            <Grid container direction="column" className={classes.hiddenToolBarBtn}>
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
                                                            <ListAltIcon />
                                                        </Button>
                                                    ) : (
                                                        <Tooltip title='知识列表视图' arrow>
                                                            <Button
                                                                value="notebookListView"
                                                                aria-label="centered"
                                                                onClick={() => handleSwitchViews('notebookListView')}
                                                            >
                                                                <ListAltIcon />
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
                                                            <BookIcon />
                                                        </Button>
                                                    ) : (
                                                        <Tooltip title='知识笔记视图' arrow>
                                                            <Button
                                                                value="newNotebookView"
                                                                aria-label="centered"
                                                                onClick={() => handleSwitchViews('newNotebookView')}
                                                            >
                                                                <BookIcon />
                                                            </Button>
                                                        </Tooltip>
                                                    )
                                                }
                                                {
                                                    views === 'graphView' &&
                                                    <>
                                                        <div style={{ borderTop: '1px solid', borderRadius: 0, marginBottom: -35 }}></div>
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
                                                    </>
                                                }
                                            </Grid>
                                        </Fade>
                                    </div>
                                </Paper>
                            </Grid>
                        </Grid>
                    )
                }
            </Paper >
            {/* graph */}
            <div style={{ backgroundColor: currentTheme === 'light' ? '#f7f7f7' : '#1f2733' }}>
                {
                    views === 'graphView' &&
                    <>
                        <KnowledgeGraph
                            nodeData={graph.node}
                            linkData={graph.link}
                            relations={graph.relations}
                            themeColor={graph.themeColor}
                            lineStyleType={graph.lineStyleType}
                            lineStyleColor={graph.lineStyleColor}
                            lineStyleWidth={graph.lineStyleWidth}
                            lineStyleOpacity={graph.lineStyleOpacity}
                            lineStyleCurveness={graph.lineStyleCurveness}
                            labelFontSize={graph.labelFontSize}
                            labelPosition={graph.labelPosition}
                            edgeLabelFontSize={graph.edgeLabelFontSize}
                            layout={graph.layout}
                            forcePower={graph.forcePower}
                            echartsClick={echartsClick}
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
                                        materialColor={materialColor}
                                    />
                                }
                            />
                        }
                        {/* node info edit panel */}
                        {
                            openInfoPanel.linkInfoEditPanel &&
                            <InfoPanel
                                title={'知识关联 | 信息编辑'}
                                handleClosePanel={handleCloseInfoPanel}
                                contain={
                                    <LinkInfoEditPanel
                                        linkName={nodeName}
                                        materialColor={materialColor}
                                    />
                                }
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
                                        handleAddNode={handleAddNode}
                                    />
                                }
                            />
                        }
                        {/* add new link panel */}
                        {
                            openInfoPanel.addNewLinkPanel &&
                            <InfoPanel
                                title={'知识笔记 | 新增知识关联'}
                                handleClosePanel={handleCloseInfoPanel}
                                contain={
                                    <AddNewLinkPanel
                                        handleAddNewLink={handleAddNewLink}
                                    />
                                }
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
                                        currentGraphThemeOption={graph}
                                        graphColorTheme={graphColorTheme}
                                        lineColor={lineColor}
                                        handleModifyGraph={handleModifyGraph}
                                        handleSaveGraphTheme={handleSaveGraphTheme}
                                    />
                                }
                            />
                        }
                    </>
                }
                {
                    views === 'notebookListView' &&
                    <div style={{ padding: '10px 30px' }}>
                        <h1>知识地图信息列表</h1>
                        <FormControl component="fieldset" style={{ marginBottom: 20 }}>
                            <RadioGroup row aria-label="position" name="position" defaultValue="all-notebook">
                                <FormControlLabel value="all-notebook" control={<Radio color="primary" />} label="知识笔记列表" />
                                <FormControlLabel value="all-node" control={<Radio color="primary" />} label="知识节点列表" />
                                <FormControlLabel value="all-link" control={<Radio color="primary" />} label="知识关联列表" />
                            </RadioGroup>
                        </FormControl>
                        <PaginationDataTable
                            header={["笔记标题", "引用", "标签", "时间", "操作"]}
                            rows={rows}
                            buttons={["查看"]}
                            actions={[() => { alert('查看'); }]}
                        />
                    </div>
                }
                {
                    views === 'newNotebookView' &&
                    <div style={{ padding: '10px 30px' }}>
                        <NewNoteBookView />
                    </div>
                }
            </div>
        </>
    )
}
