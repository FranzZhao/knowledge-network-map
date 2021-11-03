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
import Button from '@material-ui/core/Button';

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
        minWidth: 800,
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
    isSmall?: boolean;
    buttons?: any[];
    actions?: any[];
}

export const BasicDataTable: React.FC<DataTableState> = ({
    header, rows, isSmall=false, buttons=[], actions=[]
}) => {
    const classes = useStyles();

    return (
        <TableContainer component={Paper} className={classes.tableContainer}>
            <Table
                className={classes.table}
                aria-label="simple table"
                size={isSmall ? "small" : "medium"}
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
                            {/* count */}
                            <TableCell component="th" key={`${index}-number`} scope="row">{index + 1}</TableCell>
                            {/* main contain */}
                            {
                                row.map((item, index) => (
                                    <TableCell key={`${item}-${index}`}>{item}</TableCell>
                                ))
                            }
                            {/* table action */}
                            {
                                buttons.length !== 0 &&
                                <TableCell key={`${index}-button`}>
                                    {
                                        buttons.map((button, index) => {
                                            return (
                                                <React.Fragment key={`${index}-fragment`}>
                                                    &nbsp;<Button
                                                        key={`button-${index}`}
                                                        color="secondary"
                                                        variant="outlined"
                                                        size="small"
                                                        onClick={actions[index]}
                                                    >{button}</Button>
                                                </React.Fragment>
                                            );
                                        })
                                    }
                                </TableCell>
                            }
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
