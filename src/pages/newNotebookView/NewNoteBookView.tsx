import React, { useState } from 'react';
// import customize components
import { TinyMCE } from '../../components/common';
// import MD
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SaveIcon from '@material-ui/icons/Save';
// import mock data
import { mockTags } from '../../settings/mocks/DefaultTags';
import Chip from '@material-ui/core/Chip';

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

export const NewNoteBookView = () => {
    const classes = useStyles();
    const [values, setValues] = useState({
        tags: [],
    });
    return (
        <React.Fragment>
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <h1>新建知识笔记</h1>
                <Button 
                    variant="contained" 
                    color="primary"
                    startIcon={<SaveIcon />}
                >保存笔记</Button>
            </Grid>
            <form className={classes.infoPanelForms} noValidate autoComplete="off">
                <Grid container spacing={1} style={{ width: '100%' }}>
                    <Grid item lg={6}>
                        <TextField
                            id="knm-node-name"
                            label="知识地图标题"
                            size="small"
                            // value={'这是默认的知识笔记标题'}
                            style={{ width: '100%' }}
                        // onChange={handleChange('title')}
                        />
                    </Grid>
                    <Grid item lg={6}>
                        <TextField
                            id="knm-node-name"
                            label="引用信息"
                            size="small"
                            placeholder="建议使用(人名, 日期)格式"
                            // value={'这是默认的知识标签'}
                            style={{ width: '100%' }}
                        // onChange={handleChange('title')}
                        />
                    </Grid>
                </Grid>
                <Autocomplete
                    style={{ width: '100%' }}
                    multiple
                    id="tags-filled"
                    options={mockTags.map((option) => option.title)}
                    defaultValue={values.tags}
                    freeSolo
                    renderTags={(value: string[], getTagProps) =>
                        value.map((option: string, index: number) => (
                            <Chip variant="outlined" label={option} size="small" color="primary" {...getTagProps({ index })} />
                        ))
                    }
                    renderInput={(params) => (
                        <TextField {...params} label="知识节点标签" placeholder="选择或输入标签" />
                    )}
                />
                <TextField
                    id="knm-node-name"
                    label="知识地图简介"
                    size="small"
                    multiline
                // value={'这是默认的引用'}
                // onChange={handleChange('title')}
                />
                <TinyMCE />
            </form>

        </React.Fragment>
    )
}
