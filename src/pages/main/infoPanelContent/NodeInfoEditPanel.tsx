import React from 'react';
// import customize components
import { BasicDataTable } from '../../../components/common';
// import MD
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import SaveIcon from '@material-ui/icons/Save';
// import mock data
import { mockTags } from '../../../settings/mocks/DefaultTags';
import { rows } from '../../../settings/mocks/DefaultNotebooks';


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
}));

interface NodeInfoEditPanelState {
    nodeName: string;
};

export const NodeInfoEditPanel: React.FC<NodeInfoEditPanelState> = ({
    nodeName
}) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <form className={classes.infoPanelForms} noValidate autoComplete="off">
                <TextField
                    id="knm-node-name"
                    label="知识节点名称"
                    // variant="outlined" 
                    size="small"
                    value={nodeName}
                />
                <Autocomplete
                    multiple
                    id="tags-filled"
                    options={mockTags.map((option) => option.title)}
                    defaultValue={[mockTags[0].title]}
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
                    id="knm-node-intro"
                    label="知识节点简介"
                    // variant="outlined"
                    size="small"
                    defaultValue="这是一段关于“函数的求导”节点的信息简介..."
                    multiline
                // rows={4}
                />
                <TextField
                    id="knm-node-style"
                    label="知识节点样式选择"
                    // variant="outlined" 
                    size="small"
                    defaultValue="默认样式"
                />
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon />}
                >
                    保存节点信息
                </Button>
            </form>
            <Divider style={{ marginBottom: 10 }} />
            <Typography
                variant="h6" gutterBottom
                className={classes.infoPanelTitle}
            >知识节点 | 笔记列表</Typography>
            <BasicDataTable
                header={["笔记标题", "引用", "笔记标签", "更新时间"]}
                rows={rows}
            />
        </React.Fragment>
    );
};