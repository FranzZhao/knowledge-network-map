import React, { useEffect, useState } from 'react';
// import customize components
import { BasicDataTable, DialogBox } from '../../../../components/common';
// import MD
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import SaveIcon from '@material-ui/icons/Save';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';

// import Tooltip from '@material-ui/core/Tooltip';
import FormatShapesIcon from '@material-ui/icons/FormatShapes';
// import react-color
import { CirclePicker } from 'react-color';
// import mock data
import { mockTags } from '../../../../settings/mocks/DefaultTags';
import { rows } from '../../../../settings/mocks/DefaultNotebooks';
// import redux
import { useSelector } from '../../../../redux/hooks';
import { useDispatch } from 'react-redux';
import { deleteLink, updateLinkInfo } from '../../../../redux/knm/linkSlice';
import { getGraphDetail } from '../../../../redux/knm/graphSlice';
import { getLinkNotebooks, getNotebookDetail, NotebookSlice } from '../../../../redux/knm/notebookSlice';

const useStyles = makeStyles((theme: Theme) => createStyles({
    toggleBtn: {
        width: '100%',
        "& > *": {
            width: '50%'
        }
    },
    infoPanelTitle: {
        fontSize: '18px !important',
    },
    panelSubTitle: {
        fontSize: 16,
        marginTop: 14,
    },
    infoPanelForms: {
        // marginBottom: theme.spacing(2),
        '&>*': {
            marginBottom: theme.spacing(2),
            width: '100%',
        },
    },
    colorPicker: {
        marginBottom: '0px !important',
    },
}));

interface LinkInfoEditPanelState {
    linkName: string;
    materialColor: any[];
    handleSwitchViews: (newView: string, isOpenSpecificNotebook?: boolean) => void;
    handleCloseInfoPanel: ()=>void;
};

