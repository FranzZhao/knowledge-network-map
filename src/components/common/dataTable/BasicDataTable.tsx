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
