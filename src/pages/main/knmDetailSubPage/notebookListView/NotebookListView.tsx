import React, { useState, useEffect } from 'react';
// import MD
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Skeleton from '@material-ui/lab/Skeleton';
import Radio from '@material-ui/core/Radio';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
// import customize components
import { PaginationDataTable } from '../../../../components/common';
// import redux
import { useDispatch } from 'react-redux';
import { useSelector } from '../../../../redux/hooks';
import { findAllMapNodes } from '../../../../redux/knm/nodeSlice';
import { findAllMapLinks } from '../../../../redux/knm/linkSlice';
import { getMapNotebooks } from '../../../../redux/knm/notebookSlice';
import { getNotebookDetail } from '../../../../redux/knm/notebookSlice';

interface NotebookListViewState {
    handleSwitchViews: (newView: string, isOpenSpecificNotebook?: boolean) => void;
}
export const NotebookListView: React.FC<NotebookListViewState> = ({
    handleSwitchViews
}) => {
    // redux
    const dispatch = useDispatch();
    const jwt = useSelector(state => state.user.token);
    const currentOpenGraphId = useSelector(state => state.graph.currentOpenGraphInfo)['_id'];
    const notebooksLoading = useSelector(state => state.notebook.loading);
    const nodesLoading = useSelector(state => state.node.loading);
    const linksLoading = useSelector(state => state.link.loading);
    // graph notebooks values
    const [notebooks, setNotebooks] = useState<any[]>([]);
    const [nodes, setNodes] = useState<any[]>([]);
    const [links, setLinks] = useState<any[]>([]);
    const [selected, setSelected] = useState('all-notebook');

    // get all notebook
    const handleFindMapNotebooks = async () => {
        const res = await dispatch(getMapNotebooks({
            jwt: jwt, graphId: currentOpenGraphId
        }));
        return res['payload'];
    }

    // get all nodes
    const handleFindMapNodes = async () => {
        const res = await dispatch(findAllMapNodes({
            jwt: jwt, graphId: currentOpenGraphId
        }));
        return res['payload'];
    }

    // get all links
    const handleFindMapLinks = async () => {
        const res = await dispatch(findAllMapLinks({
            jwt: jwt, graphId: currentOpenGraphId
        }));
        return res['payload'];
    }

    // get all notebook from current map
    useEffect(() => {
        if (selected === 'all-notebook') {
            handleFindMapNotebooks().then(res => {
                let allNotebooks: any[] = [];
                res['currentNotebooksList'].map(note => {
                    // tags with Clips
                    let tagsText: string[] = note['tags'];
                    let tags = (
                        <React.Fragment>
                            {
                                tagsText.map((tag, index) => (
                                    <React.Fragment key={`tag-${index}`}>
                                        <Chip label={tag} color="secondary" size="small" variant="default" />&nbsp;
                                    </React.Fragment>
                                ))
                            }
                        </React.Fragment>
                    );
                    // time format change
                    let updateTime = new Date(note['updatedAt']).toLocaleString();
                    // click button with much more func
                    const handleCheckNotebook = async () => {
                        // console.log(note);
                        let target;
                        let targetId;
                        if (note['relationNode']) {
                            target = 'node';
                            targetId = note['relationNode'];
                        }
                        if (note['relationLink']) {
                            target = 'link';
                            targetId = note['relationLink'];
                        }
                        // console.log(target,' => ',targetId);
                        await dispatch(getNotebookDetail({
                            jwt: jwt, graphId: currentOpenGraphId,
                            target: target, targetId: targetId,
                            notebookId: note['_id'],
                        }));
                        //newView: string, isOpenSpecificNotebook?: boolean
                        handleSwitchViews('newNotebookView', true);
                    }
                    let button = <Button variant="outlined" color="secondary" onClick={handleCheckNotebook}>查看</Button>;
                    // push into allNotebooks
                    allNotebooks.push([
                        note['title'],
                        note['quotes'],
                        tags,
                        updateTime,
                        button,
                    ]);
                });
                setNotebooks(allNotebooks);
            });
        }
        if (selected === 'all-node') {
            handleFindMapNodes().then(res => {
                let allNodes: any[] = [];
                res['currentNodesList'].map(node => {
                    // tags with Clips
                    let tagsText: string[] = node['tags'];
                    let tags = (
                        <React.Fragment>
                            {
                                tagsText.map((tag, index) => (
                                    <React.Fragment key={`tag-${index}`}>
                                        <Chip label={tag} color="secondary" size="small" variant="outlined" />&nbsp;
                                    </React.Fragment>
                                ))
                            }
                        </React.Fragment>
                    );
                    let updateTime = new Date(node['updatedAt']).toLocaleString();
                    allNodes.push([
                        node['name'],
                        tags,
                        node['introduction'],
                        updateTime,
                    ]);
                });
                // console.log(allNodes);
                setNodes(allNodes);
            });
        }
        if (selected === 'all-link') {
            handleFindMapLinks().then(res => {
                let allLinks: any[] = [];
                res['currentLinksList'].map(link => {
                    // tags with Clips
                    let tagsText: string[] = link['tags'];
                    let tags = (
                        <React.Fragment>
                            {
                                tagsText.map((tag, index) => (
                                    <React.Fragment key={`tag-${index}`}>
                                        <Chip label={tag} color="secondary" size="small" variant="outlined" />&nbsp;
                                    </React.Fragment>
                                ))
                            }
                        </React.Fragment>
                    );
                    let updateTime = new Date(link['updatedAt']).toLocaleString();
                    allLinks.push([
                        link['name'],
                        tags,
                        link['source']['name'],
                        link['target']['name'],
                        updateTime,
                    ]);
                });
                // console.log(allLinks);
                setLinks(allLinks);
            });
        }
    }, [selected]);

    // get all node from current map


    // get all link from current map

    const handleChangeSelected = async (event) => {
        setSelected(event.target.value);
    }

    return (
        <React.Fragment>
            <h1>知识地图信息列表</h1>
            <FormControl component="fieldset" style={{ marginBottom: 20 }}>
                <RadioGroup row aria-label="view" name="view" value={selected} onChange={handleChangeSelected}>
                    <FormControlLabel value="all-notebook" control={<Radio color="primary" />} label="知识笔记列表" />
                    <FormControlLabel value="all-node" control={<Radio color="primary" />} label="知识节点列表" />
                    <FormControlLabel value="all-link" control={<Radio color="primary" />} label="知识关联列表" />
                </RadioGroup>
            </FormControl>
            {
                selected === 'all-notebook' && (
                    notebooksLoading ? (
                        <Skeleton variant="rect" width={'100%'} height={400} style={{ opacity: 0.3 }} />
                    ) : (
                        notebooks.length === 0 ? (
                            <h1 style={{ textAlign: 'center', color: 'grey', userSelect: 'none' }}>该知识地图暂无知识笔记，请在知识节点或知识关联上新建笔记！</h1>
                        ) : (
                            <PaginationDataTable
                                header={["笔记标题", "引用", "标签", "更新时间", "操作"]}
                                rows={notebooks}
                            />
                        )
                    )
                )
            }
            {
                selected === "all-node" && (
                    nodesLoading ? (
                        <Skeleton variant="rect" width={'100%'} height={400} style={{ opacity: 0.3 }} />
                    ) : (
                        nodes.length === 0 ? (
                            <h1 style={{ textAlign: 'center', color: 'grey', userSelect: 'none' }}>该知识地图暂无知识笔记，请在知识节点或知识关联上新建笔记！</h1>
                        ) : (
                            <PaginationDataTable
                                header={["知识节点名称", "标签", "简介", "更新时间"]}
                                rows={nodes}
                            // buttons={["查看"]}
                            // actions={[() => { alert('查看'); }]}
                            />
                        )
                    )
                )
            }
            {
                selected === "all-link" && (
                    linksLoading ? (
                        <Skeleton variant="rect" width={'100%'} height={400} style={{ opacity: 0.3 }} />
                    ) : (
                        links.length === 0 ? (
                            <h1 style={{ textAlign: 'center', color: 'grey', userSelect: 'none' }}>该知识地图暂无知识笔记，请在知识节点或知识关联上新建笔记！</h1>
                        ) : (
                            <PaginationDataTable
                                header={["知识关联名称", "标签", "起始节点", "目标节点", "更新时间"]}
                                rows={links}
                            // buttons={["查看"]}
                            // actions={[() => { alert('查看'); }]}
                            />
                        )
                    )

                )
            }
        </React.Fragment>
    )
}
