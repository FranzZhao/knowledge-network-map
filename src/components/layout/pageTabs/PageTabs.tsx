import React, { useState, useEffect } from 'react';
// import css style
import clsx from 'clsx';
import styles from './PageTabs.module.css';
// import MD components
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { ButtonGroup } from '@material-ui/core';
// import MD icon
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import AssignmentIcon from '@material-ui/icons/Assignment';
import FaceIcon from '@material-ui/icons/Face';
import SwitchCameraIcon from '@material-ui/icons/SwitchCamera';
// import customize conpoment
import { SingleTab } from './SingleTab';
// import Redux
import { useSelector } from '../../../redux/hooks';
import { useDispatch } from 'react-redux';
import {
    openItemToPageTab,
    closePageTab,
} from '../../../redux/openPageTabs/slice';
// import Router
import { useHistory } from 'react-router-dom';

// Current Page Style
const useStyles = makeStyles((theme: Theme) => createStyles({
    tab: {
        flexGrow: 1,
        width: '100%',
        // marginTop: -25,
        // marginLeft: 240,
        // marginBottom: 20,
        // borderBottom: '1px solid #1e88e5',
        background: (theme.palette.type === "light" ? '#ececec' : '#191818'),
        height: 50,
        position: 'fixed',
        zIndex: theme.zIndex.drawer - 5,
    },
    tabButtonGroup: {
        height: 50,
    },
    tabUpDown: {
        backgroundColor: (theme.palette.type === "light" ? '#ececec' : '#191818'),
        transition: 'background-color 500ms',
        '&:hover': {
            backgroundColor: (theme.palette.type === "light" ? '#f7f7f7' : '#333232'),
        },
    },
}));

// PageTabs State interface
interface OpenPageTabsState {
    tabSlice: number;
    openTab: string;
    alreadyOpenedTabsLength: number;
};

export const PageTabs = () => {
    // style
    const classes = useStyles();
    // router
    const history = useHistory();
    // redux
    const dispatch = useDispatch();
    const alreadyOpenedTabs = useSelector(state => state.openPage.alreadyOpenedTabs);
    const currentActivatedTab = useSelector(state => state.openPage.currentActivatedTab);
    const projectNavMenuItems = useSelector(state => state.openPage.projectNavMenuItems);
    // component state
    const [values, setValues] = useState<OpenPageTabsState>({
        tabSlice: 40,
        openTab: currentActivatedTab.title,
        alreadyOpenedTabsLength: alreadyOpenedTabs.length,
    });

    // handle click page tab: Activated Tab & Router Change
    const handleClickPageTab = (tab: any) => {
        dispatch(openItemToPageTab(
            { openItemName: tab.title, alreadyOpenedTabs: alreadyOpenedTabs }
        ));
        history.push(tab.router);
    }

    // change of alreadyOpenedTabsLength & current open pageTab
    useEffect(() => {
        // move the PageTabs components to slice to opened tab
        let openTabID = 0;
        let newMargin = 40;
        alreadyOpenedTabs.map((tab:any, index:number) => {
            if (tab.title === currentActivatedTab.title) {
                openTabID = index + 1;
            }
        });
        if (openTabID > 5) {
            newMargin = 40 - 80 * 4 * (Math.floor(openTabID / 2) - 1);
        }

        // change router, so that the page content can change while close the tab
        if (Object.keys(currentActivatedTab).length === 0) {
            history.push('/');
        } else {
            let pageRouter;
            projectNavMenuItems.map(item => {
                if (item.title === currentActivatedTab.title) {
                    pageRouter = item.router;
                }
            });
            history.push(pageRouter);
        }

        // update state
        setValues({
            ...values,
            tabSlice: newMargin,
            alreadyOpenedTabsLength: alreadyOpenedTabs.length,
            openTab: currentActivatedTab.title,
        });
    }, [alreadyOpenedTabs, currentActivatedTab]);

    // top pageTab slice to left
    const TabItemsToLeft = () => {
        if (values.tabSlice !== 40) {
            let newMargin = values.tabSlice + 80 * 4;
            setValues({
                ...values,
                tabSlice: newMargin
            });
        }
    };

    // top pageTab slice to right
    const TabItemsToRight = () => {
        if (values.alreadyOpenedTabsLength > 5 && values.tabSlice !== (40 - 80 * 4 * (Math.floor(values.alreadyOpenedTabsLength / 2) - 1))) {
            let newMargin = values.tabSlice - 80 * 4;
            setValues({
                ...values,
                tabSlice: newMargin
            });
        }
    };

    // close page tab
    const handleClosePageTab = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        closeItem: string,
    ) => {
        // 阻止点击事件冒泡, 从而点击tab下面的close按钮时不会冒泡到点击tab的事件
        event.stopPropagation();
        let currentOpenedTab;
        alreadyOpenedTabs.map(tab => {
            if (tab.title === values.openTab) {
                currentOpenedTab = tab;
            }
        });
        // dispatch action to reducer
        dispatch(closePageTab({
            closeItemName: closeItem,
            alreadyOpenedTabs: alreadyOpenedTabs,
            currentOpenedTab: currentOpenedTab,
        }));
    };

    return (
        <div className={classes.tab}>
            <ButtonGroup
                style={{ marginLeft: values.tabSlice }}
                className={clsx(classes.tabButtonGroup, styles["tab-items"])}
                // variant="text"
                color="primary"
                aria-label="text primary button group"
            >
                {
                    alreadyOpenedTabs.map((tab) => {
                        return (
                            <SingleTab
                                key={`${tab.id}-tab`}
                                title={tab.title}
                                router={tab.router}
                                icon={tab.icon}
                                isActive={currentActivatedTab.id === tab.id ? true : false}
                                openTab={() => handleClickPageTab(tab)}
                                closeTab={(event) => handleClosePageTab(event, tab.title)}
                            />
                        );
                    })
                }
            </ButtonGroup>
            <div
                className={clsx(classes.tabUpDown, styles["tab-up"])}
                onClick={TabItemsToLeft}
            >
                <KeyboardArrowLeftIcon fontSize="small" />
            </div>
            <div
                className={clsx(classes.tabUpDown,
                    styles["tab-down"])}
                onClick={TabItemsToRight}
            >
                <KeyboardArrowRightIcon fontSize="small" />
            </div>
        </div>
    );
};