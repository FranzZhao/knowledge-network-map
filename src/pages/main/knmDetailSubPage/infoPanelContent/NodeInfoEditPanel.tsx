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
import NoteAddIcon from '@material-ui/icons/NoteAdd';
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
import { updateNodeInfo, deleteNode } from '../../../../redux/knm/nodeSlice';
import { getGraphDetail } from '../../../../redux/knm/graphSlice';
import { getNodeNotebooks, getNotebookDetail } from '../../../../redux/knm/notebookSlice';
import { NotebookSlice } from '../../../../redux/knm/notebookSlice';

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

interface NodeInfoEditPanelState {
    nodeName: string;
    materialColor: any[];
    handleSwitchViews: (newView: string, isOpenSpecificNotebook?: boolean) => void;
    handleCloseInfoPanel: ()=>void;
};

interface NodeInfoState {
    nodeId: string;
    nodeName: string;
    nodeTags: any[];
    nodeIntro: string;
    nodeSize: string;
    nodeColor: string;
};
export const NodeInfoEditPanel: React.FC<NodeInfoEditPanelState> = ({
    nodeName, materialColor, handleSwitchViews, handleCloseInfoPanel
}) => {
    const classes = useStyles();
    const [values, setValues] = useState<NodeInfoState>({
        nodeId: '',
        nodeName: nodeName,
        nodeTags: [],
        nodeIntro: '',
        nodeSize: '',
        nodeColor: materialColor[0],
    });
    const [notebooks, setNotebooks] = useState<any[]>([]);
    const [alignment, setAlignment] = React.useState<string>('info');
    // redux
    const dispatch = useDispatch();
    const currentOpenGraphInfo = useSelector(state => state.graph.currentOpenGraphInfo);
    const jwt = useSelector(state => state.user.token);
    const currentOpenMapInfo = useSelector(state => state.knmMap.currentOpenMapInfo);
    const nodeLoading = useSelector(state => state.node.loading);
    const nodeDeleteLoading = useSelector(state => state.node.deleteLoading);
    const currentNodeNotebooksList = useSelector(state => state.notebook.currentNotebooksList);

    // get current node info base nodeName
    useEffect(() => {
        currentOpenGraphInfo['nodes'].map(node => {
            if (node['name'] === nodeName) {
                setValues({
                    nodeId: node["_id"],
                    nodeName: node["name"],
                    nodeTags: node["tags"],
                    nodeIntro: node["introduction"],
                    nodeSize: node["size"],
                    nodeColor: node["color"],
                });
                // get notebook
                dispatch(getNodeNotebooks({
                    jwt: jwt, graphId: currentOpenGraphInfo['_id'], nodeId: node["_id"]
                }));
            }
        });
    }, [nodeName]);

    // get notebook from current node
    useEffect(() => {
        let newNotebooks: any[] = [];
        currentNodeNotebooksList.map(note => {
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
            let button = <Button key={note['_id']} variant="outlined" color="secondary" size="small" onClick={handleCheckNotebook}>查看</Button>;

            // push into newNotebooks
            newNotebooks.push([
                note['title'],
                note['quotes'],
                tags,
                button
            ]);
        });
        setNotebooks(newNotebooks);
    }, [currentNodeNotebooksList]);

    // 新建知识笔记
    const handleNewNodeNotebook = async () => {
        dispatch(NotebookSlice.actions.createSpecificNotebook({
            createSpecificNotebookRelationType: 'node',
            createSpecificNotebookRelationId: values.nodeId
        }));
        handleSwitchViews('newNotebookView');
        // console.log(currentNodeNotebooksList);
    }

    const handleAlignment = (event, newAlignment) => {
        if (newAlignment !== null) {
            setAlignment(newAlignment);
        }
    };

    // text change
    const handleChangeText = (prop: keyof NodeInfoState) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [prop]: event.target.value
        });
    }

    // node size select
    const handleChangeNodeSize = (event: React.ChangeEvent<{ value: unknown }>) => {
        setValues({
            ...values,
            nodeSize: event.target.value as string,
        });
    };

    // node color select
    const handleChangeNodeColor = (newNodeColor, event) => {
        setValues({
            ...values,
            nodeColor: newNodeColor.hex
        });
    };

    // handle click update node info
    const handleUpdateKnmInfo = () => {
        // console.log(values);
        // console.log(currentOpenGraphInfo);
        dispatch(updateNodeInfo({
            jwt: jwt,
            nodeInfo: values,
            graphId: currentOpenGraphInfo["_id"],
            nodeId: values.nodeId,
        }));
        // update currentOpenGraphInfo
        dispatch(getGraphDetail({
            currentOpenMapId: currentOpenMapInfo["_id"],
            jwt: jwt,
        }));
    };

    // delete node
    const handleDeleteNode = async () => {
        // close dialog
        await setOpenDialog(false);
        // delete node
        await dispatch(deleteNode({
            jwt: jwt, graphId: currentOpenGraphInfo["_id"], nodeId: values.nodeId,
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
    interface DeleteNodeState {
        openDialog: boolean;
        handleCloseDialog: () => void;
    }
    const DeleteNode: React.FC<DeleteNodeState> = ({
        openDialog, handleCloseDialog
    }) => {
        return (
            <DialogBox
                boxSize="xs"
                open={openDialog}
                title={'删除知识节点'}
                contain={
                    <div>请确认是否删除该知识节点？注意！<b style={{ color: 'orange' }}>与该知识节点相关联的知识笔记和知识关联，将在节点删除后同时被删除！且删除后无法恢复！</b>若想要更改信息，建议更新节点信息。若确认删除，则点击“确认”按钮。</div>
                }
                actions={
                    <>
                        <Button size="small" variant="outlined" color="secondary" onClick={handleCloseDialog}>取消</Button>
                        <Button size="small" variant="text" color="primary" onClick={handleDeleteNode}>确认</Button>
                    </>
                }
            />
        );
    };

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
                    <div className={classes.panelSubTitle}>节点信息编辑</div>
                    <TextField
                        id="knm-node-name"
                        label="知识节点名称"
                        size="small"
                        value={values.nodeName}
                        onChange={handleChangeText('nodeName')}
                    />
                    <Autocomplete
                        multiple
                        id="tags-filled"
                        options={mockTags.map((option) => option.title)}
                        value={values.nodeTags}
                        freeSolo
                        onChange={(event, newValue) => {
                            setValues({
                                ...values,
                                nodeTags: newValue
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
                        label="知识节点简介"
                        size="small"
                        value={values.nodeIntro}
                        onChange={handleChangeText('nodeIntro')}
                        multiline
                    />
                    <FormControl>
                        <InputLabel id="demo-simple-select-label">节点大小</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={values.nodeSize}
                            onChange={handleChangeNodeSize}
                        >
                            <MenuItem value={55}>小</MenuItem>
                            <MenuItem value={64}>较小</MenuItem>
                            <MenuItem value={76}>适中</MenuItem>
                            <MenuItem value={88}>较大</MenuItem>
                            <MenuItem value={100}>大</MenuItem>
                        </Select>
                    </FormControl>
                    <div>节点颜色</div>
                    <CirclePicker
                        className={classes.colorPicker}
                        color={values.nodeColor}
                        onChangeComplete={handleChangeNodeColor}
                        colors={materialColor}
                        circleSize={20}
                        width={'350px'}
                    />
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            style={{ width: '48%' }}
                            startIcon={
                                nodeLoading ? (
                                    <CircularProgress style={{ width: 20, height: 20, color: 'white' }} />
                                ) : (
                                    <SaveIcon />
                                )
                            }
                            onClick={handleUpdateKnmInfo}
                        >
                            保存节点信息
                        </Button>
                        &nbsp;&nbsp;&nbsp;
                        <Button
                            variant="text"
                            color="secondary"
                            endIcon={
                                nodeDeleteLoading ? (
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
                        <DeleteNode
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
                            <div className={classes.panelSubTitle} style={{ marginBottom: 14, fontSize: 17 }}>{values.nodeName} - 笔记列表</div>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="text"
                                color="secondary"
                                size="small"
                                onClick={handleNewNodeNotebook}
                                startIcon={<NoteAddIcon />}
                            >新建笔记</Button>
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