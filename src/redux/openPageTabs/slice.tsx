import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import Project Setting
import { DefaultNavItems } from '../../settings/mocks/DefaultNavItem';

// Project Nav Menu State
interface UserLoginState {
    projectNavMenuItems: any;
    leftDrawerActivatedItem: any;
    alreadyOpenedTabs: any;
    currentActivatedTab: any;
}

// Default State
const initialState: UserLoginState = {
    projectNavMenuItems: DefaultNavItems,
    leftDrawerActivatedItem: DefaultNavItems[0],
    alreadyOpenedTabs: [ DefaultNavItems[0] ],
    currentActivatedTab: DefaultNavItems[0],
};

// action: Open Item To PageTabs
export const openItemToPageTab = createAsyncThunk(
    'openPage/openItemToPageTab',
    (params: {openItemName: string, alreadyOpenedTabs: any}) => {
        let newOpenItem;            // new open item Object with full info
        let hadItem = false;        // only write new item into, if alearly had? return the old tabs
        DefaultNavItems.map(item => {
            // find the active item
            if (item.title === params.openItemName){
                newOpenItem = item;
                // never include in alreadyOpenedTabs
                params.alreadyOpenedTabs.map(tab => {
                    if(tab.title === params.openItemName){
                        hadItem = true;     // current open item already in page tabs
                    }
                });
            }
        });
        if (!hadItem){
            // open new item? add into action.payload in order to change staet
            return {
                alreadyOpenedTabs: [...params.alreadyOpenedTabs, newOpenItem],
                leftDrawerActivatedItem: newOpenItem,
                currentActivatedTab: newOpenItem,
            };
        } else {
            // already open the item? just return the old page tabs array, but active the current click tab
            return {
                alreadyOpenedTabs: params.alreadyOpenedTabs,
                leftDrawerActivatedItem: newOpenItem,
                currentActivatedTab: newOpenItem,
            };
        }
    }
);

// action: Close already opened Item In PageTabs
export const closePageTab = createAsyncThunk(
    'openPage/closePageTab',
    (params:{closeItemName: string, alreadyOpenedTabs: any, currentOpenedTab: any}) => {
        let newOpenPagesTabs:any = [];
        let newCurrentOpenedTab:any;
        // if only have one page, then open Home Page, that is clear leftDrawerActivatedItem, alreadyOpenedTabs & currentActivatedTab
        if (params.alreadyOpenedTabs.length === 1){
            return {
                alreadyOpenedTabs: [],
                leftDrawerActivatedItem: {},
                currentActivatedTab: {},
            };
            // alert('only have one page! Do not close me pls :(');
        } else{
            let indexCnt = -1;
            let closeIndex = 0;
            let isCloseTabHadOpened = false;
            params.alreadyOpenedTabs.map(tab=>{
                indexCnt += 1;
                if (params.closeItemName === tab.title){
                    closeIndex = indexCnt;
                    // judge if close tab already opened
                    if ( tab.title === params.currentOpenedTab.title ){
                        isCloseTabHadOpened = true;
                    }
                } else {
                    newOpenPagesTabs = [...newOpenPagesTabs, tab];
                }
            });
            if (isCloseTabHadOpened){
                // close tab already opened, then we should change the new open tab
                if (closeIndex === 0){
                    // current close tab is the first one, so the open tab index should not to change, because when we close the first one, then we will open the new page tabs arrays' first one, so it's still index=0
                    newCurrentOpenedTab = newOpenPagesTabs[closeIndex];
                } else {
                    newCurrentOpenedTab = newOpenPagesTabs[closeIndex-1];
                }
            } else {
                // if close tab do not opened, then we do not need to change open tab
                newCurrentOpenedTab = params.currentOpenedTab;
            }
        }
        // return to action payload
        return {
            alreadyOpenedTabs: newOpenPagesTabs,
            leftDrawerActivatedItem: newCurrentOpenedTab,
            currentActivatedTab: newCurrentOpenedTab,
        };
    }
);

// slice: combine of Reducer & Action
export const OpenPageSlice = createSlice({
    name: 'openPage',
    initialState,
    reducers:{},
    extraReducers:{
        // open menu item to pageTabs & activated this Menu Item & Activated this Page tabs
        [openItemToPageTab.fulfilled.type]: (state, action) => {
            state.leftDrawerActivatedItem = action.payload.leftDrawerActivatedItem;
            state.alreadyOpenedTabs = action.payload.alreadyOpenedTabs;
            state.currentActivatedTab = action.payload.currentActivatedTab;
        },
        // close tabs in pageTabs
        [closePageTab.fulfilled.type]: (state, action) => {
            state.leftDrawerActivatedItem = action.payload.leftDrawerActivatedItem;
            state.alreadyOpenedTabs = action.payload.alreadyOpenedTabs;
            state.currentActivatedTab = action.payload.currentActivatedTab;
        },
    }
});