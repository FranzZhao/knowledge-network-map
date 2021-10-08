import React, { useEffect, useState } from 'react';
// import ECharts
import ReactEchartsCore from 'echarts-for-react/lib/core';
import { GraphChart, } from 'echarts/charts';
import { LegendComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { SVGRenderer } from 'echarts/renderers';

echarts.use(
    [GraphChart, SVGRenderer, LegendComponent]
);

interface KnowledgeGraphState {
    nodeData: any[];
    linkData: any[];
    relations: any[];
    themeMode: 'white' | 'black';
    echartsClick: {};
}

interface ColorThemeState {
    backgroundColor: string;
    lineStyleColor: string;
}

const whiteTheme: ColorThemeState = {
    backgroundColor: '#fafafa',
    lineStyleColor: '#232323',
};

const blackTheme: ColorThemeState = {
    backgroundColor: '#232323',
    lineStyleColor: '#ffffff',
};

const initialOptions = {
    backgroundColor: '#232323',	// 背景颜色
    legend: {
        x: "center",
        show: true,
        data: [],
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

export const KnowledgeGraph: React.FC<KnowledgeGraphState> = ({
    nodeData, linkData, relations, themeMode, echartsClick
}) => {
    let theme: ColorThemeState;
    switch (themeMode) {
        case 'white':
            theme = whiteTheme;
            break;
        case 'black':
            theme = blackTheme;
            break;
        default:
            theme = whiteTheme;
    }

    // echarts option
    const [options, setOptions] = useState(initialOptions);

    // echarts link's label
    const showLinkLabel = (param) => {
        return param.data.value;
    }

    // listener: whether graph had changed
    useEffect(() => {
        let currentOptions = JSON.parse(JSON.stringify(options));
        currentOptions.legend.data = relations;
        currentOptions.series[0].edgeLabel.normal.formatter = showLinkLabel;
        currentOptions.series[0].data = nodeData;
        currentOptions.series[0].links = linkData;
        currentOptions.backgroundColor = theme.backgroundColor;
        currentOptions.series[0].lineStyle.normal.color = theme.lineStyleColor;
        setOptions(currentOptions);
    }, [nodeData, linkData, relations, themeMode]);

    const chart = React.useMemo(() => (
        <ReactEchartsCore
            echarts={echarts}
            option={options}
            style={{
                height: 'calc(100vh - 98px)',
                width: '100%',
                // borderTop: '1px solid #ececec'
            }}
            onEvents={echartsClick}
            lazyUpdate={true}
        />
    ), [options]);

    return (
        <React.Fragment>
            {chart}
        </React.Fragment>
    )
};