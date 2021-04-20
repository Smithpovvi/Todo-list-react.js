import {FilterValuesTypes, TodoListType} from "../App"
import {v1} from "uuid"

type RemoveTodoListAT = {
    type: 'REMOVE-TODOLIST'
    todoListID: string
}
type AddTodoListAT = {
    type: 'ADD-TODOLIST'
    title: string
}
type ChangeTodoListFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    todoListID: string
    newFilterValue: FilterValuesTypes
}
type ChangeTodoListTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    todoListID: string
}
export type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListTitleAT | ChangeTodoListFilterAT

const todoListReducer = (todoLists: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todoLists.filter(tl => tl.id !== action.todoListID)
        case 'ADD-TODOLIST':
            return [...todoLists, {id: v1(), title: action.title, filter: "all"}]
        case 'CHANGE-TODOLIST-TITLE':
            return todoLists.map(tl => tl.id === action.todoListID ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return todoLists.map(tl => tl.id === action.todoListID ? {...tl, filter: action.newFilterValue} : tl)
        default:
            return todoLists
    }
}

export const removeTodoListAC = (todoListID: string): RemoveTodoListAT => {
    return {type: 'REMOVE-TODOLIST', todoListID}
}
export const addTodoListAC = (title: string): AddTodoListAT => {
    return {type: 'ADD-TODOLIST', title}
}
export const changeTodoListTitleAC = (todoListID: string, title: string): ChangeTodoListTitleAT => {
    return {type: 'CHANGE-TODOLIST-TITLE', todoListID, title}
}
export const changeTodoListFilterAC = (todoListID: string, newFilterValue: FilterValuesTypes): ChangeTodoListFilterAT => {
    return {type: 'CHANGE-TODOLIST-FILTER', todoListID, newFilterValue}
}


export default todoListReducer