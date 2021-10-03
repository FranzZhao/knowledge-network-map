import React from 'react';
import ReactECharts from 'echarts-for-react';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import {
    LineChart,
    GraphChart,
} from 'echarts/charts';
import * as echarts from 'echarts/core';
import {
    CanvasRenderer,
    SVGRenderer
} from 'echarts/renderers';

echarts.use(
    [GraphChart, SVGRenderer]
);

export const KNMDetailPage: React.FC = () => {
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
        backgroundColor: '#343434',	// 背景颜色
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
                    color: '#ffffff',          // 颜色
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

    return (
        <>
            <div style={{
                backgroundColor: '#b7b7b7',
                height: '39px',
            }}>这是它的标题</div>
            <ReactEchartsCore
                echarts={echarts}
                option={options}
                style={{ height: 'calc(100vh - 91px)', width: '100%' }}
            />
        </>
    )
}
