import { AppRootStateType } from '../../main/bll/store'

export const getAppState = (state: AppRootStateType)=> state.app
export const getTodoState = (state: AppRootStateType)=> state.todolists