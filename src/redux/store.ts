// import RTK
import {combineReducers, configureStore} from "@reduxjs/toolkit";
// import redux-persist
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// import Slice
import { UserSlice } from './user/slice';
import { PageTabsSlice } from './pageTabs/slice';
import { LeftDrawerSlice } from './leftDrawer/slice';
import { ThemeSlice } from "./theme/slice";
import { Language } from "./language/slice";
// import MiddleWare
// import { actionLog } from './middleware/actionLog';

// 持久化配置信息
const persistConfig = {
    key: "root",    //数据根目录
    storage,        //数据保存方法: local-storage(默认) || session-storage
    whitelist: [    //白名单, 指明保存的store中的特定数据
        "user",             // save user jwt
        "theme",      // save theme changed
        // "language",         //save language changed
    ],
    // 黑名单, 指除了不保存store中的指定数据外, 其他均保存
}

// 将所有的Reducer捆绑起来
const rootReducer = combineReducers({
    user: UserSlice.reducer,
    pageTabs: PageTabsSlice.reducer,
    leftDrawer: LeftDrawerSlice.reducer,
    theme: ThemeSlice.reducer,
    language: Language.reducer,
})

// 将原有的reducer加强为可持续久化的
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 创建数据仓库
// store是一个带有推送功能的数据仓库, 而实现推送便是使用reducer实现
// store只保存数据, 而不处理数据, 所以的数据处理都放在reducer中
// 然后再把reducer的返回值返回给store
// const store = createStore(rootReducer, applyMiddleware(thunk, actionLog));
// RTK-store: 使用configureStore创建store
const store = configureStore({
    // 传入的reducer, 使用persisted过的
    reducer: persistedReducer,
    // 中间件, 因为redux本身就有一些中间件了, 为了防止重写, 可以使用对象展开的方法
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware({serializableCheck: false}),
        // actionLog,  // 每次action操作的日志记录中间件
    ],
    devTools: true,
});

// 创建持久化的store
const persistor = persistStore(store);

// 输出store的数据类型state
export type RootState = ReturnType<typeof store.getState>;
const rootStore = {
    store, persistor
}
export default rootStore;