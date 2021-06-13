import {
    AddTodolistType,
    changeTodolistEntityStatus,
    ChangeTodolistEntityStatusType,
    RemoveTodolistType,
    SetTodolistType,
} from "./todolists-reducer"
import { TaskStatuses, TaskType, todolistsAPI } from "../api/todolists-api"
import { Dispatch } from "redux"
import { ThunkAction } from "redux-thunk"
import { AppRootStateType } from "./store"
import {
    changeLoadingStatus,
    ChangeLoadingStatusType,
    RequestStatusType,
    setAppError,
    SetAppErrorType,
} from "./app-reducer"
import { handleServerAppError, handleServerNetworkError } from "../utils/error-utils"
//
//
type TaskStateRootType = TaskType & {
    entityStatus: RequestStatusType
}
export type TasksStateType = {
    [key: string]: Array<TaskStateRootType>
}
export type RemoveTaskType = ReturnType<typeof removeTask>
export type AddTaskType = ReturnType<typeof addTask>
export type ChangeTaskStatusType = ReturnType<typeof changeTaskStatus>
export type ChangeTaskTitleType = ReturnType<typeof changeTaskTitle>
export type SetTasksType = ReturnType<typeof setTasks>
export type ChangeTaskEntityStatusType = ReturnType<typeof changeTaskEntityStatus>
export type TodolistThunkCreatorType = ThunkAction<
    Promise<void>,
    AppRootStateType,
    unknown,
    ActionsType
>
type ActionsType =
    | RemoveTaskType
    | AddTaskType
    | ChangeTaskStatusType
    | ChangeTaskTitleType
    | AddTodolistType
    | RemoveTodolistType
    | SetTodolistType
    | SetTasksType
    | ChangeLoadingStatusType
    | SetAppErrorType
    | ChangeTodolistEntityStatusType
    | ChangeTaskEntityStatusType
