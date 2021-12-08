import React, { useEffect, useState } from 'react';
// import MD
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import { mockTags } from '../../../../settings/mocks/DefaultTags';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Skeleton } from '@material-ui/lab';
import DeleteIcon from '@material-ui/icons/Delete';
// import emoji
import 'emoji-mart/css/emoji-mart.css';
import { Picker, Emoji } from 'emoji-mart';
// import redux
import { useSelector } from '../../../../redux/hooks';
import { knmDelete, knmUpdate } from '../../../../redux/knm/knmMapSlice';
import { useDispatch } from 'react-redux';
import { DialogBox } from '../../../../components/common';
import { closePageTab, updateSystemNavItem } from '../../../../redux/pageTabs/slice';
// router
import { useHistory } from 'react-router';

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
}));

// emoji i18n
const emojiI18n = {
    search: '搜索',
    clear: '清空', // Accessible label on "clear" button
    notfound: '没有找到Emoji',
    skintext: '选择你的默认肤色',
    categories: {
        search: '搜索结果',
        recent: '常用',
        smileys: '笑脸 & 表情',
        people: '人 & 身体',
        nature: '动物 & 自然',
        foods: '食物 & 饮品',
        activity: '活动',
        places: '旅行 & 场地',
        objects: '物品',
        symbols: '符号',
        flags: '旗帜',
        custom: '自定义',
    },
    categorieslabel: 'Emoji类别', // Accessible title for the list of categories
    skintones: {
        1: '默认肤色',
        2: '浅肤色',
        3: '适中浅肤色',
        4: '适中肤色',
        5: '适中深肤色',
        6: '深肤色',
    },

};

interface GraphBasicInfoState {
    title: string;
    icon: any;
    tags: any[];
    intro: string;
};

