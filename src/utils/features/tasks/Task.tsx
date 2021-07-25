import React, { ChangeEvent, useCallback } from "react"
import { Checkbox, IconButton } from "@material-ui/core"
import { EditableSpan } from "../editableSpan/EditableSpan"
import { Delete } from "@material-ui/icons"
import { TaskStatuses, TaskType } from "../../../main/server-api/todolists-api"
import { useDispatch } from "react-redux"
import {
    changeTaskStatusThunk,
    changeTaskTitleThunk,
    deleteTasksThunk,
} from "../../../main/bll/reducers/tasks-reducer"
import { RequestStatusType } from "../../../main/bll/reducers/app-reducer"

type TaskPropsType = {
    task: TaskType
    todolistId: string
    entityStatusForTask: RequestStatusType
    entityStatusForTodo?: RequestStatusType
}
export const Task = React.memo((props: TaskPropsType) => {
    const dispatch = useDispatch()
    const changeStatus = useCallback((id: string, status: TaskStatuses, todolistId: string) => {
        dispatch(changeTaskStatusThunk(todolistId, id, status))
    }, [])
    const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
        dispatch(changeTaskTitleThunk(todolistId, id, newTitle))
    }, [])
    const onClickHandler = useCallback(
        () => dispatch(deleteTasksThunk(props.todolistId, props.task.id)),
        [props.todolistId, props.task.id]
    )

    const onChangeHandler = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked
            changeStatus(
                props.task.id,
                newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New,
                props.todolistId
            )
        },
        [props.task.id, props.todolistId]
    )

    const onTitleChangeHandler = useCallback(
        (newValue: string) => {
            changeTaskTitle(props.task.id, newValue, props.todolistId)
        },
        [props.task.id, props.todolistId]
    )

    return (
        <div
            key={props.task.id}
            className={props.task.status === TaskStatuses.Completed ? "is-done" : ""}
        >
            <Checkbox
                checked={props.task.status === TaskStatuses.Completed}
                color="primary"
                onChange={onChangeHandler}
                disabled={props.entityStatusForTask === "loading"}
            />
            <EditableSpan
                value={props.task.title}
                onChange={onTitleChangeHandler}
                entityStatusForTask={props.entityStatusForTask}
            />
            <IconButton onClick={onClickHandler} disabled={props.entityStatusForTask === "loading"}>
                <Delete />
            </IconButton>
        </div>
    )
})
