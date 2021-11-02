import React, { useState } from 'react';
// import MD
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';
// import Tooltip from '@material-ui/core/Tooltip';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import GestureIcon from '@material-ui/icons/Gesture';
import FontDownloadIcon from '@material-ui/icons/FontDownload';
import TextRotationNoneIcon from '@material-ui/icons/TextRotationNone';
import LayersIcon from '@material-ui/icons/Layers';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Slider from '@material-ui/core/Slider';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CircularProgress from '@material-ui/core/CircularProgress';
// import react-color
import { CirclePicker } from 'react-color';
// redux
import { useSelector } from '../../../../redux/hooks';


const useStyles = makeStyles((theme: Theme) => createStyles({
    panelTitle: {
        fontSize: 16,
        marginTop: 14,
    },
    toggleBtn: {
        width: '100%',
        "& > *": {
            width: 71
        }
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
    smallText: {
        fontSize: 10,
        color: theme.palette.type === 'light' ? '#686d6d' : '#c1c1c1',
        marginBottom: '0px !important',
    },
    sliderStyle: {
        width: '99%',
        marginBottom: '0px !important',
    },
    colorPickerLineStyle: {
        marginTop: 10,
        marginBottom: '-5px !important',
    }
}));

// theme color change
interface ThemeStyleContentState {
    currentColor: string;
    graphColorTheme: string[];
    handleModifyGraph: (target: string, newValue: any) => void;
}
const ThemeStyleContent: React.FC<ThemeStyleContentState> = ({
    currentColor, graphColorTheme, handleModifyGraph
}) => {
    const classes = useStyles();
    const [color, setColor] = useState(currentColor);

    const handleChangeThemeStyle = (color) => {
        setColor(color);
        handleModifyGraph('themeColor', color.hex);
    }

    return (
        <React.Fragment>
            <div className={classes.panelTitle}>主题颜色修改</div>
            <CirclePicker
                className={classes.colorPicker}
                color={color}
                onChangeComplete={handleChangeThemeStyle}
                colors={graphColorTheme}
                circleSize={20}
                width={'350px'}
            />
        </React.Fragment>
    );
};

// link style change
interface EdgeStyleContentState {
    lineColor: string[];
    currentLineType: 'dashed' | 'solid' | 'dotted';
    currentLineColor: string;
    currentLineWidth: number | number[];
    currentLineOpacity: number | number[];
    currentLineCurveness: number | number[];
    handleModifyGraph: (target: string, newValue: any) => void;
}
const EdgeStyleContent: React.FC<EdgeStyleContentState> = ({
    lineColor, currentLineType, currentLineColor, currentLineWidth,
    currentLineOpacity, currentLineCurveness, handleModifyGraph
}) => {
    const classes = useStyles();
    const [values, setValues] = useState({
        lineType: currentLineType,
        lineColor: currentLineColor,
        lineWidth: currentLineWidth,
        lineOpacity: currentLineOpacity,
        lineCurveness: currentLineCurveness,
    });

    // line style change
    const handleChangeLineType = (event: React.ChangeEvent<{ value: any }>) => {
        let newLineType = event.target.value as 'dashed' | 'solid' | 'dotted';
        setValues({
            ...values,
            lineType: newLineType,
        });
        handleModifyGraph('lineStyleType', newLineType);
    };

    // line color change
    const handleChangeLineColor = (color) => {
        setValues({
            ...values,
            lineColor: color.hex,
        });
        handleModifyGraph('lineStyleColor', color.hex);
    };

    const handleChangeLineWidth = (event: any, newValue: number | number[]) => {
        setValues({
            ...values,
            lineWidth: newValue,
        });
        handleModifyGraph('lineStyleWidth', newValue);
    }

    const handleChangeLineOpacity = (event: any, newValue: number | number[]) => {
        setValues({
            ...values,
            lineOpacity: newValue,
        });
        handleModifyGraph('lineStyleOpacity', newValue);
    };

    const handleChangeLineCurveness = (event: any, newValue: number | number[]) => {
        setValues({
            ...values,
            lineCurveness: newValue,
        });
        handleModifyGraph('lineStyleCurveness', newValue);
    };

    return (
        <React.Fragment>
            <div className={classes.panelTitle}>关联线样式修改</div>
            <FormControl>
                <InputLabel id="demo-simple-select-label">关联线类型</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={values.lineType}
                    onChange={handleChangeLineType}
                >
                    <MenuItem value={'dashed'}>虚线</MenuItem>
                    <MenuItem value={'solid'}>实线</MenuItem>
                    <MenuItem value={'dotted'}>点线</MenuItem>
                </Select>
            </FormControl>
            <p className={classes.smallText}>线条颜色</p>
            <CirclePicker
                className={classes.colorPickerLineStyle}
                color={values.lineColor}
                onChangeComplete={handleChangeLineColor}
                colors={lineColor}
                circleSize={20}
                width={'350px'}
            />
            <p className={classes.smallText}>线条宽度</p>
            <Slider
                className={classes.sliderStyle}
                value={typeof values.lineWidth === 'number' ? values.lineWidth : 0}
                onChange={handleChangeLineWidth}
                aria-labelledby="discrete-slider-small-steps"
                step={0.1}
                marks
                min={0.0}
                max={2.0}
                valueLabelDisplay="auto"
            />
            <p className={classes.smallText}>线条透明度</p>
            <Slider
                className={classes.sliderStyle}
                value={typeof values.lineOpacity === 'number' ? values.lineOpacity : 0}
                onChange={handleChangeLineOpacity}
                aria-labelledby="discrete-slider-small-steps"
                step={0.02}
                marks
                min={0.0}
                max={1.0}
                valueLabelDisplay="auto"
            />
            <p className={classes.smallText}>线条曲度</p>
            <Slider
                className={classes.sliderStyle}
                value={typeof values.lineCurveness === 'number' ? values.lineCurveness : 0}
                onChange={handleChangeLineCurveness}
                aria-labelledby="discrete-slider-small-steps"
                step={0.02}
                marks
                min={0.0}
                max={1.0}
                valueLabelDisplay="auto"
            />
        </React.Fragment>
    );
};

// node font style change
interface NodeFontStyleState {
    currentLabelFontSize: number | number[];
    currentLabelPosition: 'top' | 'left' | 'right' | 'bottom' | 'inside';
    handleModifyGraph: (target: string, newValue: any) => void;
}
const NodeFontStyle: React.FC<NodeFontStyleState> = ({
    currentLabelFontSize, currentLabelPosition, handleModifyGraph
}) => {
    const classes = useStyles();
    const [values, setValues] = useState({
        labelFontSize: currentLabelFontSize,
        labelPosition: currentLabelPosition,
    });

    const handleChangeLabelFontSize = (event: any, newValue: number | number[]) => {
        setValues({
            ...values,
            labelFontSize: newValue,
        });
        handleModifyGraph('labelFontSize', newValue);
    }

    const handleChangeLabelPosition = (event: React.ChangeEvent<{ value: any }>) => {
        let newLabelPosition = event.target.value as 'top' | 'left' | 'right' | 'bottom' | 'inside';
        setValues({
            ...values,
            labelPosition: newLabelPosition,
        });
        handleModifyGraph('labelPosition', newLabelPosition);
    };

    return (
        <React.Fragment>
            <div className={classes.panelTitle}>节点标签字体样式修改</div>
            <p className={classes.smallText}>标签字体大小</p>
            <Slider
                className={classes.sliderStyle}
                value={values.labelFontSize}
                onChange={handleChangeLabelFontSize}
                aria-labelledby="discrete-slider-small-steps"
                step={1}
                marks
                min={10}
                max={24}
                valueLabelDisplay="auto"
            />
            <FormControl>
                <InputLabel id="demo-simple-select-label">标签位置</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={values.labelPosition}
                    onChange={handleChangeLabelPosition}
                >
                    <MenuItem value={'top'}>顶部</MenuItem>
                    <MenuItem value={'left'}>左侧</MenuItem>
                    <MenuItem value={'right'}>右侧</MenuItem>
                    <MenuItem value={'bottom'}>底部</MenuItem>
                    <MenuItem value={'inside'}>内部</MenuItem>
                </Select>
            </FormControl>
        </React.Fragment>
    );
};

// edge font style change
interface EdgeFontStyleState {
    currentEdgeLabelFontSize: number | number[];
    handleModifyGraph: (target: string, newValue: any) => void;
}
const EdgeFontStyle: React.FC<EdgeFontStyleState> = ({
    currentEdgeLabelFontSize, handleModifyGraph
}) => {
    const classes = useStyles();
    const [values, setValues] = useState(currentEdgeLabelFontSize);

    const handleChangeEdgeLabelFontSize = (event: any, newValue: number | number[]) => {
        setValues(newValue);
        handleModifyGraph('edgeLabelFontSize', newValue);
    }

    return (
        <React.Fragment>
            <div className={classes.panelTitle}>节点关联线字体样式修改</div>
            <p className={classes.smallText}>关联线字体大小</p>
            <Slider
                className={classes.sliderStyle}
                value={values}
                onChange={handleChangeEdgeLabelFontSize}
                aria-labelledby="discrete-slider-small-steps"
                step={1}
                marks
                min={8}
                max={20}
                valueLabelDisplay="auto"
            />
        </React.Fragment>
    );
};

// layout change
interface LayoutStyleState {
    currentLayout: 'force' | 'circular';
    currentForcePower: number | number[];
    handleModifyGraph: (target: string, newValue: any) => void;
}
const LayoutStyle: React.FC<LayoutStyleState> = ({
    currentLayout, currentForcePower, handleModifyGraph
}) => {
    const classes = useStyles();
    const [values, setValues] = useState({
        layout: currentLayout,
        forcePower: currentForcePower,
    });

    const handleChangeLayout = (event: React.ChangeEvent<HTMLInputElement>) => {
        let newLayout = event.target.value as 'force' | 'circular';
        setValues({
            ...values,
            layout: newLayout
        });
        handleModifyGraph('layout', newLayout);
    };

    const handleChangeForcePower = (event: any, newValue: number | number[]) => {
        setValues({
            ...values,
            forcePower: newValue
        });
        handleModifyGraph('forcePower', newValue);
    }

    return (
        <React.Fragment>
            <div className={classes.panelTitle}>地图布局样式</div>
            <RadioGroup
                row aria-label="position" name="position"
                value={values.layout}
                onChange={handleChangeLayout}
            >
                <FormControlLabel
                    value="force"
                    control={<Radio color="primary" />}
                    label="力引导图"
                    labelPlacement="end"
                />
                <FormControlLabel
                    value="circular"
                    control={<Radio color="primary" />}
                    label="环形图"
                    labelPlacement="end"
                />
            </RadioGroup>
            {
                values.layout === 'force' &&
                <>
                    <div>力引导图布局设置</div>
                    <p className={classes.smallText}>节点互斥大小</p>
                    <Slider
                        className={classes.sliderStyle}
                        value={values.forcePower}
                        onChange={handleChangeForcePower}
                        aria-labelledby="discrete-slider-small-steps"
                        step={1}
                        marks
                        min={1}
                        max={100}
                        valueLabelDisplay="auto"
                    />
                </>
            }
        </React.Fragment>
    );
};

interface KnowledgeGraphState {
    node: any[];
    link: any[];
    relations: any[];
    themeColor: string; // 主题颜色
    lineStyleType: 'solid' | 'dashed' | 'dotted';   //关联线样式
    lineStyleColor: string;     // 关联线颜色
    lineStyleWidth: number;     // 关联线宽度
    lineStyleOpacity: number;   // 关联线透明度
    lineStyleCurveness: number; // 关联线曲度
    labelFontSize: number;         //节点标签字体大小
    labelPosition: 'top' | 'left' | 'right' | 'bottom' | 'inside';
    edgeLabelFontSize: number;
    layout: 'force' | 'circular';
    forcePower: number;
};
interface ModifyGraphThemePanelState {
    currentGraphThemeOption: KnowledgeGraphState;
    graphColorTheme: string[];
    lineColor: string[];
    handleModifyGraph: (target: string, newValue: any) => void;
    handleSaveGraphTheme: () => void;
}
export const ModifyGraphThemePanel: React.FC<ModifyGraphThemePanelState> = ({
    currentGraphThemeOption, graphColorTheme, lineColor, handleModifyGraph, handleSaveGraphTheme
}) => {
    const classes = useStyles();
    const graphLoading = useSelector(state => state.graph.loading);
    const [alignment, setAlignment] = React.useState<string>('theme');

    const handleAlignment = (event, newAlignment) => {
        if (newAlignment !== null) {
            setAlignment(newAlignment);
        }
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
                <ToggleButton value="theme" aria-label="left aligned">
                    <ColorLensIcon fontSize="small" />
                </ToggleButton>

                <ToggleButton value="edge" aria-label="centered">
                    <GestureIcon fontSize="small" />
                </ToggleButton>
                <ToggleButton value="nodeFont" aria-label="right aligned">
                    <FontDownloadIcon fontSize="small" />
                </ToggleButton>
                <ToggleButton value="edgeFont" aria-label="justified" >
                    <TextRotationNoneIcon fontSize="small" />
                </ToggleButton>
                <ToggleButton value="layout" aria-label="justified" >
                    <LayersIcon fontSize="small" />
                </ToggleButton>
            </ToggleButtonGroup>
            <form className={classes.infoPanelForms} noValidate autoComplete="off">
                {
                    alignment === 'theme' &&
                    <ThemeStyleContent
                        currentColor={currentGraphThemeOption.themeColor}
                        graphColorTheme={graphColorTheme}
                        handleModifyGraph={handleModifyGraph}
                    />
                }
                {
                    alignment === 'edge' &&
                    <EdgeStyleContent
                        lineColor={lineColor}
                        currentLineType={currentGraphThemeOption.lineStyleType}
                        currentLineColor={currentGraphThemeOption.lineStyleColor}
                        currentLineWidth={currentGraphThemeOption.lineStyleWidth}
                        currentLineOpacity={currentGraphThemeOption.lineStyleOpacity}
                        currentLineCurveness={currentGraphThemeOption.lineStyleCurveness}
                        handleModifyGraph={handleModifyGraph}
                    />
                }
                {
                    alignment === 'nodeFont' &&
                    <NodeFontStyle
                        currentLabelFontSize={currentGraphThemeOption.labelFontSize}
                        currentLabelPosition={currentGraphThemeOption.labelPosition}
                        handleModifyGraph={handleModifyGraph}
                    />
                }
                {
                    alignment === 'edgeFont' &&
                    <EdgeFontStyle
                        currentEdgeLabelFontSize={currentGraphThemeOption.edgeLabelFontSize}
                        handleModifyGraph={handleModifyGraph}
                    />
                }
                {
                    alignment === 'layout' &&
                    <LayoutStyle
                        currentLayout={currentGraphThemeOption.layout}
                        currentForcePower={currentGraphThemeOption.forcePower}
                        handleModifyGraph={handleModifyGraph}
                    />
                }
                <Button
                    variant="contained"
                    color="primary"
                    endIcon={
                        graphLoading ? (
                            <CircularProgress style={{ width: 20, height: 20, color: 'white' }} />
                        ) : (
                            <SaveIcon />
                        )
                    }
                    onClick={handleSaveGraphTheme}
                >
                    保存当前主题样式
                </Button>
            </form>
        </React.Fragment >
    );
};
