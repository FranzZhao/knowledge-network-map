import React, { useState } from 'react';
// import MD components & components
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import PaymentIcon from '@material-ui/icons/Payment';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
// customize component
import { PaginationDataTable } from '../../components/common/dataTable';
// get mock data
import { DefaultKNM } from '../../settings/mocks/DefaultKNM';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => createStyles({
    main: {
        // height: 'calc(100vh - 50px)',
        lineHeight: '650px',
        fontSize: '50px',
        color: '#c2c2c2',
        letterSpacing: '12px',
        textAlign: 'center',
        // width: 'calc(100vw - 240px)',
        userSelect: 'none',
    },
    infoPanelForms: {
        // marginBottom: theme.spacing(2),
        '&>*': {
            marginBottom: theme.spacing(2),
            width: '100%',
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
        width: 310,
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

interface SearchState {
    mapSearchPosition: string;
    mapSearchText: string;
    notebookSearchPosition: string,
    notebookSearchText: string,
    nodeSearchPosition: string,
    nodeSearchText: string,
    linkSearchPosition: string,
    linkSearchText: string,
    boolean1: string,
    boolean2: string,
    boolean3: string,
}

export const SearchPage: React.FC = () => {
    const classes = useStyles();
    const [values, setValues] = useState<SearchState>({
        mapSearchPosition: '',
        mapSearchText: '',
        notebookSearchPosition: '',
        notebookSearchText: '',
        nodeSearchPosition: '',
        nodeSearchText: '',
        linkSearchPosition: '',
        linkSearchText: '',
        boolean1: 'and1',
        boolean2: 'and2',
        boolean3: 'and3',
    });

    const handleChangeSelect = (prop: keyof SearchState) => (event: React.ChangeEvent<{ value: unknown }>) => {
        setValues({
            ...values,
            [prop]: event.target.value as string,
        });
    };

    const handleChangeSearchText = (prop: keyof SearchState) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [prop]: event.target.value,
        });
    };

    return (
        <div style={{ padding: '10px 30px' }}>
            <h1>知识地图与笔记搜索</h1>
            <Paper style={{ padding: '10px 40px', marginBottom: 20 }}>                    
                <h3 style={{ padding: 0, marginTop: 10, marginBottom: 5, }}>检索条件编辑</h3>
                <form className={classes.infoPanelForms} noValidate autoComplete="off" style={{ display: 'flex' }}>
                    <div style={{ width: 60, marginRight: 10, }}></div>
                    <FormControl style={{ width: '35%' }}>
                        <InputLabel id="demo-simple-select-label">知识地图检索位置</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={values.mapSearchPosition}
                            onChange={handleChangeSelect('mapSearchPosition')}
                        >
                            <MenuItem value={'map-title'}>知识地图标题</MenuItem>
                            <MenuItem value={'map-intro'}>知识地图简介</MenuItem>
                            <MenuItem value={'map-tags'}>知识地图标签</MenuItem>
                            <MenuItem value={'map-all'}>所有位置</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl style={{ marginTop: 3 }}>
                        <TextField
                            id="knm-node-intro"
                            label="知识地图检索内容"
                            placeholder="请输入检索字段"
                            size="small"
                            value={values.mapSearchText}
                            onChange={handleChangeSearchText('mapSearchText')}
                        />
                    </FormControl>
                </form>
                <form className={classes.infoPanelForms} noValidate autoComplete="off" style={{ display: 'flex' }}>
                    <FormControl style={{ width: 60, marginRight: 10, marginTop: 16 }}>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={values.boolean1}
                            onChange={handleChangeSelect('boolean1')}
                        >
                            <MenuItem value={'and1'}>与</MenuItem>
                            <MenuItem value={'or1'}>或</MenuItem>
                            <MenuItem value={'not1'}>非</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl style={{ width: '35%' }}>
                        <InputLabel id="demo-simple-select-label">知识笔记检索位置</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={values.notebookSearchPosition}
                            onChange={handleChangeSelect('notebookSearchPosition')}
                        >
                            <MenuItem value={'notebook-title'}>知识笔记标题</MenuItem>
                            <MenuItem value={'notebook-tags'}>知识笔记标签</MenuItem>
                            <MenuItem value={'notebook-quote'}>知识笔记引用</MenuItem>
                            <MenuItem value={'notebook-intro'}>知识笔记简介</MenuItem>
                            <MenuItem value={'notebook-content'}>知识笔记内容</MenuItem>
                            <MenuItem value={'notebook-all'}>所有位置</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl style={{ marginTop: 3 }}>
                        <TextField
                            id="knm-node-intro"
                            label="知识笔记检索内容"
                            placeholder="请输入检索字段"
                            size="small"
                            value={values.notebookSearchText}
                            onChange={handleChangeSearchText('notebookSearchText')}
                        />
                    </FormControl>
                </form>
                <form className={classes.infoPanelForms} noValidate autoComplete="off" style={{ display: 'flex' }}>
                    <FormControl style={{ width: 60, marginRight: 10, marginTop: 16 }}>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={values.boolean2}
                            onChange={handleChangeSelect('boolean2')}
                        >
                            <MenuItem value={'and2'}>与</MenuItem>
                            <MenuItem value={'or2'}>或</MenuItem>
                            <MenuItem value={'not2'}>非</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl style={{ width: '35%' }}>
                        <InputLabel id="demo-simple-select-label">知识节点检索位置</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={values.nodeSearchPosition}
                            onChange={handleChangeSelect('nodeSearchPosition')}
                        >
                            <MenuItem value={'node-title'}>知识节点标题</MenuItem>
                            <MenuItem value={'node-tags'}>知识节点标签</MenuItem>
                            <MenuItem value={'node-intro'}>知识节点简介</MenuItem>
                            <MenuItem value={'node-all'}>所有位置</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl style={{ marginTop: 3 }}>
                        <TextField
                            id="knm-node-intro"
                            label="知识节点检索内容"
                            placeholder="请输入检索字段"
                            size="small"
                            value={values.nodeSearchText}
                            onChange={handleChangeSearchText('nodeSearchText')}
                        />
                    </FormControl>
                </form>
                <form className={classes.infoPanelForms} noValidate autoComplete="off" style={{ display: 'flex' }}>
                    <FormControl style={{ width: 60, marginRight: 10, marginTop: 16 }}>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={values.boolean3}
                            onChange={handleChangeSelect('boolean3')}
                        >
                            <MenuItem value={'and3'}>与</MenuItem>
                            <MenuItem value={'or3'}>或</MenuItem>
                            <MenuItem value={'not3'}>非</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl style={{ width: '35%' }}>
                        <InputLabel id="demo-simple-select-label">知识关联检索位置</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={values.linkSearchPosition}
                            onChange={handleChangeSelect('linkSearchPosition')}
                        >
                            <MenuItem value={'link-title'}>知识关联标题</MenuItem>
                            <MenuItem value={'link-tags'}>知识关联标签</MenuItem>
                            <MenuItem value={'link-intro'}>知识关联简介</MenuItem>
                            <MenuItem value={'link-start'}>知识关联起始节点</MenuItem>
                            <MenuItem value={'link-end'}>知识关联目标节点</MenuItem>
                            <MenuItem value={'link-all'}>所有位置</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl style={{ marginTop: 3 }}>
                        <TextField
                            id="knm-node-intro"
                            label="知识关联检索内容"
                            placeholder="请输入检索字段"
                            size="small"
                            value={values.linkSearchText}
                            onChange={handleChangeSearchText('linkSearchText')}
                        />
                    </FormControl>
                </form>
                <Button color="primary" variant="outlined" style={{ width: '100%' }}>检索</Button>
            </Paper>
            <PaginationDataTable
                header={["知识地图标题", "标签", "创建者", "创建时间"]}
                rows={DefaultKNM}
            />
        </div>
    )
}
