import React from 'react';
// import MD
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
// import customize component
import { PaginationDataTable } from '../../components/common';
// get mock data
import { DefaultKNM } from '../../settings/mocks/DefaultKNM';


export const KNMListPage: React.FC = () => {
    const sayHello = () => {
        alert('hello');
    };

    return (
        <div style={{ padding: '10px 30px' }}>
            <h1>知识地图信息列表</h1>
            <FormControl component="fieldset" style={{marginBottom: 20}}>
                <RadioGroup row aria-label="position" name="position" defaultValue="all-map">
                    <FormControlLabel value="all-map" control={<Radio color="primary" />} label="所有知识地图" />
                    <FormControlLabel value="all-notebook" control={<Radio color="primary" />} label="所有知识笔记" />
                    <FormControlLabel value="all-node" control={<Radio color="primary" />} label="所有知识节点" />
                    <FormControlLabel value="all-link" control={<Radio color="primary" />} label="所有知识关联" />
                </RadioGroup>
            </FormControl>
            <PaginationDataTable
                header={["知识地图标题", "标签", "创建者", "创建时间", "操作"]}
                rows={DefaultKNM}
                buttons={['查看']}
                actions={[sayHello]}
            />
        </div>
    );
};