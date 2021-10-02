import { useSelector as useReduxSelector, TypedUseSelectorHook } from "react-redux";
import {RootState} from "./store";

// 重新定义一个Hook, 让这个Hook的state类型始终能够和我们store中存储的state是一样的,
// 这样就不需要每一次都在组件中重新去界定这个state的泛型是什么
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;