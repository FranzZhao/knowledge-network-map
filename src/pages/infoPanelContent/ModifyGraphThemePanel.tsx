import React, {useState} from 'react';
// import MD
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';
import Tooltip from '@material-ui/core/Tooltip';
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
import QueuePlayNextIcon from '@material-ui/icons/QueuePlayNext';

// import react-color
import { CirclePicker } from 'react-color';

const useStyles = makeStyles((theme: Theme) => createStyles({
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
        marginBottom: '0px !important',
    },
}));

interface ModifyGraphThemeState {
    graphColor: string;
    lineType: 'dashed' | 'solid' | 'dotted';
};

interface ModifyGraphThemePanel {
    graphColorTheme: any[];
}
export const ModifyGraphThemePanel: React.FC<ModifyGraphThemePanel> = ({
    graphColorTheme
}) => {
    const classes = useStyles();
    const [values, setValues] = useState<ModifyGraphThemeState>({
        graphColor: graphColorTheme[0],
        lineType: 'dashed',
    });
    const handleChangeGraphColor = (color, event) => {
        setValues({
            ...values,
            graphColor: color,
        });
    };

    const handleChangeSelect = (prop: keyof ModifyGraphThemeState) => (event: React.ChangeEvent<{ value: unknown }>) => {
        setValues({
            ...values,
            [prop]: event.target.value,
        });
    };

    const [alignment, setAlignment] = React.useState<string | null>('left');

    const handleAlignment = (event: React.MouseEvent<HTMLElement>, newAlignment: string | null) => {
        setAlignment(newAlignment);
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

                <ToggleButton value="left" aria-label="left aligned">
                    <Tooltip title="主题样式修改" arrow placement="bottom">
                        <ColorLensIcon fontSize="small" />
                    </Tooltip>
                </ToggleButton>

                <Tooltip title="关联线样式修改" arrow placement="bottom">
                    <ToggleButton value="center" aria-label="centered">
                        <GestureIcon fontSize="small" />
                    </ToggleButton>
                </Tooltip>
                <Tooltip title="节点字体修改" arrow placement="bottom">
                    <ToggleButton value="right" aria-label="right aligned">
                        <FontDownloadIcon fontSize="small" />
                    </ToggleButton>
                </Tooltip>
                <Tooltip title="关联线字体修改" arrow placement="bottom">
                    <ToggleButton value="justify" aria-label="justified" >
                        <TextRotationNoneIcon fontSize="small" />
                    </ToggleButton>
                </Tooltip>
                <Tooltip title="布局修改" arrow placement="bottom">
                    <ToggleButton value="justify1" aria-label="justified" >
                        <LayersIcon fontSize="small" />
                    </ToggleButton>
                </Tooltip>
            </ToggleButtonGroup>
            <form className={classes.infoPanelForms} noValidate autoComplete="off">
                <div>主题颜色修改</div>
                <CirclePicker
                    className={classes.colorPicker}
                    color={values.graphColor}
                    onChangeComplete={handleChangeGraphColor}
                    colors={graphColorTheme}
                    circleSize={20}
                    width={'350px'}
                />
                <div>关联线样式修改</div>
                <FormControl>
                    <InputLabel id="demo-simple-select-label">关联线类型</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={values.lineType}
                        onChange={handleChangeSelect('lineType')}
                    >
                        <MenuItem value={'dashed'}>dashed</MenuItem>
                        <MenuItem value={'solid'}>solid</MenuItem>
                        <MenuItem value={'dotted'}>dotted</MenuItem>
                    </Select>
                </FormControl>
                <p className={classes.smallText}>线条颜色</p>
                <CirclePicker
                    className={classes.colorPicker}
                    // color={values.graphColor}
                    // onChangeComplete={handleChangeGraphColor}
                    colors={['#ffffff', '#ff9800', '#ffeb3b', '#ff5722', '#8bc34a', '#2d6986', '#1b3436', '#194d48', '#862d4b', '#232323']}
                    circleSize={20}
                    width={'350px'}
                />
                <p className={classes.smallText}>线条宽度</p>
                <Slider
                    className={classes.sliderStyle}
                    defaultValue={0.5}
                    // getAriaValueText={valuetext}
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
                    defaultValue={0.5}
                    // getAriaValueText={valuetext}
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
                    defaultValue={0.2}
                    // getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider-small-steps"
                    step={0.02}
                    marks
                    min={0.0}
                    max={1.0}
                    valueLabelDisplay="auto"
                />

                <div>节点标签字体样式修改</div>
                <p className={classes.smallText}>标签字体大小</p>
                <Slider
                    className={classes.sliderStyle}
                    defaultValue={14}
                    // getAriaValueText={valuetext}
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
                        value={'inside'}
                    // onChange={handleChangeSelect('lineType')}
                    >
                        <MenuItem value={'top'}>top</MenuItem>
                        <MenuItem value={'left'}>left</MenuItem>
                        <MenuItem value={'right'}>right</MenuItem>
                        <MenuItem value={'bottom'}>bottom</MenuItem>
                        <MenuItem value={'inside'}>inside</MenuItem>
                    </Select>
                </FormControl>

                <div>节点关联线字体样式修改</div>
                <p className={classes.smallText}>关联线字体大小</p>
                <Slider
                    className={classes.sliderStyle}
                    defaultValue={14}
                    // getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider-small-steps"
                    step={1}
                    marks
                    min={10}
                    max={24}
                    valueLabelDisplay="auto"
                />

                <div>地图布局样式</div>
                <RadioGroup row aria-label="position" name="position" defaultValue="force">
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

                <div>力引导图布局设置(选择力引导图才有)</div>
                <p className={classes.smallText}>节点互斥大小</p>
                <Slider
                    className={classes.sliderStyle}
                    defaultValue={40}
                    // getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider-small-steps"
                    step={1}
                    marks
                    min={1}
                    max={100}
                    valueLabelDisplay="auto"
                />

                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<QueuePlayNextIcon />}
                >
                    修改主题样式
                </Button>
            </form>
        </React.Fragment>
    );
};
