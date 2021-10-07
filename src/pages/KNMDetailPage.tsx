import React, { useEffect, useState } from 'react';
// import customize components
import { KnowledgeGraph, InfoPanel } from '../components/common';
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
import FormatColorFillIcon from '@material-ui/icons/FormatColorFill';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import AssignmentIcon from '@material-ui/icons/Assignment';
import MoreIcon from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import SaveIcon from '@material-ui/icons/Save';

import Autocomplete from '@material-ui/lab/Autocomplete';
import Chip from '@material-ui/core/Chip';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

// import redux
import { useSelector } from '../redux/hooks';
// import mock data
import { nodeData, linkData, relations } from '../settings/mocks/DefaultGraph';
import { rows } from '../settings/mocks/DefaultNotebooks';
import { mockTags } from '../settings/mocks/DefaultTags';

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
    infoPanel: {
        flex: 'flow',
        position: 'fixed',
        top: 97,
        right: 0,
        padding: 20,
        backgroundColor: theme.palette.type === "light" ? '#e3eded' : '#303030',
        width: 400,
        height: 'calc(100vh - 97px)',
        borderRadius: 0,
        boxShadow: 'none',
        overflow: 'hidden',
        "&:hover": {
            paddingRight: 15,
            overflow: 'auto',
            '&::-webkit-scrollbar': {
                width: 5,
                backgroundColor: theme.palette.type === 'light' ? '#e3eded' : '#424242',
            },
            '&::-webkit-scrollbar-thumb': {
                background: theme.palette.type === 'light' ? '#ffb74d' : '#707070b3',
                borderRadius: '8px',
            },
        },
    },
    infoPanelTitle: {
        fontSize: '18px !important',
    },
    infoPanelCloseBtn: {
        marginTop: 3,
        "&:hover": {
            cursor: 'pointer',
            color: theme.palette.error.main,
        }
    },
    infoPanelForms: {
        // marginBottom: theme.spacing(2),
        '&>*': {
            marginBottom: theme.spacing(2),
            width: '100%',
        },
    },
    tableContainer: {
        overflow: 'auto',
        '&::-webkit-scrollbar': {
            height: 5,
            backgroundColor: theme.palette.type === 'light' ? '#ffffff' : '#424242',
        },
        '&::-webkit-scrollbar-thumb': {
            background: theme.palette.type === 'light' ? '#c2c2c2' : '#707070b3',
            borderRadius: '6px',
        },
    },
    table: {
        minWidth: 650,
    },
    tableHead: {
        backgroundColor: theme.palette.primary.dark,
        "& *": {
            color: theme.palette.common.white,
        }
    },
    tableBody: {
        "&>*:hover": {
            backgroundColor: theme.palette.action.hover,
        },
    },
}));

/**
 * * Node Info Edit Panel
 */
const NodeInfoEditPanel = () => {

};

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
     * Components State
     */
    // graph edit tool bar
    const [openHiddenToolBar, setOpenHiddenToolBar] = useState(false);
    // node & link info panel: graph basic info + new node + new link + modify node or link info + ...
    const [openInfoPanel, setOpenInfoPanel] = useState(false);
    const [nodeName, setNodeName] = useState('');   // node name show in InfoPanel
    // Auto Complete Chip
    interface ValueState {
        selectedTables: any[];
    };
    const [values, setValues] = useState<ValueState>({
        selectedTables: [mockTags[0]],
    });
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

    // handle graph elements click
    const echartsClick = {
        'click': (e) => {
            if (e.name) {
                console.log(e);
                setNodeName(e.name);
                setOpenInfoPanel(true);
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
                                            <Button value="center" aria-label="centered" onClick={addNode}>
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
                                            onClick={handleToolBarOpen}
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
                nodeData={graph.node}
                linkData={graph.link}
                relations={graph.relations}
                themeMode={currentTheme === 'light' ? 'white' : 'black'}
                echartsClick={echartsClick}
            />
            {/* info edit panel */}
            {
                openInfoPanel &&
                <InfoPanel 
                    title={'知识节点 | 信息编辑'}
                    handleClosePanel={() => setOpenInfoPanel(false)}
                >
                    <form className={classes.infoPanelForms} noValidate autoComplete="off">
                        <TextField
                            id="knm-node-name"
                            label="知识节点名称"
                            // variant="outlined" 
                            size="small"
                            value={nodeName}
                        />
                        <Autocomplete
                            multiple
                            id="knm-node-tags"
                            value={values.selectedTables}
                            onChange={(event, newValue) => {
                                setValues({
                                    ...values,
                                    selectedTables: [
                                        ...newValue,
                                    ]
                                });
                            }}
                            options={mockTags}
                            getOptionLabel={(option) => option.title}
                            renderTags={(tagValue, getTagProps) =>
                                tagValue.map((option, index) => (
                                    <Chip
                                        label={option.title}
                                        color={"primary"}
                                        variant={"outlined"}
                                        size="small"
                                        {...getTagProps({ index })}
                                    />
                                ))
                            }
                            // style={{ width: 500 }}
                            renderInput={(params) => (
                                <TextField {...params} label="基础数据表" />
                            )}
                        />
                        <TextField
                            id="knm-node-intro"
                            label="知识节点简介"
                            // variant="outlined" 
                            size="small"
                            defaultValue="这是一段关于“函数的求导”节点的信息简介..."
                            multiline
                        // rows={4}
                        />
                        <TextField
                            id="knm-node-style"
                            label="知识节点样式选择"
                            // variant="outlined" 
                            size="small"
                            defaultValue="默认样式"
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<SaveIcon />}
                        >
                            保存节点信息
                        </Button>
                    </form>
                    <Divider style={{ marginBottom: 10 }} />
                    <Typography
                        variant="h6" gutterBottom
                        className={classes.infoPanelTitle}
                    >知识节点 | 笔记列表</Typography>
                    <TableContainer component={Paper} className={classes.tableContainer}>
                        <Table
                            className={classes.table}
                            aria-label="simple table"
                            size="small"
                        >
                            <TableHead className={classes.tableHead}>
                                <TableRow>
                                    <TableCell>#</TableCell>
                                    <TableCell>笔记标题</TableCell>
                                    <TableCell>引用</TableCell>
                                    <TableCell>笔记标签</TableCell>
                                    <TableCell>更新时间</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody className={classes.tableBody}>
                                {rows.map((row, index) => (
                                    <TableRow key={`${row.title}-${index}`}>
                                        <TableCell component="th" scope="row">{index + 1}</TableCell>
                                        <TableCell>{row.title}</TableCell>
                                        <TableCell>{row.quote}</TableCell>
                                        <TableCell>{row.tags}</TableCell>
                                        <TableCell>{row.time}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </InfoPanel>
            }
        </>
    )
}
