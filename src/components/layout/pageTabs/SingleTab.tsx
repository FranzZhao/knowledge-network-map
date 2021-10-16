import React from 'react';
// import Style
import styles from './PageTabs.module.css';
import clsx from 'clsx';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
// import Material Component
import { Button, Grid, Tooltip } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
// import emoji
import 'emoji-mart/css/emoji-mart.css';
import { Emoji } from 'emoji-mart';

const useStyle = makeStyles((theme: Theme) => createStyles({
    tabButton: {
        width: 180,
        padding: '0 15px',
        border: '0px',
        borderRadius: '0px',
        color: (theme.palette.type === "light" ?
            theme.palette.primary.main : theme.palette.primary.light),
        '&:hover': {
            border: '0px',
        },
    },
    tabActive: {
        /* secondary:#ffb74d;  primary:#1e88e5 */
        borderBottom: '3px solid #ffb74d !important',
        marginTop: -3,
        // borderTop: (theme.palette.type === "light" ?
        //     '3px solid #ececec !important' : '3px solid #222b3a !important'),
        color: '#dc901f !important',
    },
}));

interface TabState {
    title: string;
    icon: JSX.Element | string;
    isActive?: boolean;
    openTab: (event: any, title: string) => void;
    closeTab: (event: any, title: string) => void;
}

export const SingleTab: React.FC<TabState> = (
    { title, icon, isActive = false, openTab, closeTab }
) => {
    // class style
    const classes = useStyle();

    return (
        <Tooltip title={title} arrow>
            <Button
                key={title}
                className={clsx(
                    styles["tab-button"], classes.tabButton, {
                    [styles["tab-active"]]: isActive,
                    [classes.tabActive]: isActive
                })}
                onClick={(event) => openTab(event, title)}
            >
                <Grid container direction="row" justifyContent="space-between" alignItems="center">
                    {
                        typeof (icon) === 'string' ? (
                            <Grid item xs={1} style={{paddingTop: 8}}>
                                <Emoji emoji={icon} set='twitter' size={20} />
                            </Grid>
                        ) : (
                            <Grid item xs={1} style={{ paddingTop: 8 }}>
                                {icon}
                            </Grid>
                        )

                    }
                    <Grid item xs={10}>
                        <span>{
                            title.length > 6 ? title.substring(0, 6) + '...' : title
                        }</span>
                    </Grid>
                    <Grid item xs={1} style={{ paddingTop: 8 }}>
                        <CloseIcon
                            className={styles["tab-close"]}
                            fontSize="small"
                            onClick={(event) => closeTab(event, title)}
                        />
                    </Grid>
                </Grid>
            </Button>
        </Tooltip>
    );
};