import React, { useEffect, useState } from 'react';
// import MD
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Chip from "@material-ui/core/Chip";
// import customize component
import { PaginationDataTable } from '../../components/common';
// import emoji
import 'emoji-mart/css/emoji-mart.css';
import { Emoji } from 'emoji-mart';
// redux
import { useSelector } from '../../redux/hooks';

export const KNMListPage: React.FC = () => {
    const knmListInfo = useSelector(state => state.knmMap.info);
    const [currentKnmList, setCurrentKnmList] = useState<any[]>([]);

    const sayHello = async () => {

    };

    // 获得知识地图knm列表
    useEffect(() => {
        let newList: any[] = [];
        knmListInfo.map(item => {
            // emoji + title_text
            let title = (
                <React.Fragment>
                    <div style={{ display: 'flex' }}>
                        <div style={{ marginTop: -2, marginRight: 10 }}>
                            <Emoji emoji={item['emoji']} set='twitter' size={20} />
                        </div>
                        <div>{item['title']}</div>
                    </div>
                </React.Fragment>
            );
            // tags with Clips
            let tagsText:string[] = item['tags'];
            let tags = (
                <React.Fragment>
                    {
                        tagsText.map((tag, index) => (
                            <><Chip key={`tag-${index}`} label={tag} color="secondary" size="small" variant="outlined" />&nbsp;</>
                        ))
                    }
                </React.Fragment>
            );
            let updateTime = new Date(item['updatedAt']).toLocaleString();
            newList.push([
                title,
                tags,
                item['author']['username'],
                updateTime
            ]);
        });
        setCurrentKnmList(newList);
    }, [knmListInfo]);

    return (
        <div style={{ padding: '10px 30px' }}>
            <h1>知识地图信息列表</h1>
            <FormControl component="fieldset" style={{ marginBottom: 20 }}>
                <RadioGroup row aria-label="position" name="position" defaultValue="all-map">
                    <FormControlLabel value="all-map" control={<Radio color="primary" />} label="所有知识地图" />
                    <FormControlLabel value="all-notebook" control={<Radio color="primary" />} label="所有知识笔记" />
                    <FormControlLabel value="all-node" control={<Radio color="primary" />} label="所有知识节点" />
                    <FormControlLabel value="all-link" control={<Radio color="primary" />} label="所有知识关联" />
                </RadioGroup>
            </FormControl>
            <PaginationDataTable
                header={["知识地图标题", "标签", "作者", "更新时间", "操作"]}
                rows={currentKnmList}
                buttons={['查看']}
                actions={[sayHello]}
            />
        </div>
    );
};