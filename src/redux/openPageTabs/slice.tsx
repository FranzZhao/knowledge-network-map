import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import Project Setting
import { DefaultNavItems } from '../../settings/mocks/DefaultNavItem';


// Project Nav Menu State
interface UserLoginState {
    projectNavMenuItems: any;
    leftDrawerActivatedItem: any;
    pageTabsOpenedTabs: any;
    currentOpenedTab: any;
}

// Default State
const initialState: UserLoginState = {
    projectNavMenuItems: DefaultNavItems,
    leftDrawerActivatedItem: DefaultNavItems[0],
    pageTabsOpenedTabs: [ DefaultNavItems[0] ],
    currentOpenedTab: DefaultNavItems[0],
};

// action: Active Left Drawer Item
export const activateLeftDrawerNavItem = createAsyncThunk(
    //action name space
    'openPage/activateLeftDrawerNavItem',
    // action func
    (activateItemName: string) => {
        let newActiveItem;
        DefaultNavItems.map(item => {
            if (item.title === activateItemName){
                newActiveItem = item;
            }
        });
        return newActiveItem;
    }
);

// action: Open Item To PageTabs
// export const openItemToPageTabs = createAsyncThunk(
//     'openPage/openItemToPageTabs',
//     (params: {openItemName: string, currentOpenPagesTabs: any}) => {
//         let newOpenItem;            // new open item Object with full info
//         let hadItem = false;        // only write new item into, if alearly had? return the old tabs
//         ProjectNavMenu.map(item => {
//             // find the active item
//             if (item.title === params.openItemName){
//                 newOpenItem = item;
//                 // never include in currentOpenPagesTabs
//                 params.currentOpenPagesTabs.map(tab => {
//                     if(tab.title === params.openItemName){
//                         hadItem = true;
//                     }
//                 });
//             }
//         });
//         if (!hadItem){
//             // open new item? add into action.payload in order to change staet
//             return {
//                 pageTabsOpenedItems: [...params.currentOpenPagesTabs, newOpenItem],
//                 currentOpenedTab: newOpenItem,
//             };
//         } else {
//             // alearly open the item? just return the old array, but active the current click tab
//             return {
//                 pageTabsOpenedItems: params.currentOpenPagesTabs,
//                 currentOpenedTab: newOpenItem,
//             };
//         }
//     }
// );

// action: Close already opened Item In PageTabs
// export const closeItemInPageTabs = createAsyncThunk(
//     'openPage/closeItemInPageTabs',
//     (params:{
//         closeItemName: string,
//         currentOpenPagesTabs: any,
//         currentOpenedTab: any
//     }, thunkAPI) => {
//         let newOpenPagesTabs:any = [];
//         let newCurrentOpenedTab:any;
//         // if only have one page, then don't close this page
//         if (params.currentOpenPagesTabs.length === 1){
//             newOpenPagesTabs = [ProjectNavMenu[0]];
//             newCurrentOpenedTab = ProjectNavMenu[0];
//             // alert('only have one page! Do not close me pls :(');
//         } else{
//             let indexCnt = -1;
//             let closeIndex = 0;
//             let isCloseTabHadOpened = false;
//             params.currentOpenPagesTabs.map(tab=>{
//                 indexCnt += 1;
//                 if (params.closeItemName === tab.title){
//                     closeIndex = indexCnt;
//                     // judge if close tab already opened
//                     if ( tab.title === params.currentOpenedTab.title ){
//                         isCloseTabHadOpened = true;
//                     }
//                 } else {
//                     newOpenPagesTabs = [...newOpenPagesTabs, tab];
//                 }
//             });
//             if (isCloseTabHadOpened){
//                 // close tab already opened, then we should change the new open tab
//                 if (closeIndex === 0){
//                     newCurrentOpenedTab = newOpenPagesTabs[closeIndex];
//                 } else {
//                     newCurrentOpenedTab = newOpenPagesTabs[closeIndex-1];
//                 }
//             } else {
//                 // if close tab do not opened, then we do not need to change open tab
//                 newCurrentOpenedTab = params.currentOpenedTab;
//             }
//         }
//         // return to action payload
//         return {
//             pageTabsOpenedItems: newOpenPagesTabs,
//             currentOpenedTab: newCurrentOpenedTab,
//         };
//     }
// );

// slice: combine of Reducer & Action
// structure of action:
// - type -> msg(tell action to do want)
// - payload -> data(what action should change)
export const OpenPageSlice = createSlice({
    name: 'openPage',
    initialState,
    reducers:{},
    extraReducers:{
        // left drawer menu item click to activate
        [activateLeftDrawerNavItem.fulfilled.type]: (state, action) => {
            state.leftDrawerActivatedItem = action.payload;
        },
        // // open menu item to pageTabs
        // [openItemToPageTabs.fulfilled.type]: (state, action) => {
        //     state.pageTabsOpenedItems = action.payload.pageTabsOpenedItems;
        //     state.currentOpenedTab = action.payload.currentOpenedTab;
        // },
        // // close tabs in pageTabs
        // [closeItemInPageTabs.fulfilled.type]: (state, action) => {
        //     state.pageTabsOpenedItems = action.payload.pageTabsOpenedItems;
        //     state.currentOpenedTab = action.payload.currentOpenedTab;
        // },
    }
});