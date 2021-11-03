import React, { useEffect, useState } from 'react';
// import MD
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Chip from '@material-ui/core/Chip';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import QueuePlayNextIcon from '@material-ui/icons/QueuePlayNext';
import { CircularProgress } from '@material-ui/core';
// import mock data
import { mockTags } from '../../../../settings/mocks/DefaultTags';
import { relations, nodeData } from '../../../../settings/mocks/DefaultGraph';
// redux
import { useSelector } from '../../../../redux/hooks';
import { useDispatch } from 'react-redux';
import { createLink } from '../../../../redux/knm/linkSlice';
import { getGraphDetail } from '../../../../redux/knm/graphSlice';

const useStyles = makeStyles((theme: Theme) => createStyles({
    infoPanelForms: {
        '&>*': {
            marginBottom: theme.spacing(2),
            width: '100%',
        },
    },
}));

interface AddNewLinkState {
    linkName: string;
    linkTags: any[];
    linkIntro: string;
    linkStart: string;
    linkEnd: string;
}


interface AddNewLinkPanelState {
    handleAddNewLink: (newLink: any, newRelation: any) => void;
}
export const AddNewLinkPanel: React.FC<AddNewLinkPanelState> = ({
    handleAddNewLink
}) => {
    const classes = useStyles();
    const [values, setValues] = useState<AddNewLinkState>({
        linkName: '',
        linkTags: [],
        linkIntro: '',
        linkStart: '',
        linkEnd: '',
    });
    // mark the name of linkStart & linkEnd (which are record the id of ndoe)
    const [linkNodeName, setLinkNodeName] = useState({
        linkStartName: '',
        linkEndName: '',
    });
    const [nodes, setNodes] = useState<any[]>([]);
    // redux
    const dispatch = useDispatch();
    const jwt = useSelector(state => state.user.token);
    const currentOpenGraphInfo = useSelector(state => state.graph.currentOpenGraphInfo);
    const currentOpenMapId = useSelector(state => state.knmMap.currentOpenMapInfo)['_id'];
    const linkLoading = useSelector(state => state.link.loading);

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

    const handleChangeText = (prop: keyof AddNewLinkState) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [prop]: event.target.value
        });
    }

    const handleChangeLinkNodes = (prop: keyof AddNewLinkState) => (event: React.ChangeEvent<{ value: unknown }>) => {
        setValues({
            ...values,
            [prop]: event.target.value as string,
        });
    };

    const handleAddNewLinkClick = async () => {
        // create link to mongodb
        await dispatch(createLink({
            jwt: jwt,
            linkInfo: values,
            graphId: currentOpenGraphInfo['_id'],
        }));
        // update currentOpenGraphInfo
        dispatch(getGraphDetail({
            currentOpenMapId: currentOpenMapId,
            jwt: jwt,
        }));
        // 清空表单内容
        setValues({
            linkName: '',
            linkTags: [],
            linkIntro: '',
            linkStart: '',
            linkEnd: '',
        });
        setLinkNodeName({
            linkStartName: '',
            linkEndName: '',
        })
    };

    return (
        <React.Fragment>
            <form className={classes.infoPanelForms} noValidate autoComplete="off">
                <TextField
                    id="knm-node-name"
                    label="知识关联名称"
                    size="small"
                    value={values.linkName}
                    onChange={handleChangeText('linkName')}
                />
                <Autocomplete
                    style={{ width: '100%', flex: 1, marginBottom: 10 }}
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
                            if (node.name === newValue) {
                                setValues({
                                    ...values,
                                    linkStart: node.id
                                });
                                setLinkNodeName({
                                    ...linkNodeName,
                                    linkStartName: node.name
                                });
                            }
                        });
                    }}
                    id="controllable-states-demo"
                    options={nodes.map((option) => option.name)}
                    style={{ width: '100%' }}
                    renderInput={(params) => <TextField {...params} label="起始节点" variant="standard" />}
                />

                <Autocomplete
                    value={linkNodeName.linkEndName}
                    onChange={(event, newValue) => {
                        nodes.map(node => {
                            if (node.name === newValue) {
                                setValues({
                                    ...values,
                                    linkEnd: node.id
                                });
                                setLinkNodeName({
                                    ...linkNodeName,
                                    linkEndName: node.name
                                });
                            }
                        });
                    }}
                    id="controllable-states-demo"
                    options={nodes.map((option) => option.name)}
                    style={{ width: '100%' }}
                    renderInput={(params) => <TextField {...params} label="目标节点" variant="standard" />}
                />



                {/* <FormControl>
                    <InputLabel id="demo-simple-select-label">起始节点</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={values.linkStart}
                        onChange={handleChangeLinkNodes('linkStart')}
                    >
                        {
                            nodes.map((node, index) => {
                                return (
                                    <MenuItem value={node.id} key={`${node.id}`}>{node.name}</MenuItem>
                                );
                            })
                        }
                    </Select>
                </FormControl>
                <FormControl>
                    <InputLabel id="demo-simple-select-label">目标节点</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={values.linkEnd}
                        onChange={handleChangeLinkNodes('linkEnd')}
                    >
                        {
                            nodes.map((node, index) => {
                                return (
                                    <MenuItem value={node.id} key={`${node.id}`}>{node.name}</MenuItem>
                                );
                            })
                        }
                    </Select>
                </FormControl> */}
                <Button
                    variant="contained"
                    color="primary"
                    endIcon={
                        linkLoading ? (
                            <CircularProgress style={{ width: 20, height: 20, color: 'white' }} />
                        ) : (
                            <QueuePlayNextIcon />
                        )
                    }
                    onClick={handleAddNewLinkClick}
                >
                    新建知识关联
                </Button>
            </form>
        </React.Fragment>
    );
};
