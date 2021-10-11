export let relations = [
    "关系1",
    "关系2",
];

export let nodeData = [
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

export let linkData = [
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