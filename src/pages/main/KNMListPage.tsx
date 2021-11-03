import React, { useEffect, useState } from 'react';
// import MD
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
// router
import { useHistory } from 'react-router-dom';
// redux
import { useDispatch } from 'react-redux';
import { useSelector } from '../../redux/hooks';
import Skeleton from '@material-ui/lab/Skeleton';
import Button from '@material-ui/core/Button';
import { openItemToPageTab } from '../../redux/pageTabs/slice';
import { getKnmDetail } from '../../redux/knm/knmMapSlice';
import { getGraphDetail } from '../../redux/knm/graphSlice';

export const KNMListPage: React.FC = () => {
    // router
    const history = useHistory();
    // redux
    const dispatch = useDispatch();
    const jwt = useSelector(state => state.user.token);
    const knmListInfo = useSelector(state => state.knmMap.knmList);
    const knmLoading = useSelector(state => state.knmMap.loading);
    const alreadyOpenedTabs = useSelector(state => state.pageTabs.alreadyOpenedTabs);
    const currentSystemNavItems = useSelector(state => state.pageTabs.projectNavMenuItems);
    const [currentKnmList, setCurrentKnmList] = useState<any[]>([]);

    // 获得知识地图knm列表
    useEffect(() => {
        // console.log(knmListInfo);
        let newList: any[] = [];
        knmListInfo.map((item, index) => {
            // * emoji + title_text
            let title = (
                <React.Fragment key={`title-${index}`}>
                    <div style={{ display: 'flex' }}>
                        <div style={{ marginTop: -2, marginRight: 10 }}>
                            <Emoji emoji={item['emoji']} set='twitter' size={20} />
                        </div>
                        <div>{item['title']}</div>
                    </div>
                </React.Fragment>
            );
            // * tags with Clips
            let tagsText: string[] = item['tags'];
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
            let updateTime = new Date(item['updatedAt']).toLocaleString();
            // * check specific knm func
            const getKnmAndGraphInfo = async (id: string) => {
                // 1. get knm detail
                const result = await dispatch(getKnmDetail({
                    knmId: id, jwt: jwt, currentKnmList: knmListInfo
                }));
                const currentOpenMapId = result['payload']['_id'];
                // 2. get the knm graph detail
                dispatch(getGraphDetail({
                    currentOpenMapId: currentOpenMapId,
                    jwt: jwt,
                }))
            }
            const handleCheckSpecificKNM = () => {
                dispatch(openItemToPageTab({
                    openItemName: item['title'],
                    alreadyOpenedTabs: alreadyOpenedTabs,
                    projectNavMenuItems: currentSystemNavItems,
                }));
                // using async-await to get currentOpenMapInfo
                getKnmAndGraphInfo(item['_id']);
                // go to knm detail page
                history.push('/main/detail');
            }
            let button = (
                <Button
                    size="small"
                    variant="outlined"
                    color="secondary"
                    onClick={handleCheckSpecificKNM}
                >
                    查看
                </Button>
            );

            newList.push([
                title,
                tags,
                item['author']['username'],
                updateTime,
                button,
            ]);
        });
        setCurrentKnmList(newList);
    }, [knmListInfo, alreadyOpenedTabs]);

    return (
        <div style={{ padding: '10px 30px' }}>
            <h1>知识地图信息列表</h1>
            {
                knmLoading ? (
                    <Skeleton variant="rect" width={'100%'} height={400} style={{ opacity: 0.3 }} />
                ) : (
                    currentKnmList.length === 0 ? (
                        <div style={{ display: 'flex', height: 'calc(100vh - 200px)', width: '100%' }}>
                            <h1 style={{ textAlign: 'center', color: 'grey', margin: 'auto', userSelect: 'none', fontSize: 40 }}>暂无知识地图，请新建知识地图</h1>
                        </div>
                    ) : (
                        <PaginationDataTable
                            header={["知识地图标题", "标签", "作者", "更新时间", "操作"]}
                            rows={currentKnmList}
                        />
                    )

                )
            }
        </div>
    );
};