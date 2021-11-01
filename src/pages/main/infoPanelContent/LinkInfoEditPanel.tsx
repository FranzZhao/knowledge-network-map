import React, { useEffect, useState } from 'react';
// import customize components
import { BasicDataTable } from '../../../components/common';
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
// import Tooltip from '@material-ui/core/Tooltip';
import FormatShapesIcon from '@material-ui/icons/FormatShapes';
// import react-color
import { CirclePicker } from 'react-color';
// import mock data
import { mockTags } from '../../../settings/mocks/DefaultTags';
import { rows } from '../../../settings/mocks/DefaultNotebooks';
// import redux
import { useSelector } from '../../../redux/hooks';
import { useDispatch } from 'react-redux';
import { updateLinkInfo } from '../../../redux/knm/linkSlice';
import { getGraphDetail } from '../../../redux/knm/graphSlice';
import { getLinkNotebooks } from '../../../redux/knm/notebookSlice';

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
    linkName, materialColor
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
    const [notebooks, setNotebooks] = useState<any[]>([]);
    const [alignment, setAlignment] = React.useState<string>('info');
    // redux
    const dispatch = useDispatch();
    const currentOpenGraphInfo = useSelector(state => state.graph.currentOpenGraphInfo);
    const jwt = useSelector(state => state.user.token);
    const currentOpenMapInfo = useSelector(state => state.knmMap.currentOpenMapInfo);
    const [nodes, setNodes] = useState<string[]>([]);
    const linkLoading = useSelector(state => state.link.loading);
    const currentLinkNotebooksList = useSelector(state => state.notebook.currentNotebooksList);

    // link info setting
    useEffect(() => {
        // get node info base nodeName
        currentOpenGraphInfo['links'].map(link => {
            if (link['name'] === linkName) {
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
            // push into newNotebooks
            newNotebooks.push([
                note['title'],
                note['quotes'],
                tags,
                // updateTime,
            ]);
        });
        setNotebooks(newNotebooks);
    }, [currentLinkNotebooksList]);

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

    // node size select
    // const handleChangeNodeSize = (event: React.ChangeEvent<{ value: unknown }>) => {
    //     setValues({
    //         ...values,
    //         linkSize: event.target.value as string,
    //     });
    // };


    // handle click update node info
    const handleUpdateKnmInfo = () => {
        // update link info
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
                    <FormControl>
                        <InputLabel id="demo-simple-select-label">起始节点</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={values.linkSource}
                        // onChange={handleChangeNodeSize}
                        >
                            {
                                nodes.map(node => {
                                    return <MenuItem value={node['id']} key={node['id']}>{node['name']}</MenuItem>
                                })
                            }
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel id="demo-simple-select-label">目标节点</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select-1"
                            value={values.linkTarget}
                        // onChange={handleChangeNodeSize}
                        >
                            {
                                nodes.map(node => {
                                    return <MenuItem value={node['id']} key={node['id']}>{node['name']}</MenuItem>
                                })
                            }
                        </Select>
                    </FormControl>
                    <Button
                        variant="contained"
                        color="primary"
                        endIcon={
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
                            <Button variant="outlined" color="secondary" size="small">新建笔记</Button>
                        </Grid>
                    </Grid>
                    {
                        notebooks.length === 0 ? (
                            <h2 style={{textAlign: 'center', color: 'grey'}}>该知识节点暂无笔记&nbsp;&nbsp;请新建笔记</h2>
                        ) : (
                            <BasicDataTable
                                isSmall={true}
                                header={["笔记标题", "引用", "笔记标签", "操作"]}
                                rows={notebooks}
                                buttons={['查看']}
                                actions={[() => { alert('查看笔记'); }]}
                            />
                        )
                    }
                </div>
            }
        </React.Fragment>
    );
};