interface LinkInfoState {
    linkId: string;
    linkName: string;
    linkTags: any[];
    linkIntro: string;
    linkSource: string;
    linkTarget: string;
};
export const LinkInfoEditPanel: React.FC<LinkInfoEditPanelState> = ({
    linkName, materialColor, handleSwitchViews, handleCloseInfoPanel
}) => {
    const classes = useStyles();
    const [values, setValues] = useState<LinkInfoState>({
        linkId: '',
        linkName: linkName,
        linkTags: [],
        linkIntro: '',
        linkSource: '',
        linkTarget: '',
    });
    // mark the name of linkStart & linkEnd (which are record the id of ndoe)
    const [linkNodeName, setLinkNodeName] = useState({
        linkStartName: '',
        linkEndName: '',
    });
    const [notebooks, setNotebooks] = useState<any[]>([]);
    const [alignment, setAlignment] = React.useState<string>('info');
    // redux
    const dispatch = useDispatch();
    const currentOpenGraphInfo = useSelector(state => state.graph.currentOpenGraphInfo);
    const jwt = useSelector(state => state.user.token);
    const currentOpenMapInfo = useSelector(state => state.knmMap.currentOpenMapInfo);
    const [nodes, setNodes] = useState<string[]>([]);
    const linkLoading = useSelector(state => state.link.loading);
    const linkDeleteLoading = useSelector(state => state.link.linkDeleteLoading);
    const currentLinkNotebooksList = useSelector(state => state.notebook.currentNotebooksList);

    // get all nodes in the graph
    useEffect(() => {
        let graphNodes: any[] = [];
        currentOpenGraphInfo['nodes'].map(node => {
            graphNodes.push({
                id: node['_id'],
                name: node['name'],
            });
        });
        setNodes(graphNodes);
    }, [currentOpenGraphInfo]);

    // link info setting
    useEffect(() => {
        // get node info base nodeName
        currentOpenGraphInfo['links'].map(link => {
            // console.log(link);
            if (link['name'] === linkName) {
                let sourceName = '';
                let targetName = '';
                currentOpenGraphInfo['nodes'].map(node => {
                    if (node['_id'] === link['source']) {
                        // console.log("source:",node['name']);
                        sourceName = node['name'];
                    }
                    if (node['_id'] === link['target']) {
                        // console.log("target:",node['name']);
                        targetName = node['name'];
                    }
                });
                setLinkNodeName({
                    linkStartName: sourceName,
                    linkEndName: targetName,
                });
                setValues({
                    linkId: link['_id'],
                    linkName: link['name'],
                    linkTags: link['tags'],
                    linkIntro: link['introduction'],
                    linkSource: link['source'],
                    linkTarget: link['target'],
                });
                // get notebook
                dispatch(getLinkNotebooks({
                    jwt: jwt, graphId: currentOpenGraphInfo['_id'], linkId: link["_id"]
                }));
            }
        });
    }, [linkName]);

    // get notebook from current link
    useEffect(() => {
        let newNotebooks: any[] = [];
        currentLinkNotebooksList.map(note => {
            // tags with Clips
            let tagsText: string[] = note['tags'];
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
            // let updateTime = new Date(note['updatedAt']).toLocaleString();
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
                    jwt: jwt, graphId: currentOpenGraphInfo['_id'],
                    target: target, targetId: targetId,
                    notebookId: note['_id'],
                }));
                //newView: string, isOpenSpecificNotebook?: boolean
                handleSwitchViews('newNotebookView', true);
            }
            let button = <Button variant="outlined" color="secondary" size="small" onClick={handleCheckNotebook}>查看</Button>;
            // push into newNotebooks
            newNotebooks.push([
                note['title'],
                note['quotes'],
                tags,
                button
            ]);
        });
        setNotebooks(newNotebooks);
    }, [currentLinkNotebooksList]);

    const handleAlignment = (event, newAlignment) => {
        if (newAlignment !== null) {
            setAlignment(newAlignment);
        }
    };

    // text change
    const handleChangeText = (prop: keyof LinkInfoState) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [prop]: event.target.value
        });
    }


    // handle click update node info
    const handleUpdateKnmInfo = () => {
        // update link info
        // console.log(values);
        dispatch(updateLinkInfo({
            jwt: jwt,
            linkInfo: values,
            graphId: currentOpenGraphInfo['_id'],
            linkId: values.linkId,
        }));
        // update currentOpenGraphInfo
        dispatch(getGraphDetail({
            currentOpenMapId: currentOpenMapInfo['_id'],
            jwt: jwt,
        }));
    };

    const handleNewLinkNotebook = () => {
        // 新建知识笔记
        dispatch(NotebookSlice.actions.createSpecificNotebook({
            createSpecificNotebookRelationType: 'link',
            createSpecificNotebookRelationId: values.linkId
        }));
        handleSwitchViews('newNotebookView');
        // console.log(currentNodeNotebooksList);
    }

    const handleDeleteLink = async () => {
        // close dialog
        await setOpenDialog(false);
        // delete node
        await dispatch(deleteLink({
            jwt: jwt, graphId: currentOpenGraphInfo["_id"], linkId: values.linkId,
        }));
        // close panel
        handleCloseInfoPanel();
        // renew currentOpenGraphInfo
        dispatch(getGraphDetail({
            jwt: jwt,
            currentOpenMapId: currentOpenMapInfo['_id']
        }));
    };

    const [openDialog, setOpenDialog] = useState(false);
    interface DeleteLinkState {
        openDialog: boolean;
        handleCloseDialog: () => void;
    }
    const DeleteLink: React.FC<DeleteLinkState> = ({
        openDialog, handleCloseDialog
    }) => {
        return (
            <DialogBox
                boxSize="xs"
                open={openDialog}
                title={'删除知识关联'}
                contain={
                    <div>请确认是否删除该知识关联？注意！<b style={{ color: 'orange' }}>与该知识节点相关联的知识笔记，将在关联线删除后同时被删除！且删除后无法恢复！</b>若想要更改信息，建议更新知识关联信息。若确认删除，则点击“确认”按钮。</div>
                }
                actions={
                    <>
                        <Button size="small" variant="outlined" color="secondary" onClick={handleCloseDialog}>取消</Button>
                        <Button size="small" variant="text" color="primary" onClick={handleDeleteLink}>确认</Button>
                    </>
                }
            />
        );
    }

    return (
        <React.Fragment>
            <ToggleButtonGroup
                value={alignment}
                exclusive
                onChange={handleAlignment}
                aria-label="text alignment"
                size="small"
                className={classes.toggleBtn}
            >
                <ToggleButton value="info" aria-label="left aligned">
                    <FormatShapesIcon fontSize="small" />
                </ToggleButton>

                <ToggleButton value="notebook" aria-label="centered">
                    <LibraryBooksIcon fontSize="small" />
                </ToggleButton>
            </ToggleButtonGroup>
            {
                alignment === 'info' &&
                <form className={classes.infoPanelForms} noValidate autoComplete="off">
                    <div className={classes.panelSubTitle}>知识关联信息编辑</div>
                    <TextField
                        id="knm-node-name"
                        label="知识关联名称"
                        size="small"
                        value={values.linkName}
                        onChange={handleChangeText('linkName')}
                    />
                    <Autocomplete
                        multiple
                        id="tags-filled"
                        options={mockTags.map((option) => option.title)}
                        value={values.linkTags}
                        freeSolo
                        onChange={(event, newValue) => {
                            setValues({
                                ...values,
                                linkTags: newValue
                            });
                        }}
                        renderTags={(value: string[], getTagProps) => (
                            value.map((option: string, index: number) => (
                                (<Chip variant="default" label={option} size="small" color="primary" {...getTagProps({ index })} />)
                            ))
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder="选择或输入新标签"
                            />
                        )}
                    />
                    <TextField
                        id="knm-node-intro"
                        label="知识关联简介"
                        size="small"
                        value={values.linkIntro}
                        onChange={handleChangeText('linkIntro')}
                        multiline
                    />
                    <Autocomplete
                        value={linkNodeName.linkStartName}
                        onChange={(event, newValue) => {
                            nodes.map(node => {
                                if (node['name'] === newValue) {
                                    setValues({
                                        ...values,
                                        linkSource: node['id']
                                    });
                                    setLinkNodeName({
                                        ...linkNodeName,
                                        linkStartName: node['name']
                                    });
                                }
                            });
                        }}
                        id="controllable-states-demo"
                        options={nodes.map((option) => option['name'])}
                        style={{ width: '100%' }}
                        renderInput={(params) => <TextField {...params} label="起始节点" variant="standard" />}
                    />

                    <Autocomplete
                        value={linkNodeName.linkEndName}
                        onChange={(event, newValue) => {
                            nodes.map(node => {
                                if (node['name'] === newValue) {
                                    setValues({
                                        ...values,
                                        linkTarget: node['id']
                                    });
                                    setLinkNodeName({
                                        ...linkNodeName,
                                        linkEndName: node['name']
                                    });
                                }
                            });
                        }}
                        id="controllable-states-demo"
                        options={nodes.map((option) => option['name'])}
                        style={{ width: '100%' }}
                        renderInput={(params) => <TextField {...params} label="目标节点" variant="standard" />}
                    />
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            style={{width: '48%'}}
                            startIcon={
                                linkLoading ? (
                                    <CircularProgress style={{ width: 20, height: 20, color: 'white' }} />
                                ) : (
                                    <SaveIcon />
                                )
                            }
                            onClick={handleUpdateKnmInfo}
                        >
                            保存关联信息
                        </Button>
                        &nbsp;&nbsp;&nbsp;
                        <Button
                            variant="text"
                            color="secondary"
                            endIcon={
                                linkDeleteLoading ? (
                                    <CircularProgress style={{ width: 20, height: 20, color: 'orange' }} />
                                ) : (
                                    <DeleteIcon />
                                )
                            }
                            style={{ width: '48%' }}
                            onClick={() => setOpenDialog(true)}
                        >
                            删除节点
                        </Button>
                        <DeleteLink
                            openDialog={openDialog}
                            handleCloseDialog={() => setOpenDialog(false)}
                        />
                    </div>
                </form>
            }
            {
                alignment === 'notebook' &&
                <div>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Grid item>
                            <div className={classes.panelSubTitle} style={{ marginBottom: 14, fontSize: 17 }}>{values.linkName} - 笔记列表</div>
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" color="secondary" size="small" onClick={handleNewLinkNotebook}>新建笔记</Button>
                        </Grid>
                    </Grid>
                    {
                        notebooks.length === 0 ? (
                            <h2 style={{ textAlign: 'center', color: 'grey' }}>该知识节点暂无笔记&nbsp;&nbsp;请新建笔记</h2>
                        ) : (
                            <BasicDataTable
                                isSmall={true}
                                header={["笔记标题", "引用", "笔记标签", "操作"]}
                                rows={notebooks}
                            // buttons={['查看']}
                            // actions={[() => { alert('查看笔记'); }]}
                            />
                        )
                    }
                </div>
            }
        </React.Fragment>
    );
};