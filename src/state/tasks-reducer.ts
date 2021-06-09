import { TasksStateType } from "../App"
import { v1 } from "uuid"
import { AddTodolistActionType, RemoveTodolistActionType, SetTodolistActionType } from "./todolists-reducer"
import { TaskPriorities, TaskStatuses, TaskType, todolistsAPI } from "../api/todolists-api"
import { Dispatch } from "redux"

export type RemoveTaskActionType = {
    type: "REMOVE-TASK"
    todolistId: string
    taskId: string
}

export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = {
    type: "CHANGE-TASK-STATUS"
    todolistId: string
    taskId: string
    status: TaskStatuses
}

export type ChangeTaskTitleActionType = {
    type: "CHANGE-TASK-TITLE"
    todolistId: string
    taskId: string
    title: string
}
export type SetTasksActionType = ReturnType<typeof setTasksAC>

type ActionsType =
    | RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistActionType
    | SetTasksActionType

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            const stateCopy = { ...state }
            const tasks = stateCopy[action.todolistId]
            const newTasks = tasks.filter((t) => t.id !== action.taskId)
            stateCopy[action.todolistId] = newTasks
            return stateCopy
        }
        case "ADD-TASK": {
            const stateCopyThree = { ...state }
            const tasks = stateCopyThree[action.tasks.todoListId]
            const newTasks = [action.tasks, ...tasks]
            stateCopyThree[action.tasks.todoListId] = newTasks
            return stateCopyThree
        }
        case "CHANGE-TASK-STATUS": {
            let todolistTasks = state[action.todolistId]
            let newTasksArray = todolistTasks.map((t) => (t.id === action.taskId ? { ...t, status: action.status } : t))

            state[action.todolistId] = newTasksArray
            return { ...state }
        }
        case "CHANGE-TASK-TITLE": {
            let todolistTasks = state[action.todolistId]
            // найдём нужную таску:
            let newTasksArray = todolistTasks.map((t) => (t.id === action.taskId ? { ...t, title: action.title } : t))

            state[action.todolistId] = newTasksArray
            return { ...state }
        }
        case "ADD-TODOLIST": {
            return {
                ...state,
                [action.todolist.id]: [],
            }
        }
        case "REMOVE-TODOLIST": {
            const copyState = { ...state }
            delete copyState[action.id]
            return copyState
        }
        case "SET-TODO":
            const stateCopy = { ...state }
            action.todos.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        case "SET-TASKS":
            const stateCopyTwo = { ...state }
            stateCopyTwo[action.todolistId] = action.tasks
            return stateCopyTwo
        default:
            return state
    }
}


export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return { type: "REMOVE-TASK", taskId, todolistId }
}
export const addTaskAC = (tasks: TaskType, todolistId: string) => {
    return { type: "ADD-TASK", tasks, todolistId } as const
}
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusActionType => {
    return { type: "CHANGE-TASK-STATUS", status, todolistId, taskId }
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return { type: "CHANGE-TASK-TITLE", title, todolistId, taskId }
}
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => {
    return { type: "SET-TASKS", tasks, todolistId } as const
}


export const setTasksThunk = (todolistId: string) => (dispatch: Dispatch) => {
    todolistsAPI.getTasks(todolistId).then((resp) => dispatch(setTasksAC(resp.data.items, todolistId)))
}
export const deleteTasksThunk = (todolistId: string, taskID: string) => (dispatch: Dispatch) => {
    todolistsAPI.deleteTask(todolistId, taskID).then(() => dispatch(removeTaskAC(taskID, todolistId)))
}
export const addTaskThunk = (todolistId: string, taskTitile: string) => (dispatch: Dispatch) => {
    todolistsAPI.createTask(todolistId, taskTitile).then((res) => dispatch(addTaskAC(res.data.data.item, todolistId)))
}
