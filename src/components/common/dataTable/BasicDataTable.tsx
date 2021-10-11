import React from 'react';
// import MD
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme: Theme) => createStyles({
    toolBarPaper: {
        borderRadius: 0,
    },
    toolBar: {
        height: '47px',
    },
    paper: {
        display: 'flex',
        flexWrap: 'wrap',
        borderRadius: 0,
        height: '47px',
        lineHeight: '47px',
        boxShadow: 'none',
    },
    divider: {
        margin: theme.spacing(1, 0.5),
    },
    graphTitle: {
        paddingLeft: 20,
        fontSize: 18,
    },
    toolBarButtons: {
        "& > *": {
            color: theme.palette.type === 'light' ? theme.palette.grey[500] : theme.palette.grey[200],
            minWidth: 50,
        },
        " & > *:hover ": {
            borderRadius: 'none',
        }
    },
    openHiddenToolBar: {
        color: theme.palette.grey[600],
        minWidth: 40,
        width: 40,
        minHeight: 40,
        borderRadius: 20,
        // marginRight: 10,
    },
    hiddenToolBar: {
        zIndex: 10,
    },
    hiddenToolBarBtn: {
        marginTop: 4,
        zIndex: 20,
        "& > *": {
            color: theme.palette.grey[500],
            minWidth: 40,
            width: 40,
            minHeight: 40,
            borderRadius: 20,
            margin: '2px 0px',
        }
    },
    hide: {
        display: 'none',
    },
    infoPanel: {
        flex: 'flow',
        position: 'fixed',
        top: 97,
        right: 0,
        padding: 20,
        backgroundColor: theme.palette.type === "light" ? '#e3eded' : '#303030',
        width: 400,
        height: 'calc(100vh - 97px)',
        borderRadius: 0,
        boxShadow: 'none',
        overflow: 'hidden',
        "&:hover": {
            paddingRight: 15,
            overflow: 'auto',
            '&::-webkit-scrollbar': {
                width: 5,
                backgroundColor: theme.palette.type === 'light' ? '#e3eded' : '#424242',
            },
            '&::-webkit-scrollbar-thumb': {
                background: theme.palette.type === 'light' ? '#ffb74d' : '#707070b3',
                borderRadius: '8px',
            },
        },
    },
    infoPanelTitle: {
        fontSize: '18px !important',
    },
    infoPanelCloseBtn: {
        marginTop: 3,
        "&:hover": {
            cursor: 'pointer',
            color: theme.palette.error.main,
        }
    },
    infoPanelForms: {
        // marginBottom: theme.spacing(2),
        '&>*': {
            marginBottom: theme.spacing(2),
            width: '100%',
        },
    },
    tableContainer: {
        overflow: 'auto',
        '&::-webkit-scrollbar': {
            height: 5,
            backgroundColor: theme.palette.type === 'light' ? '#ffffff' : '#424242',
        },
        '&::-webkit-scrollbar-thumb': {
            background: theme.palette.type === 'light' ? '#c2c2c2' : '#707070b3',
            borderRadius: '6px',
        },
    },
    table: {
        minWidth: 650,
    },
    tableHead: {
        backgroundColor: theme.palette.primary.dark,
        "& *": {
            color: theme.palette.common.white,
        }
    },
    tableBody: {
        "&>*:hover": {
            backgroundColor: theme.palette.action.hover,
            cursor: 'pointer',
        },
    },
}));

interface DataTableState {
    header: any[];
    rows: any[];
}

export const BasicDataTable: React.FC<DataTableState> = ({
    header, rows
}) => {
    const classes = useStyles();

    return (
        <TableContainer component={Paper} className={classes.tableContainer}>
            <Table
                className={classes.table}
                aria-label="simple table"
                size="small"
            >
                <TableHead className={classes.tableHead}>
                    <TableRow>
                        <TableCell>#</TableCell>
                        {
                            header.map((item) => (
                                <TableCell key={item}>{item}</TableCell>
                            ))
                        }
                    </TableRow>
                </TableHead>
                <TableBody className={classes.tableBody}>
                    {rows.map((row, index) => (
                        <TableRow key={`${index + 1}`}>
                            <TableCell component="th" scope="row">{index + 1}</TableCell>
                            {
                                row.map((item) => (
                                    <TableCell key={`${item}-${index + 1}`}>{item}</TableCell>
                                ))
                            }
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
