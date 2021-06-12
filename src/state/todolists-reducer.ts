import { Dispatch } from "redux"
import { ThunkAction } from "redux-thunk"
import { todolistsAPI, TodolistType } from "../api/todolists-api"
import { AppRootStateType } from "./store"
//
//
export type RemoveTodolistType = ReturnType<typeof removeTodolist>
export type AddTodolistType = ReturnType<typeof addTodolist>
export type ChangeTodolistTitleType = ReturnType<typeof changeTodolistTitle>
export type ChangeTodolistFilterType = ReturnType<typeof changeTodolistFilter>
export type SetTodolistType = ReturnType<typeof setTodolist>
export type FilterValuesType = "all" | "active" | "completed"
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}
export type TodolistThunkCreatorType = ThunkAction<Promise<void>, AppRootStateType, unknown, ActionsType>
type ActionsType = RemoveTodolistType | AddTodolistType | ChangeTodolistTitleType | ChangeTodolistFilterType | SetTodolistType
//
//
const initialState: Array<TodolistDomainType> = []
//
//
export const todolistsReducer = (state = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter((tl) => tl.id !== action.id)
        }
        case "ADD-TODOLIST": {
            const filter: FilterValuesType = "all"
            const newTodo = { ...action.todolist, filter: filter }
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
            return action.todos.map((tl) => ({ ...tl, filter: "all" }))
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
//
//
export const setTodoThunk = () => (dispatch: Dispatch) => {
    todolistsAPI.getTodolists().then((resp) => dispatch(setTodolist(resp.data)))
}
export const addTodoThunk = (title: string) => (dispatch: Dispatch) => {
    todolistsAPI.createTodolist(title).then((resp) => dispatch(addTodolist(resp.data.data.item)))
}
export const deleteTodoThunk = (id: string) => (dispatch: Dispatch) => {
    todolistsAPI.deleteTodolist(id).then(() => dispatch(removeTodolist(id)))
}
export const changeTitleTodoThunk = (id: string, title: string) => (dispatch: Dispatch) => {
    todolistsAPI.updateTodolist(id, title).then(() => dispatch(changeTodolistTitle(id, title)))
}
