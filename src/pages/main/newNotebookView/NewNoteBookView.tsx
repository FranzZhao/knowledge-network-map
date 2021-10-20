import React, { useState } from 'react';
// import customize components
import { TinyMCE } from '../../../components/common';
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
import { mockTags } from '../../../settings/mocks/DefaultTags';
import { relations, nodeData } from '../../../settings/mocks/DefaultGraph';




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
    tags: any[];
    quote: string;
    intro: string;
    selfDefineTitle: any[];
    selfDefineContain: any[];
    text: string;
}

export const NewNoteBookView = () => {
    const classes = useStyles();
    const [values, setValues] = useState<NotebookState>({
        title: '',
        tags: [mockTags[1].title],
        quote: '',
        intro: '',
        selfDefineTitle: [],
        selfDefineContain: [],
        text: '',
    });

    // change notebook values
    const handleChangeText = (prop: keyof NotebookState) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [prop]: event.target.value,
        });
    };

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

    const handleOutput = () => {
        console.log(values);
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
                        onClick={handleOutput}
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
                <FormControl style={{width: '100%', flex: 1,}}>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        defaultValue={'导数的定义'}
                        // value={values.nodeSize}
                        // onChange={handleChangeNodeSize}
                    >
                        {
                            nodeData.map((node, index) => {
                                return (
                                    <MenuItem value={node.name} key={`${node.name}-${index}`}>{node.name}</MenuItem>
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
                                    onClick={()=>handleDeleteSelfDefinedProperty(index)} 
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
