import { Dispatch } from "redux"
import { todolistsAPI, TodolistType } from "../api/todolists-api"

export type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST"
    id: string
}
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE"
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER"
    id: string
    filter: FilterValuesType
}
export type SetTodolistActionType = ReturnType<typeof setTodolist>

type ActionsType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType | SetTodolistActionType

const initialState: Array<TodolistDomainType> = []

export type FilterValuesType = "all" | "active" | "completed"
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
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
                // если нашёлся - изменим ему заголовок
                todolist.title = action.title
            }
            return [...state]
        }
        case "CHANGE-TODOLIST-FILTER": {
            const todolist = state.find((tl) => tl.id === action.id)
            if (todolist) {
                // если нашёлся - изменим ему заголовок
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

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: "REMOVE-TODOLIST", id: todolistId }
}
export const addTodolistAC = (todolist: TodolistType) => {
    return { type: "ADD-TODOLIST", todolist } as const
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return { type: "CHANGE-TODOLIST-TITLE", id: id, title: title }
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return { type: "CHANGE-TODOLIST-FILTER", id: id, filter: filter }
}
export const setTodolist = (todos: Array<TodolistType>) => ({ type: "SET-TODO", todos } as const)

export const setTodoThunk = () => (dispatch: Dispatch) => {
    todolistsAPI.getTodolists().then((resp) => dispatch(setTodolist(resp.data)))
}
export const addTodoThunk = (title: string) => (dispatch: Dispatch) => {
    todolistsAPI.createTodolist(title).then((resp) => dispatch(addTodolistAC(resp.data.data.item)))
}
export const deleteTodoThunk = (id: string) => (dispatch: Dispatch) => {
    todolistsAPI.deleteTodolist(id).then(() => dispatch(removeTodolistAC(id)))
}
