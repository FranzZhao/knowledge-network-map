import React from 'react';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Chip from '@material-ui/core/Chip';

const useStyles1 = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexShrink: 0,
            marginLeft: theme.spacing(2.5),
        },
    }),
);

interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>
    );
};

const useStyles2 = makeStyles((theme: Theme) => createStyles({
    table: {
        minWidth: 300,
    },
    tableHead: {
        backgroundColor: theme.palette.primary.dark,
        "& *": {
            color: theme.palette.common.white,
        }
    },
    tableFooter: {
        overflowX: 'auto',
        '&::-webkit-scrollbar': {
            height: 4,
            backgroundColor: theme.palette.type === 'light' ? '#ffffff' : '#233044',
        },
        '&::-webkit-scrollbar-thumb': {
            background: theme.palette.type === 'light' ? '#cecdcdb8' : '#444a53a6',
            borderRadius: '6px',

        },
    },
    tableRowHover: {
        "&>*:hover": {
            backgroundColor: theme.palette.action.hover,
            cursor: 'pointer',
        },
    }
}));

interface PaginationDataTableState {
    isSmall?: boolean;
    header: any[];
    rows: any[];
    buttons?: any[];
    actions?: any[];
};

export const PaginationDataTable: React.FC<PaginationDataTableState> = ({
    isSmall = false, header, rows, buttons = [], actions = []
}) => {
    const classes = useStyles2();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const colSpan = header.length + 1;
    const maxRow = rows.length;
    // row per pages option
    let pageOption: any[];
    if (maxRow <= 5) {
        pageOption = [5];
    } else if (maxRow < 10) {
        pageOption = [5, { label: 'All', value: -1 }];
    } else if (maxRow < 25) {
        pageOption = [5, 10, { label: 'All', value: -1 }];
    } else {
        pageOption = [5, 10, 25, { label: 'All', value: -1 }];
    }

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="custom pagination table" size={isSmall ? "small" : "medium"}>
                <TableHead className={classes.tableHead}>
                    <TableRow>
                        <TableCell>#</TableCell>
                        {
                            header.map((item, index) => {
                                return (
                                    <TableCell key={`${item}-${index}`}>{item}</TableCell>
                                );
                            })
                        }
                    </TableRow>
                </TableHead>
                <TableBody className={classes.tableRowHover}>
                    {(rowsPerPage > 0
                        ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : rows
                    ).map((row, index) => (
                        <TableRow key={`row-${index}`}>
                            {/* index count */}
                            <TableCell component="th" scope="row" key={`row-${index}-number`}>
                                {(page * rowsPerPage) + (index + 1)}
                            </TableCell>
                            {/* main content */}
                            {
                                row.map((item, index) => {
                                    return (
                                        <TableCell key={`${item}-${index}`}>{item}</TableCell>
                                    );
                                })
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
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            className={classes.tableFooter}
                            rowsPerPageOptions={pageOption}
                            colSpan={colSpan}
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: { 'aria-label': 'rows per page' },
                                native: true,
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}
