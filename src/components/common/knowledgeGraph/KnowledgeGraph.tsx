import React, { useEffect, useState } from 'react';
// import MD
import { CircularProgress } from '@material-ui/core';
// redux
import { useSelector } from '../../../redux/hooks';
// import ECharts
import ReactEchartsCore from 'echarts-for-react/lib/core';
import { GraphChart, } from 'echarts/charts';
import { LegendComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { SVGRenderer } from 'echarts/renderers';


echarts.use(
    [GraphChart, SVGRenderer, LegendComponent]
);

const initialOptions = {
    backgroundColor: '',	// 背景颜色
    legend: {
        x: "center",
        show: true,
        data: [],
    },
    series: [{
        type: "graph",              // 系列类型:关系图
        top: '10%',                 // 图表距离容器顶部的距离
        zoom: 1,
        roam: true,                 // 是否开启鼠标缩放和平移漫游:'scale','move',true,false
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
                color: '#232323',          // 颜色
                width: 1.6,               // 线宽
                type: 'dashed',         // 类型:solid, dashed, dotted
                opacity: 1,           // 图形透明度: 0~1
                curveness: 0.2,          // 曲度: 0~1
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
        data: [],
        links: []
    }],
};

interface KnowledgeGraphState {
    nodeData: any[];
    linkData: any[];
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
    echartsClick: {};
};

export const KnowledgeGraph: React.FC<KnowledgeGraphState> = ({
    nodeData, linkData, relations,
    themeColor, lineStyleType, lineStyleColor, lineStyleWidth, lineStyleOpacity, lineStyleCurveness,
    labelFontSize, labelPosition, edgeLabelFontSize, layout, forcePower, echartsClick,
}) => {
    // redux
    const graphLoading = useSelector(state => state.graph.loading);
    // echarts option
    const [options, setOptions] = useState(initialOptions);

    // echarts link's label
    const showLinkLabel = (param) => {
        return param.data.value;
    }
    
    // listener: whether graph had changed
    useEffect(() => {
        // deep copy
        let currentOptions = JSON.parse(JSON.stringify(options));
        // assignment
        currentOptions.series[0].data = nodeData;
        currentOptions.series[0].links = linkData;
        currentOptions.legend.data = relations;
        currentOptions.backgroundColor = themeColor;
        currentOptions.series[0].lineStyle.normal.type = lineStyleType;
        currentOptions.series[0].lineStyle.normal.color = lineStyleColor;
        currentOptions.series[0].lineStyle.normal.width = lineStyleWidth;
        currentOptions.series[0].lineStyle.normal.opacity = lineStyleOpacity;
        currentOptions.series[0].lineStyle.normal.curveness = lineStyleCurveness;
        currentOptions.series[0].label.normal.textStyle.fontSize = labelFontSize;
        currentOptions.series[0].label.normal.position = labelPosition;
        currentOptions.series[0].edgeLabel.normal.textStyle.fontSize = edgeLabelFontSize;
        currentOptions.series[0].edgeLabel.normal.formatter = showLinkLabel;
        currentOptions.series[0].layout = layout;
        currentOptions.series[0].force.repulsion = forcePower * 10;
        // set State
        setOptions(currentOptions);
    }, [
        nodeData, linkData, relations, themeColor, lineStyleType, lineStyleColor,
        lineStyleWidth, lineStyleOpacity, lineStyleCurveness,
        labelFontSize, labelPosition, edgeLabelFontSize, layout, forcePower,
    ]);

    const chart = React.useMemo(() => (
        <ReactEchartsCore
            echarts={echarts}
            option={options}
            style={{
                height: 'calc(100vh - 98px)',
                width: '100%',
            }}
            onEvents={echartsClick}
            // lazyUpdate={true}
        />
    ), [options]);

    return (
        <React.Fragment>
            {
                graphLoading ? (
                    <div style={{ display: 'flex', height: 'calc(100vh - 97px)' }}>
                        <CircularProgress color="secondary" style={{ margin: 'auto', width: 60, height: 60 }} />
                    </div>
                ) : (
                    chart
                )
            }
        </React.Fragment>
    )
};
