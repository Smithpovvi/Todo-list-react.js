import {v1} from "uuid"

type RemoveTodoListAT = {
    type: 'REMOVE-TODOLIST'
    todoListID: string
}
type AddTodoListAT = {
    type: 'ADD-TODOLIST'
    title: string
    id: string
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
type FilterValuesTypes = "all" | "active" | "completed"

export type TodoListType = {
    title: string,
    filter: FilterValuesTypes,
    id: string
}

export type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListTitleAT | ChangeTodoListFilterAT

export const todoListID1 = v1()
export const todoListID2 = v1()

const todoListsState = [
    {id: todoListID1, title: "What to learn", filter: "all"},
    {id: todoListID2, title: "What to buy", filter: "all"},]

const todoListReducer = (todoLists: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todoLists.filter(tl => tl.id !== action.todoListID)
        case 'ADD-TODOLIST':
            return [...todoLists, {id: action.id, title: action.title, filter: "all"}]
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
    return {type: 'ADD-TODOLIST', title, id: v1()}
}
export const changeTodoListTitleAC = (todoListID: string, title: string): ChangeTodoListTitleAT => {
    return {type: 'CHANGE-TODOLIST-TITLE', todoListID, title}
}
export const changeTodoListFilterAC = (todoListID: string, newFilterValue: FilterValuesTypes): ChangeTodoListFilterAT => {
    return {type: 'CHANGE-TODOLIST-FILTER', todoListID, newFilterValue}
}


export default todoListReducer