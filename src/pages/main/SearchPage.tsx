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
import SearchIcon from '@material-ui/icons/Search';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';

// customize component
import { PaginationDataTable } from '../../components/common/dataTable';
// get mock data
import { DefaultKNM } from '../../settings/mocks/DefaultKNM';
import { Button, Divider, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => createStyles({

    searchForm: {
        display: 'flex',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    searchTextFiled: {
        marginTop: 3,
        marginRight: 10,
        flex: 1,
        width: '100%',
    },
    searchSelectedFiled: {
        width: 170,
    },
    searchBtn: {
        marginLeft: 10,
        width: 100,
    },
    searchBoolean: {
        width: 45,
        marginRight: 10,
    },
    searchSubTitle: {
        marginLeft: 15,
        lineHeight: '20px',
        color: theme.palette.grey[500],
        display: 'block',
        marginTop: 5,
    },
}));

interface SearchState {
    searchTexts: string[];
    searchPositions: string[];
    searchBooleans: string[];
}

export const SearchPage: React.FC = () => {
    const classes = useStyles();
    const [values, setValues] = useState<SearchState>({
        searchTexts: ['', ''],
        searchPositions: ['all', 'all'],
        searchBooleans: ['', 'and'],
    });

    const handleSearchTextChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSearchText = event.target.value;
        let newSearchTexts = values.searchTexts;
        newSearchTexts[index] = newSearchText;
        setValues({
            ...values,
            searchTexts: newSearchTexts
        });
    };

    const handleSearchPositionSelect = (index: number) => (event: React.ChangeEvent<{ value: unknown }>) => {
        const newSearchPosition = event.target.value as string;
        let newSearchPositions = values.searchPositions;
        newSearchPositions[index] = newSearchPosition;
        setValues({
            ...values,
            searchPositions: newSearchPositions,
        });
    };

    const handleSearchBooleanSelect = (index: number) => (event: React.ChangeEvent<{ value: unknown }>) => {
        const newSearchBoolean = event.target.value as string;
        let newSearchBooleans = values.searchBooleans;
        newSearchBooleans[index] = newSearchBoolean;
        setValues({
            ...values,
            searchBooleans: newSearchBooleans,
        });
    };

    const handleSearch = () => {
        console.log(values);
    }

    const handleAddItem = () => {
        let newSearchTexts = values.searchTexts;
        newSearchTexts.push('');
        let newSearchPositions = values.searchPositions;
        newSearchPositions.push('all');
        let newSearchBooleans = values.searchBooleans;
        newSearchBooleans.push('and');
        setValues({
            searchTexts: newSearchTexts,
            searchPositions: newSearchPositions,
            searchBooleans: newSearchBooleans,
        });
    };

    const handleDeleteItem = (index: number) => {
        let newSearchTexts = values.searchTexts;
        newSearchTexts.splice(index, 1);
        let newSearchPositions = values.searchPositions;
        newSearchPositions.splice(index, 1);
        let newSearchBooleans = values.searchBooleans;
        newSearchBooleans.splice(index, 1);
        setValues({
            searchTexts: newSearchTexts,
            searchPositions: newSearchPositions,
            searchBooleans: newSearchBooleans,
        })
    };

    return (
        <div style={{ padding: '10px 30px' }}>
            <h1>知识地图与笔记搜索</h1>
            <Paper style={{ padding: '10px 30px', marginBottom: 20 }}>
                <h3 style={{ padding: 0, marginTop: 10, marginBottom: 5, }}>检索条件编辑</h3>
                {
                    values.searchTexts.map((text, index) => (
                        <form className={classes.searchForm} noValidate autoComplete="off">
                            {
                                index > 0 &&
                                <FormControl className={classes.searchBoolean}>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={values.searchBooleans[index]}
                                        onChange={handleSearchBooleanSelect(index)}
                                    >
                                        <MenuItem value={'and'}>与</MenuItem>
                                        <MenuItem value={'or'}>或</MenuItem>
                                        <MenuItem value={'not'}>非</MenuItem>
                                    </Select>
                                </FormControl>
                            }
                            <FormControl className={classes.searchTextFiled}>
                                <TextField
                                    id="knm-node-intro"
                                    placeholder="请输入检索字段"
                                    size="small"
                                    value={values.searchTexts[index]}
                                    onChange={handleSearchTextChange(index)}
                                />
                            </FormControl>
                            <FormControl className={classes.searchSelectedFiled}>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={values.searchPositions[index]}
                                    onChange={handleSearchPositionSelect(index)}
                                >
                                    <MenuItem value={'all'}>全局检索</MenuItem>
                                    <Divider />
                                    <Typography variant="overline" className={classes.searchSubTitle}>知识地图检索</Typography>
                                    <MenuItem value={'map-title'}>知识地图标题</MenuItem>
                                    <MenuItem value={'map-intro'}>知识地图简介</MenuItem>
                                    <MenuItem value={'map-tags'}>知识地图标签</MenuItem>
                                    <MenuItem value={'map-all'}>知识地图所有位置</MenuItem>
                                    <Divider />
                                    <Typography variant="overline" className={classes.searchSubTitle}>知识笔记检索</Typography>
                                    <MenuItem value={'notebook-title'}>知识笔记标题</MenuItem>
                                    <MenuItem value={'notebook-tags'}>知识笔记标签</MenuItem>
                                    <MenuItem value={'notebook-quote'}>知识笔记引用</MenuItem>
                                    <MenuItem value={'notebook-intro'}>知识笔记简介</MenuItem>
                                    <MenuItem value={'notebook-content'}>知识笔记内容</MenuItem>
                                    <MenuItem value={'notebook-all'}>知识笔记所有位置</MenuItem>
                                    <Divider />
                                    <Typography variant="overline" className={classes.searchSubTitle}>知识节点检索</Typography>
                                    <MenuItem value={'node-title'}>知识节点标题</MenuItem>
                                    <MenuItem value={'node-tags'}>知识节点标签</MenuItem>
                                    <MenuItem value={'node-intro'}>知识节点简介</MenuItem>
                                    <MenuItem value={'node-all'}>知识节点所有位置</MenuItem>
                                    <Divider />
                                    <Typography variant="overline" className={classes.searchSubTitle}>知识关联检索</Typography>
                                    <MenuItem value={'link-title'}>知识关联标题</MenuItem>
                                    <MenuItem value={'link-tags'}>知识关联标签</MenuItem>
                                    <MenuItem value={'link-intro'}>知识关联简介</MenuItem>
                                    <MenuItem value={'link-start'}>知识关联起始节点</MenuItem>
                                    <MenuItem value={'link-end'}>知识关联目标节点</MenuItem>
                                    <MenuItem value={'link-all'}>知识关联所有位置</MenuItem>
                                </Select>
                            </FormControl>
                            {
                                index === 0 &&
                                <Button
                                    className={classes.searchBtn}
                                    variant="outlined"
                                    color="primary"
                                    size="small"
                                    startIcon={<SearchIcon />}
                                    onClick={handleSearch}
                                >
                                    检索
                                </Button>
                            }
                            {
                                index === 1 &&
                                <Button
                                    className={classes.searchBtn}
                                    variant="text"
                                    color="primary"
                                    size="small"
                                    startIcon={<AddCircleOutlineIcon />}
                                    onClick={handleAddItem}
                                >
                                    添加行
                                </Button>
                            }
                            {
                                index > 1 &&
                                <Button
                                    className={classes.searchBtn}
                                    variant="text"
                                    color="primary"
                                    size="small"
                                    startIcon={<RemoveCircleOutlineIcon />}
                                    onClick={()=>handleDeleteItem(index)}
                                >
                                    删除行
                                </Button>
                            }
                        </form>
                    ))
                }
            </Paper>
            <PaginationDataTable
                header={["知识地图标题", "标签", "创建者", "创建时间"]}
                rows={DefaultKNM}
            />
        </div>
    )
}
