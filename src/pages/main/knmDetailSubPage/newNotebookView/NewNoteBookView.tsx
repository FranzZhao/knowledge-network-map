import React, { useState, useEffect } from 'react';
// import customize components
import { TinyMCE } from '../../../../components/common';
// import MD
import clsx from 'clsx';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SaveIcon from '@material-ui/icons/Save';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import PaymentIcon from '@material-ui/icons/Payment';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import ExtensionIcon from '@material-ui/icons/Extension';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import { Tooltip } from '@material-ui/core';
// import mock data
import { mockTags } from '../../../../settings/mocks/DefaultTags';
import { relations, nodeData } from '../../../../settings/mocks/DefaultGraph';
// redux
import { useDispatch } from 'react-redux';
import { useSelector } from '../../../../redux/hooks';
import { findAllMapNodes } from '../../../../redux/knm/nodeSlice';
import { findAllMapLinks } from '../../../../redux/knm/linkSlice';
import { createMapNotebook } from '../../../../redux/knm/notebookSlice';


const useStyles = makeStyles((theme: Theme) => createStyles({
    infoPanelTitle: {
        fontSize: '18px !important',
    },
    infoPanelForms: {
        // marginBottom: theme.spacing(2),
        '&>*': {
            marginBottom: theme.spacing(2),
            width: '100%',
        },
    },
    emojiStyle: {
        "& > span": {
            left: 10,
            top: 5,
        }
    },
    selfDefineInputStyle: {
        "& .MuiInput-underline:after": {
            borderBottom: 'none',
        },
        "& .MuiInput-underline:before": {
            borderBottom: 'none',
        },
        "& .MuiInput-underline:hover:(not)(.Mui-disabled):before": {
            borderBottom: 'none',
        },
        "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
            borderBottom: 'none',
        }
    },
    notebookTitle: {
        width: '100%',
        flex: 1,
        "& input": {
            fontSize: 30,
            fontWeight: 'bold',
        },
    },
    notebookProperty: {
        display: 'flex',
        marginTop: 5,
        marginBottom: 15,
        "& > *": {
            padding: '5px 3px',
        }
    },
    notebookPropertyLeft: {
        width: 180,
        marginRight: 10,
        fontSize: 16,
        display: 'flex',
        "& > *": {
            marginTop: 'auto',
            marginBottom: 'auto',
        },
        "& svg": {
            marginRight: 15,
            marginLeft: 5,
        },
        "&:hover": {
            backgroundColor: '#4e4e4e4d',
            cursor: 'pointer',
            borderRadius: '8px',
        }
    }
}));

interface NotebookState {
    title: string;
    relationType: 'node' | 'link';
    relationId: string;
    tags: any[];
    quote: string;
    intro: string;
    selfDefineTitle: any[];
    selfDefineContain: any[];
    text: string;
}

// interface NewNotebookViewState {

