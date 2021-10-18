import React from 'react';
// import MD
// import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
// import customize component
import { PaginationDataTable } from '../../components/common';
// get mock data
import { DefaultKNM } from '../../settings/mocks/DefaultKNM';


export const KNMListPage: React.FC = () => {
    const sayHello = () => {
        alert('hello');
    };

    const sayGoodBye = () => {
        alert('good bye');
    };

    return (
        <div style={{padding: '10px 30px'}}>
            <h1>知识地图列表</h1>
            <PaginationDataTable 
                header={["知识地图标题", "标签", "创建者", "创建时间", "操作"]}
                rows={DefaultKNM}
                buttons={['查看', '删除']}
                actions={[sayHello, sayGoodBye]}
            />
        </div>
    );
};