//
//
const initialState: TasksStateType = {}
//
//
export const tasksReducer = (state = initialState, action: ActionsType): TasksStateType => {
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
            const tasks = stateCopyThree[action.task.todoListId]
            const uppdateTask: TaskStateRootType = { ...action.task, entityStatus: "idle" }
            const newTasks = [uppdateTask, ...tasks]
            stateCopyThree[action.task.todoListId] = newTasks
            return stateCopyThree
        }
        case "CHANGE-TASK-STATUS": {
            let todolistTasks = state[action.todolistId]
            let newTasksArray = todolistTasks.map((t) =>
                t.id === action.taskId ? { ...t, status: action.status } : t
            )

            state[action.todolistId] = newTasksArray
            return { ...state }
        }
        case "CHANGE-TASK-TITLE": {
            let todolistTasks = state[action.todolistId]
            let newTasksArray = todolistTasks.map((t) =>
                t.id === action.taskId ? { ...t, title: action.title } : t
            )

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
            const tasksFromCurrentTodo = [...action.tasks]
            const updateTasks: Array<TaskStateRootType> = tasksFromCurrentTodo.map((t) => ({
                ...t,
                entityStatus: "idle",
            }))
            stateCopyTwo[action.todolistId] = updateTasks
            return stateCopyTwo
        case "CHANGE-ENTITYSTATUS-TASK":
            const task = state[action.todoId].find((t) => t.id === action.taskId)
            if (task) {
                task.entityStatus = action.entityStatus
            }
            return { ...state }
        default:
            return state
    }
}
//
//
export const removeTask = (taskId: string, todolistId: string) => {
    return { type: "REMOVE-TASK", taskId, todolistId } as const
}
export const addTask = (task: TaskType, todolistId: string) => {
    return { type: "ADD-TASK", task, todolistId } as const
}
export const changeTaskStatus = (taskId: string, status: TaskStatuses, todolistId: string) => {
    return { type: "CHANGE-TASK-STATUS", status, todolistId, taskId } as const
}
export const changeTaskTitle = (taskId: string, title: string, todolistId: string) => {
    return { type: "CHANGE-TASK-TITLE", title, todolistId, taskId } as const
}
export const setTasks = (tasks: Array<TaskType>, todolistId: string) => {
    return { type: "SET-TASKS", tasks, todolistId } as const
}
export const changeTaskEntityStatus = (
    todoId: string,
    taskId: string,
    entityStatus: RequestStatusType
) => ({ type: "CHANGE-ENTITYSTATUS-TASK", todoId, taskId, entityStatus } as const)
//
//
export const setTasksThunk = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(changeLoadingStatus("loading"))
    todolistsAPI.getTasks(todolistId).then((resp) => {
        dispatch(setTasks(resp.data.items, todolistId))
        dispatch(changeLoadingStatus("succeeded"))
    })
}
export const deleteTasksThunk = (todolistId: string, taskID: string) => (dispatch: Dispatch) => {
    dispatch(changeLoadingStatus("loading"))
    dispatch(changeTaskEntityStatus(todolistId, taskID, "loading"))
    todolistsAPI.deleteTask(todolistId, taskID).then(() => {
        dispatch(removeTask(taskID, todolistId))
        dispatch(changeLoadingStatus("succeeded"))
        dispatch(changeTaskEntityStatus(todolistId, taskID, "succeeded"))
    })
}
export const addTaskThunk = (todolistId: string, taskTitile: string) => (dispatch: Dispatch) => {
    dispatch(changeLoadingStatus("loading"))
    dispatch(changeTodolistEntityStatus(todolistId, "loading"))
    todolistsAPI
        .createTask(todolistId, taskTitile)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(addTask(res.data.data.item, todolistId))  
            } else {
                handleServerAppError(res.data, dispatch)
            }
            dispatch(changeLoadingStatus("succeeded"))
            dispatch(changeTodolistEntityStatus(todolistId, "succeeded"))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
            dispatch(changeLoadingStatus("succeeded"))
            dispatch(changeTodolistEntityStatus(todolistId, "succeeded"))
        })
}
export const changeTaskStatusThunk = (todolistId: string, taskId: string, status: TaskStatuses) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const allTasksFromState = getState().tasks
        const tasksForCurrentTodo = allTasksFromState[todolistId]
        const currentTask = tasksForCurrentTodo.find((t) => t.id === taskId)
        if (currentTask) {
            dispatch(changeLoadingStatus("loading"))
            dispatch(changeTaskEntityStatus(todolistId, taskId, "loading"))
            todolistsAPI
                .updateTask(todolistId, taskId, {
                    title: currentTask.title,
                    startDate: currentTask.startDate,
                    priority: currentTask.priority,
                    description: currentTask.description,
                    deadline: currentTask.deadline,
                    status: status,
                })
                .then(() => {
                    dispatch(changeTaskStatus(taskId, status, todolistId))
                    dispatch(changeLoadingStatus("succeeded"))
                    dispatch(changeTaskEntityStatus(todolistId, taskId, "succeeded"))
                })
        }
    }
}
export const changeTaskTitleThunk = (todolistId: string, taskId: string, title: string) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const allTasksFromState = getState().tasks
        const tasksForCurrentTodo = allTasksFromState[todolistId]
        const currentTask = tasksForCurrentTodo.find((t) => t.id === taskId)
        if (currentTask) {
            dispatch(changeLoadingStatus("loading"))
            dispatch(changeTaskEntityStatus(todolistId, taskId, "loading"))
            todolistsAPI
                .updateTask(todolistId, taskId, {
                    title: title,
                    startDate: currentTask.startDate,
                    priority: currentTask.priority,
                    description: currentTask.description,
                    deadline: currentTask.deadline,
                    status: currentTask.status,
                })
                .then((resp) => {
                    if (resp.data.resultCode === 0) {
                        dispatch(changeTaskTitle(taskId, title, todolistId))
                    } else {
                        handleServerAppError(resp.data, dispatch)
                    }
                    dispatch(changeLoadingStatus("succeeded"))
                    dispatch(changeTaskEntityStatus(todolistId, taskId, "succeeded"))
                })
                .catch((error) => {
                    handleServerNetworkError(error, dispatch)
                    dispatch(changeLoadingStatus("succeeded"))
                    dispatch(changeTodolistEntityStatus(todolistId, "succeeded"))
                })
        }
    }
}
