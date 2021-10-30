import React, { useEffect, useState } from 'react';
// import MD
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import { mockTags } from '../../../settings/mocks/DefaultTags';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Chip from '@material-ui/core/Chip';
// import emoji
import 'emoji-mart/css/emoji-mart.css';
import { Picker, Emoji } from 'emoji-mart';
// import redux
import { useSelector } from '../../../redux/hooks';
import { knmUpdate } from '../../../redux/knm/knmMapSlice';
import { useDispatch } from 'react-redux';

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

interface GraphBasicInfoEditPanelState {
    graphTitle: string;
    graphIcon: any;
    handleChangeProjectInfo: (target: string, newValue: any) => void;
}
export const GraphBasicInfoEditPanel: React.FC<GraphBasicInfoEditPanelState> = ({
    graphTitle, graphIcon, handleChangeProjectInfo
}) => {
    const classes = useStyles();
    // redux
    const dispatch = useDispatch();
    const currentOpaMapInfo = useSelector(state => state.knmMap.currentOpaMapInfo);
    const jwt = useSelector(state => state.user.token);
    // const currentTag = useSelector(state => state.openPage.currentActivatedTab);
    const currentTheme = useSelector(state => state.theme.currentTheme);
    // component state
    const [values, setValues] = useState<GraphBasicInfoState>({
        title: graphTitle,
        icon: graphIcon,
        tags: currentOpaMapInfo['tags'],
        intro: currentOpaMapInfo['introduction'],
    });
    const [projectEmoji, setProjectEmoji] = useState(graphIcon);
    const [showEmoji, setShowEmoji] = useState(projectEmoji);
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

    // useEffect(()=>{
    //     console.log(currentOpaMapInfo);
    // },[currentOpaMapInfo]);

    const handleChange = (prop: keyof GraphBasicInfoState) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value });
        if (prop === 'title') {
            handleChangeProjectInfo(prop, event.target.value);
        }
    };

    const handleChangeEmoji = (emoji) => {
        console.log(emoji.id);
        setShowEmoji(emoji.id);
    };

    const handleOpenEmojiPicker = () => {
        // if close the picker, means to change the project emoji
        if (openEmojiPicker) {
            setProjectEmoji(showEmoji);
            handleChangeProjectInfo('icon', showEmoji);
        }
        setOpenEmojiPicker(!openEmojiPicker);
    }

    const handleCancelChangeEmoji = () => {
        setShowEmoji(projectEmoji);
        setOpenEmojiPicker(false);
    };

    const handleUpdateKnmInfo = () => {
        let newKnmInfo = {
            title: values.title,
            tags: values.tags,
            introduction: values.intro,
            emoji: showEmoji,
            state: 1,
        };
        console.log(newKnmInfo);
        dispatch(knmUpdate({
            knmId: currentOpaMapInfo["_id"],
            jwt: jwt,
            updateKnmInfo: newKnmInfo,
        }));
    };

    return (
        <React.Fragment>
            <form className={classes.infoPanelForms} noValidate autoComplete="off">
                <div>
                    <Grid container direction="row" justifyContent="space-between">
                        <Grid item className={classes.emojiStyle}>
                            知识地图小图标: <Emoji emoji={openEmojiPicker ? showEmoji : projectEmoji} set='twitter' size={26} />
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
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon />}
                    onClick={handleUpdateKnmInfo}
                >
                    保存基本信息
                </Button>
            </form>
        </React.Fragment>
    );
};