import React, { useEffect, useState } from 'react';
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
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
// import Tooltip from '@material-ui/core/Tooltip';
import FormatShapesIcon from '@material-ui/icons/FormatShapes';
// import react-color
import { CirclePicker } from 'react-color';
// import mock data
import { mockTags } from '../../../settings/mocks/DefaultTags';
import { rows } from '../../../settings/mocks/DefaultNotebooks';
// import redux
import { useSelector } from '../../../redux/hooks';
import { useDispatch } from 'react-redux';
import { updateNodeInfo } from '../../../redux/knm/nodeSlice';

const useStyles = makeStyles((theme: Theme) => createStyles({
    toggleBtn: {
        width: '100%',
        "& > *": {
            width: '50%'
        }
    },
    infoPanelTitle: {
        fontSize: '18px !important',
    },
    panelSubTitle: {
        fontSize: 16,
        marginTop: 14,
    },
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

interface NodeInfoEditPanelState {
    nodeName: string;
    materialColor: any[];
};

interface NodeInfoState {
    nodeId: string;
    nodeName: string;
    nodeTags: any[];
    nodeIntro: string;
    nodeSize: string;
    nodeColor: string;
};
export const NodeInfoEditPanel: React.FC<NodeInfoEditPanelState> = ({
    nodeName, materialColor
}) => {
    const classes = useStyles();
    const [values, setValues] = useState<NodeInfoState>({
        nodeId: '',
        nodeName: nodeName,
        nodeTags: [],
        nodeIntro: '',
        nodeSize: '',
        nodeColor: materialColor[0],
    });
    const [alignment, setAlignment] = React.useState<string>('info');
    // redux
    const dispatch = useDispatch();
    const currenOpenGraphInfo = useSelector(state => state.graph.currentOpenGraphInfo);
    const jwt = useSelector(state => state.user.token);
    const currentOpenGraphInfo = useSelector(state => state.graph.currentOpenGraphInfo);

    useEffect(()=>{
        // get node info base nodeName
        currenOpenGraphInfo['nodes'].map(node => {
            if (node['name'] === nodeName){
                setValues({
                    nodeId: node["_id"],
                    nodeName: node["name"],
                    nodeTags: node["tags"],
                    nodeIntro: node["introduction"],
                    nodeSize: node["size"],
                    nodeColor: node["color"],
                });
            }
        });
    },[nodeName]);

    const handleAlignment = (event, newAlignment) => {
        if (newAlignment !== null) {
            setAlignment(newAlignment);
        }
    };

    // text change
    const handleChangeText = (prop: keyof NodeInfoState) => (event: React.ChangeEvent<HTMLInputElement>) => {
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

    // handle click update node info
    const handleUpdateKnmInfo = () => {
        // console.log(values);
        // console.log(currentOpenGraphInfo);
        dispatch(updateNodeInfo({
            jwt: jwt,
            nodeInfo: values,
            graphId: currentOpenGraphInfo["_id"],
            nodeId: values.nodeId,
        }));
    };

    return (
        <React.Fragment>
            <ToggleButtonGroup
                value={alignment}
                exclusive
                onChange={handleAlignment}
                aria-label="text alignment"
                size="small"
                className={classes.toggleBtn}
            >
                <ToggleButton value="info" aria-label="left aligned">
                    <FormatShapesIcon fontSize="small" />
                </ToggleButton>

                <ToggleButton value="notebook" aria-label="centered">
                    <LibraryBooksIcon fontSize="small" />
                </ToggleButton>
            </ToggleButtonGroup>
            {
                alignment === 'info' &&
                <form className={classes.infoPanelForms} noValidate autoComplete="off">
                    <div className={classes.panelSubTitle}>节点信息编辑</div>
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
                        value={values.nodeTags}
                        onChange={(event, newValue) => {
                            setValues({
                                ...values,
                                nodeTags: newValue
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
                        id="knm-node-intro"
                        label="知识节点简介"
                        size="small"
                        value={values.nodeIntro}
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
                        endIcon={<SaveIcon />}
                        onClick={handleUpdateKnmInfo}
                    >
                        保存节点信息
                    </Button>
                </form>
            }
            {
                alignment === 'notebook' &&
                <div>
                    <div className={classes.panelSubTitle} style={{ marginBottom: 10 }}>知识节点笔记列表</div>
                    <BasicDataTable
                        isSmall={true}
                        header={["笔记标题", "引用", "笔记标签", "更新时间", "操作"]}
                        rows={rows}
                        buttons={['查看']}
                        actions={[() => { alert('查看笔记'); }]}
                    />
                </div>
            }
        </React.Fragment>
    );
};