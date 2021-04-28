import {v1} from "uuid"
import {todoListID1, todoListID2} from "./TodoListReducers";


export type TaskStateType = Array<Array<TaskType>>
type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
type ActionType =
    RemoveTaskType
    | AddTaskType
    | ChangeStatusType
    | ChangeTaskTitleType
    | AddTasksNewTodoListType
    | RemoveTasksRemoveTodoList
type RemoveTaskType = {
    type: 'REMOVE-TASK',
    taskID: string,
    todoListID: number
}
type AddTaskType = {
    type: 'ADD-TASK',
    taskID: string,
    todoListID: number,
    title: string
}
type ChangeStatusType = {
    type: 'CHANGE-STATUS',
    todoListID: number,
    taskID: string
}
type ChangeTaskTitleType = {
    type: 'CHANGE-TITLE',
    todoListID: number,
    taskID: string,
    title: string
}
type AddTasksNewTodoListType = {
    type: 'ADD-TASKS-NEW-TODOLIST'
}
type RemoveTasksRemoveTodoList = {
    type: 'REMOVE-TASKS-REMOVE-TODOLIST'
    todoListID: number
}

const TaskState = {
    [todoListID1]: [
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "React", isDone: false},
    ],
    [todoListID2]: [
        {id: v1(), title: "Milk", isDone: true},
        {id: v1(), title: "Bread", isDone: true},
        {id: v1(), title: "Sweet", isDone: false},
    ]
}

export const removeTaskAC = (taskID: string, todoListID: string) => {
    return {type: 'REMOVE-TASK', taskID, todoListID}
}
export const addTaskAC = (title: string, todoListID: string) => {
    return {type: 'ADD-TASK', todoListID, title}
}
export const changeTaskStatusAC = (todoListID: string, taskID: string) => {
    return {type: 'CHANGE-STATUS', todoListID, taskID}
}

export const taskReducer = (state: any = TaskState, action: ActionType): TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todoListID]: state[action.todoListID].filter(i => i.id !== action.taskID)}
        case 'ADD-TASK':
            return {
                ...state,
                [action.todoListID]: [...state[action.todoListID], {id: v1(), title: action.title, isDone: false}]
            }
        case 'CHANGE-STATUS':
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].map(task => task.id === action.taskID ? {
                    ...task,
                    isDone: !task.isDone
                } : task)
            }
        case 'CHANGE-TITLE':
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].map(task => task.id === action.taskID ? {
                    ...task,
                    title: action.title
                } : task)
            }
        case "ADD-TASKS-NEW-TODOLIST":
            return {...state, [v1()]: []}
        case 'REMOVE-TASKS-REMOVE-TODOLIST': {
            const copyState = {...state}
            delete copyState[action.todoListID]
            return copyState
        }
        default:
            return state
    }
}