export const GraphBasicInfoEditPanel: React.FC = () => {
    const classes = useStyles();
    // router
    const history = useHistory();
    // redux
    const dispatch = useDispatch();
    const currentKnmList = useSelector(state => state.knmMap.knmList);
    const currentOpenMapInfo = useSelector(state => state.knmMap.currentOpenMapInfo);
    const jwt = useSelector(state => state.user.token);
    const knmInfoLoading = useSelector(state => state.knmMap.loading);
    const knmDeleteLoading = useSelector(state => state.knmMap.deleteLoading);
    const alreadyOpenedTabs = useSelector(state => state.pageTabs.alreadyOpenedTabs);
    const currentActivatedTab = useSelector(state => state.pageTabs.currentActivatedTab);

    const [isClick, setIsClick] = useState(false);
    // const currentTag = useSelector(state => state.openPage.currentActivatedTab);
    const currentTheme = useSelector(state => state.theme.currentTheme);
    // component state
    const [values, setValues] = useState<GraphBasicInfoState>({
        title: currentOpenMapInfo['title'],
        icon: currentOpenMapInfo['emoji'],
        tags: currentOpenMapInfo['tags'],
        intro: currentOpenMapInfo['introduction'],
    });
    // const [projectEmoji, setProjectEmoji] = useState(graphIcon);
    const [showEmoji, setShowEmoji] = useState(values.icon);
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

    useEffect(() => {
        setValues({
            title: currentOpenMapInfo['title'],
            icon: currentOpenMapInfo['emoji'],
            tags: currentOpenMapInfo['tags'],
            intro: currentOpenMapInfo['introduction'],
        });
    }, [currentOpenMapInfo]);

    const handleChange = (prop: keyof GraphBasicInfoState) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    // change emoji when click the picker -> 暂时性
    const handleChangeEmoji = (emoji) => {
        setShowEmoji(emoji.id);
    };

    const handleOpenEmojiPicker = () => {
        // * if click this button when emoji picker opened, means to change the project emoji
        if (openEmojiPicker) {
            setValues({
                ...values,
                icon: showEmoji
            });
        }
        setOpenEmojiPicker(!openEmojiPicker);
    }

    const handleCancelChangeEmoji = () => {
        setShowEmoji(values.icon);
        setOpenEmojiPicker(false);
    };

    const handleUpdateKnmInfo = async () => {
        await setIsClick(true);
        let newKnmInfo = {
            title: values.title,
            tags: values.tags,
            introduction: values.intro,
            emoji: showEmoji,
            state: 1,
        };
        await dispatch(knmUpdate({
            knmId: currentOpenMapInfo["_id"],
            jwt: jwt,
            updateKnmInfo: newKnmInfo,
            knmList: currentKnmList,
            currentOpenMapInfo: currentOpenMapInfo,
        }));
        setIsClick(false);
    };

    // delete node
    const handleDeleteKNM = async () => {
        setOpenDialog(false);
        // close this page
        dispatch(closePageTab({
            closeItemName: values.title,
            alreadyOpenedTabs: alreadyOpenedTabs,
            currentOpenedTab: currentActivatedTab,
        }));
        await dispatch(knmDelete({
            jwt: jwt, knmId: currentOpenMapInfo["_id"]
        }));
    };

    const [openDialog, setOpenDialog] = useState(false);
    interface DeleteKNMState {
        openDialog: boolean;
        handleCloseDialog: () => void;
    }
    const DeleteKNM: React.FC<DeleteKNMState> = ({
        openDialog, handleCloseDialog
    }) => {
        return (
            <DialogBox
                boxSize="xs"
                open={openDialog}
                title={'删除知识地图'}
                contain={
                    <div>请确认是否删除该知识地图？注意！<b style={{ color: 'orange' }}>该知识地图下得所有知识节点、知识关联和知识笔记，将在知识地图删除后同时被删除！且删除后无法恢复！</b>若确认删除，则点击“确认”按钮。</div>
                }
                actions={
                    <>
                        <Button size="small" variant="outlined" color="secondary" onClick={handleCloseDialog}>取消</Button>
                        <Button size="small" variant="text" color="primary" onClick={handleDeleteKNM}>确认</Button>
                    </>
                }
            />
        );
    };

    return (
        <React.Fragment>
            {
                !isClick && knmInfoLoading ? (
                    <>
                        <Skeleton variant="rect" style={{ width: '100%', height: 45, marginBottom: 5, backgroundColor: 'rgb(255 255 255 / 5%)', marginTop: 5 }} />
                        <Skeleton variant="rect" style={{ width: '100%', height: 45, marginBottom: 5, backgroundColor: 'rgb(255 255 255 / 5%)' }} />
                        <Skeleton variant="rect" style={{ width: '100%', height: 45, marginBottom: 5, backgroundColor: 'rgb(255 255 255 / 5%)' }} />
                        <Skeleton variant="rect" style={{ width: '100%', height: 45, marginBottom: 5, backgroundColor: 'rgb(255 255 255 / 5%)' }} />
                        <Skeleton variant="rect" style={{ width: '100%', height: 45, marginBottom: 5, backgroundColor: 'rgb(255 255 255 / 5%)' }} />
                    </>
                ) : (
                    <form className={classes.infoPanelForms} noValidate autoComplete="off">
                        <div>
                            <Grid container direction="row" justifyContent="space-between">
                                <Grid item className={classes.emojiStyle}>
                                    知识地图小图标: <Emoji emoji={openEmojiPicker ? showEmoji : values.icon} set='twitter' size={26} />
                                </Grid>
                                <Grid item>
                                    <Button color="primary" onClick={handleOpenEmojiPicker}>
                                        {openEmojiPicker ? '确定更换' : '更换图标'}
                                    </Button>
                                    {
                                        openEmojiPicker &&
                                        <Button color="secondary" onClick={handleCancelChangeEmoji}>取消更换</Button>
                                    }
                                </Grid>
                            </Grid>
                            {/* emoji picker*/}
                            {
                                openEmojiPicker &&
                                <Picker
                                    style={{ position: 'absolute', right: 20, top: 100, zIndex: 10, width: 360, }}
                                    set='twitter'
                                    title={'选择项目图标'}
                                    emoji='point_up'
                                    i18n={emojiI18n}
                                    onSelect={handleChangeEmoji}
                                    theme={currentTheme === 'light' ? 'light' : 'dark'}
                                />
                            }
                        </div>
                        <Autocomplete
                            style={{ width: '100%', flex: 1, marginBottom: 10 }}
                            multiple
                            id="tags-filled"
                            options={mockTags.map((option) => option.title)}
                            value={values.tags}
                            freeSolo
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
                        <TextField
                            id="knm-node-name"
                            label="知识地图标题"
                            size="small"
                            value={values.title}
                            onChange={handleChange('title')}
                        />
                        <TextField
                            id="knm-node-intro"
                            label="知识节点简介"
                            size="small"
                            value={values.intro}
                            onChange={handleChange('intro')}
                            multiline
                        />
                        <div>
                            <Button
                                variant="contained"
                                color="primary"
                                style={{ width: '48%' }}
                                endIcon={
                                    knmInfoLoading ? (
                                        <CircularProgress style={{ width: 20, height: 20, color: 'white' }} />
                                    ) : (
                                        <SaveIcon />
                                    )
                                }
                                onClick={handleUpdateKnmInfo}
                            >
                                更新基本信息
                            </Button>
                            &nbsp;&nbsp;&nbsp;
                            <Button
                                variant="text"
                                color="secondary"
                                endIcon={
                                    knmDeleteLoading ? (
                                        <CircularProgress style={{ width: 20, height: 20, color: 'orange' }} />
                                    ) : (
                                        <DeleteIcon />
                                    )
                                }
                                style={{ width: '48%' }}
                                onClick={() => setOpenDialog(true)}
                            >
                                删除知识地图
                            </Button>
                            <DeleteKNM
                                openDialog={openDialog}
                                handleCloseDialog={() => setOpenDialog(false)}
                            />
                        </div>
                    </form>
                )
            }

        </React.Fragment>
    );
};