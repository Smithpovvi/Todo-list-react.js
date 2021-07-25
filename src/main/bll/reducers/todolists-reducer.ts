import { Dispatch } from "redux"
import { ThunkAction } from "redux-thunk"
import { todolistsAPI, TodolistType } from "../../server-api/todolists-api"
import {
    handleServerAppError,
    handleServerNetworkError,
} from "../../../utils/features/errors/error-utils"
import {
    changeLoadingStatus,
    ChangeLoadingStatusType,
    RequestStatusType,
    setAppError,
    SetAppErrorType,
} from "./app-reducer"
import { AppRootStateType } from "../store"


export type RemoveTodolistType = ReturnType<typeof removeTodolist>
export type AddTodolistType = ReturnType<typeof addTodolist>
export type ChangeTodolistTitleType = ReturnType<typeof changeTodolistTitle>
export type ChangeTodolistFilterType = ReturnType<typeof changeTodolistFilter>
export type SetTodolistType = ReturnType<typeof setTodolist>
export type ChangeTodolistEntityStatusType = ReturnType<typeof changeTodolistEntityStatus>
export type FilterValuesType = "all" | "active" | "completed"
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
export type TodolistThunkCreatorType = ThunkAction<
    Promise<void>,
    AppRootStateType,
    unknown,
    ActionsType
>
type ActionsType =
    | RemoveTodolistType
    | AddTodolistType
    | ChangeTodolistTitleType
    | ChangeTodolistFilterType
    | SetTodolistType
    | ChangeLoadingStatusType
    | SetAppErrorType
    | ChangeTodolistEntityStatusType
//
//
const initialState: Array<TodolistDomainType> = []
//
//
export const todolistsReducer = (
    state = initialState,
    action: ActionsType
): Array<TodolistDomainType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter((tl) => tl.id !== action.id)
        }
        case "ADD-TODOLIST": {
            const filter: FilterValuesType = "all"
            const entityStatus: RequestStatusType = "idle"
            const newTodo = { ...action.todolist, filter: filter, entityStatus: entityStatus }
            return [...state, newTodo]
        }
        case "CHANGE-TODOLIST-TITLE": {
            const todolist = state.find((tl) => tl.id === action.id)
            if (todolist) {
                todolist.title = action.title
            }
            return [...state]
        }
        case "CHANGE-TODOLIST-FILTER": {
            const todolist = state.find((tl) => tl.id === action.id)
            if (todolist) {
                todolist.filter = action.filter
            }
            return [...state]
        }
        case "SET-TODO":
            return action.todos.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }))
        case "CHANGE-ENTITYSTATUS":
            const todolist = state.find((tl) => tl.id === action.todoId)
            if (todolist) {
                todolist.entityStatus = action.entityStatus
            }
            return [...state]
        default:
            return state
    }
}
//
//
export const removeTodolist = (todolistId: string) => {
    return { type: "REMOVE-TODOLIST", id: todolistId } as const
}
export const addTodolist = (todolist: TodolistType) => {
    return { type: "ADD-TODOLIST", todolist } as const
}
export const changeTodolistTitle = (id: string, title: string) => {
    return { type: "CHANGE-TODOLIST-TITLE", id: id, title: title } as const
}
export const changeTodolistFilter = (id: string, filter: FilterValuesType) => {
    return { type: "CHANGE-TODOLIST-FILTER", id: id, filter: filter } as const
}
export const setTodolist = (todos: Array<TodolistType>) => ({ type: "SET-TODO", todos } as const)
export const changeTodolistEntityStatus = (todoId: string, entityStatus: RequestStatusType) =>
    ({ type: "CHANGE-ENTITYSTATUS", todoId, entityStatus } as const)
//
//
export const setTodoThunk = () => (dispatch: Dispatch) => {
    dispatch(changeLoadingStatus("loading"))
    todolistsAPI.getTodolists().then((resp) => {
        dispatch(setTodolist(resp.data))
        dispatch(changeLoadingStatus("succeeded"))
    })
}
export const addTodoThunk = (title: string) => (dispatch: Dispatch) => {
    dispatch(changeLoadingStatus("loading"))
    todolistsAPI
        .createTodolist(title)
        .then((resp) => {
            if (resp.data.resultCode === 0) {
                dispatch(addTodolist(resp.data.data.item))
            } else {
                handleServerAppError(resp.data, dispatch)
            }
            dispatch(changeLoadingStatus("succeeded"))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
            dispatch(changeLoadingStatus("succeeded"))
        })
}
export const deleteTodoThunk = (id: string) => (dispatch: Dispatch) => {
    dispatch(changeLoadingStatus("loading"))
    dispatch(changeTodolistEntityStatus(id, "loading"))
    todolistsAPI.deleteTodolist(id).then(() => {
        dispatch(removeTodolist(id))
        dispatch(changeTodolistEntityStatus(id, "idle"))
        dispatch(changeLoadingStatus("succeeded"))
    })
}
export const changeTitleTodoThunk = (id: string, title: string) => (dispatch: Dispatch) => {
    dispatch(changeLoadingStatus("loading"))
    dispatch(changeTodolistEntityStatus(id, "loading"))
    todolistsAPI
        .updateTodolist(id, title)
        .then((resp) => {
            if (resp.data.resultCode === 0) {
                dispatch(changeTodolistTitle(id, title))
                dispatch(changeTodolistEntityStatus(id, "succeeded"))
            } else {
                handleServerAppError(resp.data, dispatch)
            }
            dispatch(changeLoadingStatus("succeeded"))
            dispatch(changeTodolistEntityStatus(id, "succeeded"))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
            dispatch(changeLoadingStatus("succeeded"))
            dispatch(changeTodolistEntityStatus(id, "succeeded"))
        })
}
