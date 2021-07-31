import React, { useCallback } from "react"
import { AddItemForm } from "../../addItemForm/AddItemForm"
import { EditableSpan } from "../../editableSpan/EditableSpan"
import { Button, IconButton } from "@material-ui/core"
import { Delete } from "@material-ui/icons"
import { TaskStatuses } from "../../../../main/server-api/todolists-api"
import { FilterValuesType } from "../../../../main/bll/reducers/todolists-reducer"
import { TaskStateRootType } from "../../../../main/bll/reducers/tasks-reducer"
import { RequestStatusType } from "../../../../main/bll/reducers/app-reducer"
import TasksContainer from "../../tasks/TaskContainer"

type TodolistPropsType = {
    id: string
    filter: FilterValuesType
    tasks: Array<TaskStateRootType>
    title: string
    entityStatus: RequestStatusType
    changeTodolistTitle: (title: string) => void
    removeTodolist: () => void
    addTask: (title: string) => void
    changeFilter: (newFilter: FilterValuesType, id: string) => void
}

const Todolist: React.FunctionComponent<TodolistPropsType> = React.memo((props) => {
    const {
        changeFilter,
        filter,
        tasks,
        title,
        changeTodolistTitle,
        removeTodolist,
        addTask,
        id,
        entityStatus,
    } = props

    const onAllClickHandler = useCallback(() => changeFilter("all", id), [id, changeFilter])

    const onActiveClickHandler = useCallback(() => changeFilter("active", id), [id, changeFilter])

    const onCompletedClickHandler = useCallback(
        () => changeFilter("completed", id),
        [id, changeFilter]
    )

    let tasksFiltered: Array<TaskStateRootType> = [...tasks]

    if (filter === "active") {
        tasksFiltered = tasksFiltered.filter((t) => t.status === TaskStatuses.New)
    }
    if (filter === "completed") {
        tasksFiltered = tasksFiltered.filter((t) => t.status === TaskStatuses.Completed)
    }

    return (
        <div>
            <h3>
                <EditableSpan
                    value={title}
                    onChange={changeTodolistTitle}
                    entityStatusForTodo={entityStatus}
                />
                <IconButton onClick={removeTodolist} disabled={props.entityStatus === "loading"}>
                    <Delete />
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask} disabled={props.entityStatus} />
            <div>
                {tasksFiltered.map((t) => (
                    <TasksContainer
                        key={t.id}
                        task={t}
                        todolistId={id}
                        entityStatusForTask={entityStatus}
                    />
                ))}
            </div>
            <div style={{ paddingTop: "10px" }}>
                <Button
                    variant={filter === "all" ? "outlined" : "text"}
                    onClick={onAllClickHandler}
                    color={"default"}
                >
                    All
                </Button>
                <Button
                    variant={filter === "active" ? "outlined" : "text"}
                    onClick={onActiveClickHandler}
                    color={"primary"}
                >
                    Active
                </Button>
                <Button
                    variant={filter === "completed" ? "outlined" : "text"}
                    onClick={onCompletedClickHandler}
                    color={"secondary"}
                >
                    Completed
                </Button>
            </div>
        </div>
    )
})

export default Todolist
