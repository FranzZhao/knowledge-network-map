import React from 'react';
// import ECharts
import ReactEchartsCore from 'echarts-for-react/lib/core';
import { GraphChart, } from 'echarts/charts';
import { LegendComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { SVGRenderer } from 'echarts/renderers';
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
import MoreIcon from '@material-ui/icons/MoreVert';
// import redux
import { useSelector } from '../redux/hooks';


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


echarts.use(
    [GraphChart, SVGRenderer, LegendComponent]
);

export const KNMDetailPage: React.FC = () => {
    const classes = useStyles();
    const currentTheme = useSelector(state => state.changeTheme.currentTheme);
    const mediaWidth = useMediaQuery('(min-width:950px)');
    // echarts
    let node_data = [
        {
            name: "知识点1：函数的求导",
            draggable: true,                // 节点是否可拖拽，只在使用力引导布局的时候有用。
            symbolSize: [100, 100],
            itemStyle: {
                color: '#FF963F'
            },
        }, {
            name: "导数的定义",
            draggable: true,
            symbolSize: [88, 88],
            itemStyle: {
                color: '#FF7275'
            }
        }, {
            name: "定义",
            draggable: true,
            symbolSize: [76, 76],
            itemStyle: {
                color: '#FF7275'
            }
        }, {
            name: "几何意义",
            draggable: true,
            symbolSize: [64, 64],
            itemStyle: {
                color: '#FF7275'
            }
        }, {
            name: "极限和连续",
            draggable: true,
            symbolSize: [55, 55],
            itemStyle: {
                color: '#61B354'
            }
        }, {
            name: "可导性",
            draggable: true,
            symbolSize: [65, 65],
            itemStyle: {
                color: '#61B354'
            }
        }, {
            name: "连续性",
            draggable: true,
            symbolSize: [65, 65],
            itemStyle: {
                color: '#61B354'
            }
        }, {
            name: "求导法则",
            draggable: true,
            symbolSize: [65, 65],
            itemStyle: {
                color: '#4DA0A4'
            }
        }, {
            name: "和差积商求导法",
            draggable: true,
            symbolSize: [65, 65],
            itemStyle: {
                color: '#4DA0A4'
            }
        }, {
            name: "反函数的求导",
            draggable: true,
            symbolSize: [65, 65],
            itemStyle: {
                color: '#4DA0A4'
            }
        }, {
            name: "隐函数的求导",
            draggable: true,
            symbolSize: [65, 65],
            itemStyle: {
                color: '#4DA0A4'
            }
        }, {
            name: "复合函数求导",
            draggable: true,
            symbolSize: [65, 65],
            itemStyle: {
                color: '#5873A8'
            }
        }, {
            name: "知识点2：微分",
            draggable: true,
            symbolSize: [95, 95],
            itemStyle: {
                color: '#9E71ED'
            }
        },
    ];
    let link_data = [
        {
            target: "复合函数求导",
            source: "知识点1：函数的求导",
            value: "关系2"
        }, {
            target: "导数的定义",
            source: "知识点1：函数的求导",
            value: "关系1"
        }, {
            target: "求导法则",
            source: "知识点1：函数的求导",
            value: "关系2"
        }, {
            target: "极限和连续",
            source: "知识点1：函数的求导",
            value: "关系2"
        }, {
            target: "定义",
            source: "导数的定义",
            value: "关系2"
        }, {
            target: "几何意义",
            source: "导数的定义",
            value: "关系1"
        }, {
            target: "可导性",
            source: "极限和连续",
            value: "关系2"
        }, {
            target: "连续性",
            source: "极限和连续",
            value: "关系1"
        }, {
            target: "复合函数求导",
            source: "求导法则",
            value: "关系1"
        }, {
            target: "反函数的求导",
            source: "求导法则",
            value: "关系1"
        }, {
            target: "隐函数的求导",
            source: "求导法则",
            value: "关系1"
        }, {
            target: "和差积商求导法",
            source: "求导法则",
            value: "关系1"
        }, {
            target: "知识点2：微分",
            source: "知识点1：函数的求导",
            value: "关系1"
        },

    ];
    const options = {
        backgroundColor: currentTheme === 'light' ? '#ffffff' : '#191919',	// 背景颜色
        legend: {
            x: "center",
            show: false,
            data: ["关系1", "关系2"]
        },
        series: [{
            type: "graph",              // 系列类型:关系图
            top: '10%',                 // 图表距离容器顶部的距离
            zoom: 1,
            roam: 'move',                 // 是否开启鼠标缩放和平移漫游:'scale','move',true,false
            focusNodeAdjacency: true,   // 移动到节点时突出周边节点与关联
            force: {
                // 力引导布局相关的配置项
                repulsion: 400,            // [ default: 50 ]节点之间的斥力因子(关系对象之间的距离)
                edgeLength: [100, 150]      // [ default: 30 ]边的两个节点之间的距离
            },
            layout: "force",    // 图的布局,none(需提供节点x,y), circular(环形不具), force(力引导图)
            symbol: 'circle',   // 图标形状
            edgeSymbol: ['square', 'arrow'],    //关联线头尾的样式
            lineStyle: {
                // 关联线的样式设置
                normal: {
                    // 深色系时: '#ffffff'; 浅色系时: '#232323'
                    color: currentTheme === 'light' ? '#232323' : '#ffffff',          // 颜色
                    width: 1,               // 线宽
                    type: 'dashed',         // 类型:solid, dashed, dotted
                    opacity: 0.5,           // 图形透明度: 0~1
                    curveness: 0.2          // 曲度: 0~1
                }
            },
            label: {
                // 节点上的标签
                normal: {
                    show: true,             // 是否显示标签
                    position: "inside",     // 标签位置: top,left,right,bottom,inside,inside+(可组合)
                    textStyle: {            // 文本样式
                        fontSize: 14
                    },
                }
            },
            edgeLabel: {
                // 连接线上的标签
                normal: {
                    show: true,
                    textStyle: {
                        fontSize: 14
                    },
                    formatter: function (param) {        // 标签内容
                        return param.data.value;
                    }
                }
            },
            grid: { top: 8, right: 8, bottom: 24, left: 36 },
            data: node_data,
            links: link_data
        }],
    };


    const [openHiddenToolBar, setOpenHiddenToolBar] = React.useState(false);

    const handleOpen = () => {
        setOpenHiddenToolBar(!openHiddenToolBar);
    };

    return (
        <>
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
            <ReactEchartsCore
                echarts={echarts}
                option={options}
                style={{ height: 'calc(100vh - 99px)', width: '100%', borderTop: '1px solid #c4c4c4' }}
            />
        </>
    )
}
