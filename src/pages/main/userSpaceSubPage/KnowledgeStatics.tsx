import React, {useState, useEffect} from 'react'
import { useSelector } from '../../../redux/hooks';
// echarts
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts/core';
import { SVGRenderer } from 'echarts/renderers';
// echarts theme
import shineDark from '../../../components/common/echartsComponents/theme/shine-dark';
import shineLight from '../../../components/common/echartsComponents/theme/shine';

echarts.use(
    [SVGRenderer]
);
// echarts theme
echarts.registerTheme('shineDark', shineDark);
echarts.registerTheme('shineLight', shineLight);

const initBarChartOption = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {},
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01]
    },
    yAxis: {
        type: 'category',
        data: []
    },
    series: [
        {
            name: '知识节点数量',
            type: 'bar',
            data: []
        },
        {
            name: '知识关联数量',
            type: 'bar',
            data: []
        },
        {
            name: '知识笔记数量',
            type: 'bar',
            data: []
        }
    ]
};


export const KnowledgeStatics: React.FC = () => {
    // redux
    const currentTheme = useSelector(state => state.theme.currentTheme);
    const userStatics = useSelector(state => state.user.userStatics);
    // bar chart option state
    const [barChartOption, setBarChartOption] = useState(initBarChartOption);

    useEffect(() => {
        // 1. 获取新的数值
        let yAxisData: any = [];
        let data: any[] = [
            {
                name: '知识节点数量',
                type: 'bar',
                data: []
            },
            {
                name: '知识关联数量',
                type: 'bar',
                data: []
            },
            {
                name: '知识笔记数量',
                type: 'bar',
                data: []
            }
        ];
        userStatics['detail'].map((item: any[]) => {
            yAxisData.push(item['knmName']);
            data[0].data.push(item['nodesNum']);
            data[1].data.push(item['linkNum']);
            data[2].data.push(item['noteNum']);
        });
        // 2. 设定option
        setBarChartOption({
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {},
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01]
            },
            yAxis: {
                type: 'category',
                data: yAxisData,
            },
            series: data,
        });
    }, [userStatics]);


    return (
        <React.Fragment>
            <h2>知识统计</h2>
            {/* 
                知识标签统计: 柱状图
                时间统计: 类似github的日历热力图或时序折线图, 如记录登录次数? 在线时长? 操作次数? 
            */}
            <ReactECharts
                echarts={echarts}
                option={barChartOption}
                style={{ height: 500 }}
                theme={currentTheme === 'light' ? 'shineLight' : 'shineDark'}
            />
        </React.Fragment>
    )
}

