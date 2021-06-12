import React, { useCallback, useEffect } from "react"
import { AddItemForm } from "./AddItemForm"
import { EditableSpan } from "./EditableSpan"
import { Button, IconButton } from "@material-ui/core"
import { Delete } from "@material-ui/icons"
import { Task } from "./Task"
import { TaskStatuses } from "./api/todolists-api"
import { changeTitleTodoThunk, changeTodolistFilter, deleteTodoThunk, FilterValuesType, TodolistDomainType } from "./state/todolists-reducer"
import { useDispatch, useSelector } from "react-redux"
import { addTaskThunk, setTasksThunk, TasksStateType } from "./state/tasks-reducer"
import { AppRootStateType } from "./state/store"
import { RequestStatusType } from "./state/app-reducer"

type PropsType = {
    id: string
    entityStatus: RequestStatusType
}

export const Todolist = React.memo(function (props: PropsType) {
    const dispatch = useDispatch()
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>((state) => state.todolists)
    const allTasksFromState = useSelector<AppRootStateType, TasksStateType>((state) => state.tasks)
    let tasks = allTasksFromState[props.id]
    let title = ""
    let filter = ""
    todolists.forEach((tl) => {
        if (tl.id === props.id) {
            title = tl.title
            filter = tl.filter
        }
    })
    useEffect(() => {
        dispatch(setTasksThunk(props.id))
    }, [])

    const addTask = useCallback(
        (title: string) => {
            dispatch(addTaskThunk(props.id, title))
        },
        [props.id]
    )

    const removeTodolist = useCallback(() => {
        dispatch(deleteTodoThunk(props.id))
    }, [])
    const changeTodolistTitle = useCallback(
        (title: string) => {
            dispatch(changeTitleTodoThunk(props.id, title))
        },
        [props.id]
    )

    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        const action = changeTodolistFilter(todolistId, value)
        dispatch(action)
    }, [])
    const onAllClickHandler = useCallback(() => changeFilter("all", props.id), [props.id, changeFilter])
    const onActiveClickHandler = useCallback(() => changeFilter("active", props.id), [props.id, changeFilter])
    const onCompletedClickHandler = useCallback(() => changeFilter("completed", props.id), [props.id, changeFilter])

    if (filter === "active") {
        tasks = tasks.filter((t) => t.status === TaskStatuses.New)
    }
    if (filter === "completed") {
        tasks = tasks.filter((t) => t.status === TaskStatuses.Completed)
    }

    return (
        <div>
            <h3>
                <EditableSpan value={title} onChange={changeTodolistTitle} />
                <IconButton onClick={removeTodolist} disabled={props.entityStatus === "loading"}>
                    <Delete />
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask} disabled={props.entityStatus} />
            <div>
                {tasks.map((t) => (
                    <Task key={t.id} task={t} todolistId={props.id} />
                ))}
            </div>
            <div style={{ paddingTop: "10px" }}>
                <Button variant={filter === "all" ? "outlined" : "text"} onClick={onAllClickHandler} color={"default"}>
                    All
                </Button>
                <Button variant={filter === "active" ? "outlined" : "text"} onClick={onActiveClickHandler} color={"primary"}>
                    Active
                </Button>
                <Button variant={filter === "completed" ? "outlined" : "text"} onClick={onCompletedClickHandler} color={"secondary"}>
                    Completed
                </Button>
            </div>
        </div>
    )
})
