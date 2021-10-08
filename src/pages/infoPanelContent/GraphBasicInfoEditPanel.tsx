import React, {useState} from 'react';
// import MD
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
// import emoji
import 'emoji-mart/css/emoji-mart.css';
import { Picker, Emoji } from 'emoji-mart';
// import redux
import { useSelector } from '../../redux/hooks';

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

interface GraphBasicInfoState {
    title: string;
    icon: any;
    intro: string;
};

export const GraphBasicInfoEditPanel: React.FC = () => {
    const classes = useStyles();
    // redux
    const currentTag = useSelector(state => state.openPage.currentActivatedTab);
    const currentTheme = useSelector(state => state.changeTheme.currentTheme);
    // component state
    const [values, setValues] = useState<GraphBasicInfoState>({
        title: currentTag.title,
        icon: currentTag.icon,
        intro: '这是一段关于“学习科学知识地图”的简单描述，你可以在这里写下任何有关这一知识地图的相关信息...'
    });

    const handleChange = (prop: keyof GraphBasicInfoState) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value });
    };

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

    const [projectEmoji, setProjectEmoji] = useState('books');
    const [showEmoji, setShowEmoji] = useState(projectEmoji);
    const handleChangeEmoji = (emoji) => {
        setShowEmoji(emoji.id);
    };

    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

    const handleOpenEmojiPicker = () => {
        // if close the picker, means to change the project emoji
        if (openEmojiPicker) {
            setProjectEmoji(showEmoji);
        }
        setOpenEmojiPicker(!openEmojiPicker);
    }

    const handleCancelChangeEmoji = () => {
        setShowEmoji(projectEmoji);
        setOpenEmojiPicker(false);
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
                >
                    保存基本信息
                </Button>
            </form>
        </React.Fragment>
    );
};