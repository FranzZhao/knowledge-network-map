import React, { useState, useEffect } from 'react';
// import MD
import clsx from 'clsx';
import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import { DialogBox, PaginationDataTable, TinyMCE } from '../../../components/common';
// get mock data
import { DefaultDiary } from '../../../settings/mocks/DefaultDiary';
import { mockDiaryTags } from '../../../settings/mocks/DefaultTags';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Autocomplete from '@material-ui/lab/Autocomplete';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import Chip from '@material-ui/core/Chip';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DeleteIcon from '@material-ui/icons/Delete';
// import img
import userHeaderBgImg from '../../../assets/image/loginBackground-1.jpg';
// import redux
import { useSelector } from '../../../redux/hooks';
import { useDispatch } from 'react-redux';
import { createNewDiary, deleteDiary, DiarySlice, getDiaryDetail, getUserDiariesList, updateSpecificDiary } from '../../../redux/user/diarySlice';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        padding: theme.spacing(3),
    },
    userInfoHeader: {
        width: '100%',
        height: 150,
        background: `url(${userHeaderBgImg})`,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        // backgroundColor: 'steelblue',
        display: 'flex',
    },
    userAvatarBox: {
        margin: 'auto',
        marginTop: 90,
    },
    userImg: {
        width: theme.spacing(12),
        height: theme.spacing(12),
        backgroundColor: theme.palette.secondary.main,
        fontWeight: 'bolder',
        fontSize: 40,
        color: theme.palette.common.white,
        textTransform: 'capitalize',
    },
    userInfoBottom: {
        width: '100%',
        height: 100,
        boxShadow: theme.palette.type === 'light' ? '0px 2px 1px #dcdbdb' : '0px 2px 1px #232323',
        backgroundColor: theme.palette.background.paper,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    userInfoBottomWhenSmall: {
        width: '100%',
        // height: 100,
        backgroundColor: theme.palette.background.paper,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    userInfoDetail: {
        padding: '0 40px',
    },
    pageBtn: {
        minWidth: 40,
        width: 40,
        boxShadow: 'none',
        backgroundColor: theme.palette.primary.dark,
    },
    userSpaceContain: {
        marginTop: theme.spacing(3),
        borderRadius: 20,
        width: '100%',
        height: '100%',
        padding: `${theme.spacing(1)}px ${theme.spacing(3)}px`,
        paddingBottom: theme.spacing(3),
        // letterSpacing: 8,
    },
    forms: {
        // marginBottom: theme.spacing(2),
        '&>*': {
            marginBottom: theme.spacing(2),
            width: '100%',
        },
    },
    notebookPropertyLeft: {
        width: 180,
        marginRight: 10,
        fontSize: 16,
        display: 'flex',
        height: 35,
        paddingLeft: 10,
        marginBottom: 10,
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


export const DiarySpace: React.FC = () => {
    const classes = useStyles();
    const [openEditorView, setOpenEditorView] = useState(false);
    const [diariesList, setDiariesList] = useState<any[]>([]);
    const dispatch = useDispatch();
    const jwt = useSelector(state => state.user.token);
    const userDiariesList = useSelector(state => state.diary.userDiariesList);

    useEffect(() => {
        let diariesList: any[] = [];
        // title, tags, text, updatedAt, id
        userDiariesList.map(item => {
            // * tags with Clips
            let tagsText: string[] = item['tags'];
            let tags = (
                <React.Fragment>
                    {
                        tagsText.map((tag, index) => (
                            <React.Fragment key={`tag-${index}`}>
                                <Chip label={tag} color="secondary" size="small" variant="default" />&nbsp;
                            </React.Fragment>
                        ))
                    }
                </React.Fragment>
            );
            // * update time format
            let updateTime = new Date(item['createdAt']).toLocaleString();
            // * button
            let button = (
                <Button
                    size="small"
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleCheckSpecificDiary(item['_id'])}
                >
                    查看
                </Button>
            );
            // * push into diaries list
            diariesList.push([
                item['title'],
                tags,
                updateTime,
                button
            ]);
        });
        setDiariesList(diariesList);
    }, [userDiariesList]);

    const handleCheckSpecificDiary = async (id: string) => {
        const diaryDetail = await dispatch(getDiaryDetail({
            jwt: jwt, diaryId: id
        }));
        // console.log(diaryDetail['payload']);
        setOpenEditorView(true);
    }

    const showDiaryList = async () => {
        await dispatch(getUserDiariesList({
            jwt: jwt
        }));
        setOpenEditorView(false)
    }

    const handleCreateNewDiary = async () => {
        await dispatch(DiarySlice.actions.clearCurrentOpenDiary());
        setOpenEditorView(true);
    }

    return (
        <React.Fragment>
            <div style={{ display: 'flex' }}>
                <div>
                    <h2>日志空间</h2>
                    <div
                        className={classes.notebookPropertyLeft}
                        onClick={showDiaryList}
                    >
                        <AllInboxIcon fontSize="small" />
                        <p>所有日志</p>
                    </div>
                    {/* <div className={classes.notebookPropertyLeft}>
                        <EventNoteIcon fontSize="small" />
                        <p>学习计划</p>
                    </div>
                    <div className={classes.notebookPropertyLeft}>
                        <EmojiObjectsIcon fontSize="small" />
                        <p>学习收获</p>
                    </div>
                    <div className={classes.notebookPropertyLeft}>
                        <CameraIcon fontSize="small" />
                        <p>学习反思</p>
                    </div> */}
                    <div className={classes.notebookPropertyLeft} style={{ color: 'grey' }} onClick={handleCreateNewDiary}>
                        <ControlPointIcon fontSize="small" />
                        <p>新建日志</p>
                    </div>
                </div>
                <div style={{ flex: 1, width: '100%', padding: '10px 0' }}>
                    {
                        openEditorView ? (
                            <DiarySpaceEditView
                                handleOpenListView={() => { setOpenEditorView(false) }}
                            />
                        ) : (
                            <DiarySpaceListView
                                diariesList={diariesList}
                                handleOpenEditorView={() => { setOpenEditorView(true) }}
                            />
                        )
                    }
                </div>
            </div>
        </React.Fragment>
    );
}

const DiarySpaceListView = ({
    handleOpenEditorView, diariesList
}) => {
    return (
        <PaginationDataTable
            header={["日志标题", "标签", "创建时间", "操作"]}
            rows={diariesList}
        />
    );
};

const useEditStyles = makeStyles((theme: Theme) => createStyles({
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

interface DiaryState {
    title: string;
    tags: any[];
    text: string;
}

const DiarySpaceEditView = ({
    handleOpenListView
}) => {
    const classes = useEditStyles();
    const [values, setValues] = useState<DiaryState>({
        title: '',
        tags: [],
        text: '',
    });
    const [isNewDiary, setIsNewDiary] = useState(true);
    // redux
    const dispatch = useDispatch();
    const jwt = useSelector(state => state.user.token);
    const currentOpenDiary = useSelector(state => state.diary.currentOpenDiary);
    const saveDiaryLoading = useSelector(state => state.diary.saveDiaryLoading);
    const deleteDiaryLoading = useSelector(state => state.diary.deleteDiaryLoading);

    useEffect(() => {
        if (currentOpenDiary) {
            setIsNewDiary(false);
            setValues({
                title: currentOpenDiary['title'],
                tags: currentOpenDiary['tags'],
                text: currentOpenDiary['text']
            });
        } else {
            setIsNewDiary(true);
            setValues({
                title: '',
                tags: [],
                text: '',
            });
        }
    }, [currentOpenDiary]);

    // change notebook values
    const handleChangeText = (prop: keyof DiaryState) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [prop]: event.target.value,
        });
    };

    // handle change editor text
    const handleChangeTinyText = (text) => {
        setValues({
            ...values,
            text: text,
        });
    }

    const handleSaveDiary = async () => {
        // create a new diary
        if (isNewDiary) {
            // console.log(values);
            await dispatch(createNewDiary({
                jwt: jwt, diaryInfo: values
            }));
        }
        // update a exist diary
        if (!isNewDiary && currentOpenDiary) {
            await dispatch(updateSpecificDiary({
                jwt: jwt, diaryId: currentOpenDiary['_id'], diaryInfo: values
            }));
        }
    };

    const handleReturnDiariesListView = async () => {
        // renew the userDiariesList
        await dispatch(getUserDiariesList({
            jwt: jwt
        }));
        // return to list view
        handleOpenListView();
    }

    const handleDeleteDiary = async () => {
        // delete diary
        if (currentOpenDiary) {
            setOpenDialog(false);
            await dispatch(deleteDiary({
                jwt: jwt, diaryId: currentOpenDiary['_id']
            }));
            handleReturnDiariesListView();
        }
    };

    const [openDialog, setOpenDialog] = useState(false);
    interface DeleteDiaryState {
        openDialog: boolean;
        handleCloseDialog: () => void;
    }
    const DeleteDiary: React.FC<DeleteDiaryState> = ({
        openDialog, handleCloseDialog
    }) => {
        return (
            <DialogBox
                open={openDialog}
                title={'删除日志'}
                contain={
                    <div>请确认是否删除该日志？注意！<b style={{ color: 'orange' }}>删除后无法恢复！</b></div>
                }
                actions={
                    <>
                        <Button size="small" variant="outlined" color="secondary" onClick={handleCloseDialog}>取消</Button>
                        <Button size="small" variant="text" color="primary" onClick={handleDeleteDiary}>确认</Button>
                    </>
                }
            />
        );
    };

    return (
        <React.Fragment>
            <div className={classes.notebookProperty}>
                <TextField
                    id="knm-node-name"
                    size="small"
                    placeholder="输入日志标题"
                    value={values.title}
                    onChange={handleChangeText('title')}
                    className={clsx(classes.selfDefineInputStyle, classes.notebookTitle)}
                    autoComplete="off"
                />
                <div>
                    <Button
                        variant="text"
                        color="primary"
                        onClick={handleReturnDiariesListView}
                        style={{ marginRight: 10 }}
                        startIcon={<ExitToAppIcon />}
                    >返回列表</Button>
                    &nbsp;
                    {
                        currentOpenDiary &&
                        <Button
                            variant="text"
                            color="primary"
                            onClick={() => setOpenDialog(true)}
                            style={{ marginRight: 10 }}
                            startIcon={
                                deleteDiaryLoading ? (
                                    <CircularProgress style={{ width: 20, height: 20, color: 'orange' }} />
                                ) : (
                                    <DeleteIcon />
                                )
                            }
                        >删除日志</Button>
                    }
                    <DeleteDiary
                        openDialog={openDialog}
                        handleCloseDialog={() => setOpenDialog(false)}
                    />
                    &nbsp;
                    <Button
                        variant="text"
                        color="secondary"
                        startIcon={
                            saveDiaryLoading ? (
                                <CircularProgress style={{ width: 20, height: 20, color: 'orange' }} />
                            ) : (
                                <SaveIcon />
                            )
                        }
                        onClick={handleSaveDiary}
                    >保存日志</Button>
                </div>
            </div>
            <div className={classes.notebookProperty}>
                <div
                    className={classes.notebookPropertyLeft}
                >
                    <LocalOfferIcon fontSize="small" />
                    <p>日志标签</p>
                </div>
                <Autocomplete
                    style={{ width: '100%', flex: 1, marginTop: -3 }}
                    multiple
                    id="tags-filled"
                    options={mockDiaryTags.map((option) => option.title)}
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
            </div>

            <TinyMCE
                type="inline"
                text={values.text}
                handleChangeTinyText={handleChangeTinyText}
            />
        </React.Fragment>
    );
}