// }
export const NewNoteBookView = () => {
    const classes = useStyles();
    // notebook value
    const [values, setValues] = useState<NotebookState>({
        title: '',
        relationType: 'node',
        relationId: '',
        tags: [],
        quote: '',
        intro: '',
        selfDefineTitle: [],
        selfDefineContain: [],
        text: '',
    });
    // all node & link
    const [nodes, setNodes] = useState<any[]>([]);
    const [links, setLinks] = useState<any[]>([]);
    // redux
    const dispatch = useDispatch();
    const jwt = useSelector(state => state.user.token);
    const currentOpenGraphId = useSelector(state => state.graph.currentOpenGraphInfo)['_id'];

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
        handleFindMapNodes().then(res => {
            let allNodes: any[] = [];
            res['currentNodesList'].map(node => {
                allNodes.push({
                    id: node['_id'],
                    name: node['name'],
                });
            });
            // console.log(allNodes);
            setNodes(allNodes);
        });
        handleFindMapLinks().then(res => {
            let allLinks: any[] = [];
            res['currentLinksList'].map(link => {
                allLinks.push({
                    id: link['_id'],
                    name: link['name'],
                });
            });
            // console.log(allLinks);
            setLinks(allLinks);
        });
    }, []);

    // change notebook values
    const handleChangeText = (prop: keyof NotebookState) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [prop]: event.target.value,
        });
    };

    // change notebook relation
    const handleChangeRelation = (event: React.ChangeEvent<{ value: unknown }>) => {
        // const relationType 
        const relationId = event.target.value as string;
        let relationType: 'node' | 'link' = 'node';
        links.map(link => {
            if (link.id === relationId){
                relationType = 'link';
            }
        });
        console.log(relationType);
        setValues({
            ...values,
            relationType: relationType,
            relationId: relationId,
        });
    }

    // change self defined title
    const handleChangeSelfDefinedTitle = (index) => (event: React.ChangeEvent<HTMLInputElement>) => {
        let newTitles = values.selfDefineTitle;
        const targetValue = event.target.value;
        newTitles[index] = targetValue;
        setValues({
            ...values,
            selfDefineTitle: newTitles,
        })
    };

    // change self defined contain
    const handleChangeSelfDefinedContain = (index) => (event: React.ChangeEvent<HTMLInputElement>) => {
        let newContains = values.selfDefineContain;
        const targetValue = event.target.value;
        newContains[index] = targetValue;
        setValues({
            ...values,
            selfDefineContain: newContains,
        })
    };

    // add new property
    const handleAddNewProperty = () => {
        let newTitles = values.selfDefineTitle;
        let newContains = values.selfDefineContain;
        newTitles.push('');
        newContains.push('');
        setValues({
            ...values,
            selfDefineTitle: newTitles,
            selfDefineContain: newContains,
        });
    };

    // delete self defined property
    const handleDeleteSelfDefinedProperty = (index) => {
        let newTitle = values.selfDefineTitle;
        let newContain = values.selfDefineContain;
        newTitle.splice(index, 1);
        newContain.splice(index, 1);
        setValues({
            ...values,
            selfDefineTitle: newTitle,
            selfDefineContain: newContain,
        });
    }

    // handle change editor text
    const handleChangeTinyText = (text) => {
        setValues({
            ...values,
            text: text,
        });
    }

    const handleSaveNotebook = () => {
        // console.log(values);
        dispatch(createMapNotebook({
            jwt: jwt, graphId: currentOpenGraphId, 
            target: values.relationType, targetId: values.relationId,
            notebookValues: values
        }));
    };


    return (
        <React.Fragment>
            <div className={classes.notebookProperty}>
                <TextField
                    id="knm-node-name"
                    size="small"
                    placeholder="输入笔记标题"
                    value={values.title}
                    onChange={handleChangeText('title')}
                    className={clsx(classes.selfDefineInputStyle, classes.notebookTitle)}
                    autoComplete="off"
                />
                <div>
                    <Button
                        variant="outlined"
                        color="primary"
                        startIcon={<SaveIcon />}
                        onClick={handleSaveNotebook}
                    >保存笔记</Button>
                </div>
            </div>
            <div className={classes.notebookProperty}>
                <div
                    className={classes.notebookPropertyLeft}
                >
                    <AccountTreeIcon fontSize="small" />
                    <p>关联节点</p>
                </div>
                <FormControl style={{ width: '100%', flex: 1, }}>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={values.relationId}
                        onChange={handleChangeRelation}
                    >
                        {
                            nodes.map((node, index) => {
                                return (
                                    <MenuItem value={node.id} key={node.id}>{node.name}</MenuItem>
                                );
                            })
                        }
                        {
                            links.map((link, index) => {
                                return (
                                    <MenuItem value={link.id} key={link.id}>{link.name}</MenuItem>
                                );
                            })
                        }
                    </Select>
                </FormControl>
            </div>
            <div className={classes.notebookProperty}>
                <div
                    className={classes.notebookPropertyLeft}
                >
                    <LocalOfferIcon fontSize="small" />
                    <p>笔记标签</p>
                </div>
                <Autocomplete
                    style={{ width: '100%', flex: 1, marginTop: -3 }}
                    multiple
                    id="tags-filled"
                    options={mockTags.map((option) => option.title)}
                    value={values.tags}
                    onChange={(event, newValue) => {
                        setValues({
                            ...values,
                            tags: newValue
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
            </div>
            <div className={classes.notebookProperty}>
                <div
                    className={classes.notebookPropertyLeft}
                >
                    <FormatQuoteIcon fontSize="small" />
                    <p>笔记引用</p>
                </div>
                <TextField
                    id="knm-node-name"
                    size="small"
                    autoComplete="off"
                    placeholder="笔记所引用的文献(建议使用作者年份格式, e.g. Flavell, 1978)"
                    value={values.quote}
                    onChange={handleChangeText('quote')}
                    style={{ width: '100%', flex: 1 }}  // setting flex:1 to control width unchangeable in flex display
                />
            </div>
            <div className={classes.notebookProperty}>
                <div
                    className={classes.notebookPropertyLeft}
                >
                    <PaymentIcon fontSize="small" />
                    <p>笔记简介</p>
                </div>
                <TextField
                    id="knm-node-name"
                    size="small"
                    autoComplete="off"
                    placeholder="请用简介的话语对该知识笔记进行简介、概括"
                    value={values.intro}
                    onChange={handleChangeText('intro')}
                    style={{ width: '100%', flex: 1 }}  // setting flex:1 to control width unchangeable in flex display
                />
            </div>
            {
                values.selfDefineTitle.length > 0 &&
                values.selfDefineTitle.map((title, index) => (
                    <div className={classes.notebookProperty} key={`selfDefined-${index}`}>
                        <div
                            key={`selfDefined-left-${index}`}
                            className={classes.notebookPropertyLeft}
                        >
                            <Tooltip title="删除字段" arrow>
                                <RemoveCircleOutlineIcon
                                    fontSize="small"
                                    onClick={() => handleDeleteSelfDefinedProperty(index)}
                                />
                            </Tooltip>
                            <TextField
                                size="small"
                                autoComplete="off"
                                placeholder="自定义字段名"
                                value={title}
                                onChange={handleChangeSelfDefinedTitle(index)}
                            />
                        </div>
                        <TextField
                            id={`selfDefined-text-${index}`}
                            size="small"
                            autoComplete="off"
                            placeholder="请输入自定义字段内容"
                            value={values.selfDefineContain[index]}
                            style={{ width: '100%', flex: 1 }}  // setting flex:1 to control width unchangeable in flex display
                            onChange={handleChangeSelfDefinedContain(index)}
                        />
                    </div>
                ))
            }
            <div className={classes.notebookProperty} style={{ height: 39 }}>
                <div
                    className={classes.notebookPropertyLeft}
                    style={{ color: 'grey' }}
                    onClick={handleAddNewProperty}
                >
                    <ControlPointIcon fontSize="small" />
                    <p>自定义字段</p>
                </div>
            </div>

            <TinyMCE
                type="inline"
                text={values.text}
                handleChangeTinyText={handleChangeTinyText}
            />
        </React.Fragment>
    )
}
