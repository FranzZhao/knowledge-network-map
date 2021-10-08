import React, {useState} from 'react';
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
// import mock data
import { mockTags } from '../../settings/mocks/DefaultTags';

const useStyles = makeStyles((theme: Theme) => createStyles({
    infoPanelForms: {
        '&>*': {
            marginBottom: theme.spacing(2),
            width: '100%',
        },
    },
}));

interface AddNewLinkState {
    linkName: string;
    linkTags: any[];
    linkIntro: string;
    linkStart: string;
    linkEnd: string;
}

export const AddNewLinkPanel: React.FC = () => {
    const classes = useStyles();
    const [values, setValues] = useState<AddNewLinkState>({
        linkName: '',
        linkTags: [],
        linkIntro: '',
        linkStart: '',
        linkEnd: '',
    });

    const handleChangeText = (prop: keyof AddNewLinkState) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [prop]: event.target.value
        });
    }

    const handleChangeLinkNodes = (prop: keyof AddNewLinkState) => (event: React.ChangeEvent<{ value: unknown }>) => {
        setValues({
            ...values,
            [prop]: event.target.value as string,
        });
    };

    return (
        <React.Fragment>
            <form className={classes.infoPanelForms} noValidate autoComplete="off">
                <TextField
                    id="knm-node-name"
                    label="知识关联名称"
                    size="small"
                    value={values.linkName}
                    onChange={handleChangeText('linkName')}
                />
                <Autocomplete
                    multiple
                    id="tags-filled"
                    options={mockTags.map((option) => option.title)}
                    defaultValue={values.linkTags}
                    freeSolo
                    renderTags={(value: string[], getTagProps) =>
                        value.map((option: string, index: number) => (
                            <Chip variant="outlined" label={option} size="small" color="primary" {...getTagProps({ index })} />
                        ))
                    }
                    renderInput={(params) => (
                        <TextField {...params} label="知识关联标签" placeholder="选择或输入标签" />
                    )}
                />
                <TextField
                    id="knm-node-intro"
                    label="知识关联简介"
                    size="small"
                    value={values.linkIntro}
                    onChange={handleChangeText('linkIntro')}
                    multiline
                />
                <FormControl>
                    <InputLabel id="demo-simple-select-label">起始节点</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={values.linkStart}
                        onChange={handleChangeLinkNodes('linkStart')}
                    >
                        <MenuItem value={55}>知识点1</MenuItem>
                        <MenuItem value={64}>知识点2</MenuItem>
                        <MenuItem value={76}>知识点3</MenuItem>
                        <MenuItem value={88}>知识点4</MenuItem>
                        <MenuItem value={100}>知识点5</MenuItem>
                    </Select>
                </FormControl>
                <FormControl>
                    <InputLabel id="demo-simple-select-label">目标节点</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={values.linkEnd}
                        onChange={handleChangeLinkNodes('linkEnd')}
                    >
                        <MenuItem value={55}>知识点1</MenuItem>
                        <MenuItem value={64}>知识点2</MenuItem>
                        <MenuItem value={76}>知识点3</MenuItem>
                        <MenuItem value={88}>知识点4</MenuItem>
                        <MenuItem value={100}>知识点5</MenuItem>
                    </Select>
                </FormControl>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<QueuePlayNextIcon />}
                >
                    新建知识关联
                </Button>
            </form>
        </React.Fragment>
    );
};
