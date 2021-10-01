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
// import { useSelector } from '../../../redux/hooks';
// import { useDispatch } from 'react-redux';
// import { openItemToPageTabs, closeItemInPageTabs } from '../../../redux/openPageTabs/slice';
// import Router
// import { useHistory } from 'react-router-dom';

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
    // openTab: string;
    // openPagesTabsLength: number;
};

export const PageTabs = () => {
    // style
    const classes = useStyles();
    // router
    // const history = useHistory();
    // redux
    // const dispatch = useDispatch();
    // const openPagesTabs = useSelector(state => state.openPage.pageTabsOpenedItems);
    // const currentOpenTab = useSelector(state => state.openPage.currentOpenedTab);
    // const projectNavMenuItems = useSelector(state => state.openPage.projectNavMenu);
    // const projectUserAuthorizationRouter = useSelector(state => state.openPage.projectUserAuthorization)[0].router;
    // component state
    const [values, setValues] = useState<OpenPageTabsState>({
        tabSlice: 40,
        // openTab: currentOpenTab.title,
        // openPagesTabsLength: openPagesTabs.length,
    });

    // change of openPagesTabsLength & current open pageTab
    // useEffect(() => {
    //     // move the PageTabs components to slice to opened tab
    //     let openTabID = 0;
    //     let newMargin = 40;
    //     openPagesTabs.map((tab, index) => {
    //         if (tab.title === currentOpenTab.title) {
    //             openTabID = index + 1;
    //         }
    //     });
    //     if (openTabID > 5) {
    //         newMargin = 40 - 80 * 4 * (Math.floor(openTabID / 2) - 1);
    //     }

    //     // change router, so that the page content can change while close the tab
    //     if (currentOpenTab.title === '主页') {
    //         history.push('/');
    //     } else {
    //         let userRouter = projectUserAuthorizationRouter;
    //         let pageRouter;
    //         projectNavMenuItems.map(item => {
    //             if (item.title === currentOpenTab.title) {
    //                 pageRouter = item.router;
    //             }
    //         });
    //         history.push(userRouter + pageRouter);
    //     }

    //     // update state
    //     setValues({
    //         ...values,
    //         tabSlice: newMargin,
    //         openPagesTabsLength: openPagesTabs.length,
    //         openTab: currentOpenTab.title,
    //     });
    // }, [openPagesTabs, currentOpenTab]);

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
    // const TabItemsToRight = () => {
    //     if (values.openPagesTabsLength > 5 && values.tabSlice !== (40 - 80 * 4 * (Math.floor(values.openPagesTabsLength / 2) - 1))) {
    //         let newMargin = values.tabSlice - 80 * 4;
    //         setValues({
    //             ...values,
    //             tabSlice: newMargin
    //         });
    //     }
    // };

    // close page tab
    // const handleClosePageTab = (
    //     event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    //     closeItem: string,
    // ) => {
    //     // 阻止点击事件冒泡, 从而点击tab下面的close按钮时不会冒泡到点击tab的事件
    //     event.stopPropagation();
    //     let currentOpenedTab;
    //     openPagesTabs.map(tab => {
    //         if (tab.title === values.openTab) {
    //             currentOpenedTab = tab;
    //         }
    //     });
    //     // dispatch action to reducer
    //     dispatch(closeItemInPageTabs({
    //         closeItemName: closeItem,
    //         currentOpenPagesTabs: openPagesTabs,
    //         currentOpenedTab: currentOpenedTab,
    //     }));
    // };

    // open page tab
    // const handleOpenPageTab = (
    //     event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    //     activeItem: string,
    // ) => {
    //     setValues({
    //         ...values,
    //         openTab: activeItem
    //     });

    //     // dispatch action to reducer
    //     dispatch(openItemToPageTabs({
    //         openItemName: activeItem, currentOpenPagesTabs: openPagesTabs
    //     }));

    //     // change router inorder to open this page
    //     if (activeItem === '主页') {
    //         history.push('/');
    //     } else {
    //         let userRouter = projectUserAuthorizationRouter;
    //         let pageRouter = '';
    //         // find active page router
    //         projectNavMenuItems.map(item => {
    //             if (item.title === activeItem) {
    //                 pageRouter = item.router;
    //             }
    //         });
    //         history.push(userRouter + pageRouter);
    //     }
    // };

    return (
        <div className={classes.tab}>
            <ButtonGroup
                style={{ marginLeft: values.tabSlice }}
                className={clsx(classes.tabButtonGroup, styles["tab-items"])}
                // variant="text"
                color="primary"
                aria-label="text primary button group"
            >
                <SingleTab
                    key={'主页'}
                    title={'主页'}
                    router={'/'}
                    icon={<AssignmentIcon />}
                    isActive={true}
                    openTab={(event) => {}}
                    closeTab={(event) => {}}
                />
            </ButtonGroup>
            <div
                className={clsx(classes.tabUpDown, styles["tab-up"])}
                // onClick={TabItemsToLeft}
            >
                <KeyboardArrowLeftIcon fontSize="small" />
            </div>
            <div
                className={clsx(classes.tabUpDown,
                    styles["tab-down"])} 
                    // onClick={TabItemsToRight}
            >
                <KeyboardArrowRightIcon fontSize="small" />
            </div>
        </div>
    );
};