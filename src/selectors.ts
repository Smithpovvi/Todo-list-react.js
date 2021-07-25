import { AppRootStateType } from './state/store'

export const getAppState = (state: AppRootStateType)=> state.app
export const getTodoState = (state: AppRootStateType)=> state.todolists