import React from 'react';
import { InfoPanel, KnowledgeGraph } from '../../../../components/common';
import { AddNewLinkPanel, AddNewNodePanel, GraphBasicInfoEditPanel, LinkInfoEditPanel, ModifyGraphThemePanel, NodeInfoEditPanel } from '../infoPanelContent';

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

interface OpenInfoPanelState {
    graphBasicInfoEditPanel: boolean,
    addNewNodePanel: boolean,
    addNewLinkPanel: boolean,
    modifyGraphThemePanel: boolean,
    nodeInfoEditPanel: boolean,
    linkInfoEditPanel: boolean,
}

interface GraphViewState {
    graph: KnowledgeGraphState;
    echartsClick: {};
    openInfoPanel: OpenInfoPanelState;
    nodeName: string;
    materialColor: string[];
    graphColorTheme: string[];
    lineColor: string[];
    handleCloseInfoPanel: () => {};
    handleAddNode: (newNode: any) => void;
    handleAddNewLink: (newLink: any, newRelation: any) => void;
    handleModifyGraph: (target: string, newValue: any) => void;
    handleSaveGraphTheme: () => {};
    handleSwitchViews: (newView: string, isOpenSpecificNotebook?: boolean)=>void;
};

export const GraphView: React.FC<GraphViewState> = ({
    graph, echartsClick, openInfoPanel, nodeName,
    materialColor, graphColorTheme, lineColor,
    handleCloseInfoPanel, handleAddNode, handleAddNewLink,
    handleModifyGraph, handleSaveGraphTheme,
    handleSwitchViews
}) => {
    return (
        <React.Fragment>
            {/* Graph */}
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
                            handleSwitchViews={handleSwitchViews}
                            handleCloseInfoPanel={handleCloseInfoPanel}
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
                            handleSwitchViews={handleSwitchViews}
                            handleCloseInfoPanel={handleCloseInfoPanel}
                        />
                    }
                />
            }
            {/* graph info edit panel */}
            {
                openInfoPanel.graphBasicInfoEditPanel &&
                <InfoPanel
                    title={'知识地图 | 基础信息'}
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
                    title={'知识地图 | 新增知识节点'}
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
                    title={'知识地图 | 新增知识关联'}
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
                    title={'知识地图 | 修改主题样式'}
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
        </React.Fragment>
    )
}
