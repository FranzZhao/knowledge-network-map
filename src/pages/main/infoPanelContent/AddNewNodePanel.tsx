import React, { useState } from 'react';
// import MD
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Chip from '@material-ui/core/Chip';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import QueuePlayNextIcon from '@material-ui/icons/QueuePlayNext';
// import react-color
import { CirclePicker } from 'react-color';
// import mock data
import { mockTags } from '../../../settings/mocks/DefaultTags';

const useStyles = makeStyles((theme: Theme) => createStyles({
    infoPanelForms: {
        // marginBottom: theme.spacing(2),
        '&>*': {
            marginBottom: theme.spacing(2),
            width: '100%',
        },
    },
    colorPicker: {
        marginBottom: '0px !important',
    },
}));

interface AddNewNodeState {
    nodeName: string;
    nodeTags: any[];
    nodeIntro: string;
    nodeSize: string;
    nodeColor: string;
};
interface AddNewNodePanelState {
    materialColor: any[];
    handleAddNode: (any) => void;
}
export const AddNewNodePanel: React.FC<AddNewNodePanelState> = ({
    materialColor, handleAddNode
}) => {
    const classes = useStyles();
    // text state
    // {
    //     name: "知识点1：函数的求导",
    //     draggable: true,
    //     symbolSize: [100, 100],
    //     itemStyle: {
    //         color: '#FF963F'
    //     },
    // }
    const [values, setValues] = useState<AddNewNodeState>({
        nodeName: '',
        nodeTags: [],
        nodeIntro: '',
        nodeSize: '',
        nodeColor: materialColor[0],
    });

    // text change
    const handleChangeText = (prop: keyof AddNewNodeState) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [prop]: event.target.value
        });
    }

    // node size select
    const handleChangeNodeSize = (event: React.ChangeEvent<{ value: unknown }>) => {
        setValues({
            ...values,
            nodeSize: event.target.value as string,
        });
    };

    // node color select
    const handleChangeNodeColor = (newNodeColor, event) => {
        setValues({
            ...values,
            nodeColor: newNodeColor.hex
        });
    };

    // handle add node
    const handleAddNewNodeClick = () => {
        // add new node info
        let newNode = {
            name: values.nodeName,
            draggable: true,
            symbolSize: [values.nodeSize, values.nodeSize],
            itemStyle: {
                color: values.nodeColor
            },
        };
        handleAddNode(newNode);
    };

    return (
        <React.Fragment>
            <form className={classes.infoPanelForms} noValidate autoComplete="off">
                <TextField
                    id="knm-node-name"
                    label="知识节点名称"
                    size="small"
                    value={values.nodeName}
                    onChange={handleChangeText('nodeName')}
                />
                <Autocomplete
                    multiple
                    id="tags-filled"
                    options={mockTags.map((option) => option.title)}
                    defaultValue={values.nodeTags}
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
                    size="small"
                    defaultValue={values.nodeIntro}
                    onChange={handleChangeText('nodeIntro')}
                    multiline
                />
                <FormControl>
                    <InputLabel id="demo-simple-select-label">节点大小</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={values.nodeSize}
                        onChange={handleChangeNodeSize}
                    >
                        <MenuItem value={55}>小</MenuItem>
                        <MenuItem value={64}>较小</MenuItem>
                        <MenuItem value={76}>适中</MenuItem>
                        <MenuItem value={88}>较大</MenuItem>
                        <MenuItem value={100}>大</MenuItem>
                    </Select>
                </FormControl>
                <div>节点颜色</div>
                <CirclePicker
                    className={classes.colorPicker}
                    color={values.nodeColor}
                    onChangeComplete={handleChangeNodeColor}
                    colors={materialColor}
                    circleSize={20}
                    width={'350px'}
                />
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<QueuePlayNextIcon />}
                    onClick={handleAddNewNodeClick}
                >
                    新建知识节点
                </Button>
            </form>
        </React.Fragment>
    );
};
