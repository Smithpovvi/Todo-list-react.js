import React from "react"
import {FilterValuesTypes, TaskType} from "./App"
import AddItemForm from "./AddItemForm"
import EditableSpan from "./EditableSpan"
import {Button, Checkbox, IconButton} from "@material-ui/core"
import {Delete} from "@material-ui/icons"

type TodoListPropsType = {
    title: string,
    tasks: Array<TaskType>,
    addTasks: (title: string, todoListID: string) => void,
    removeTask: (taskID: string, todoListID: string) => void,
    changeTodoListFilter: (newFilterValue: FilterValuesTypes, todoListID: string) => void,
    todoListFilter: FilterValuesTypes,
    changeTaskStatus: (taskID: string, todoListID: string) => void,
    id: string,
    removeTodoList: (todoListID: string) => void,
    changeTaskTitle: (taskID: string, title: string, todoListID: string,) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
}

function TodoList(props: TodoListPropsType) {
    const tasks = props.tasks.map(t => {
        const changeStatus = () => props.changeTaskStatus(t.id, props.id);
        const removeTask = () => props.removeTask(t.id, props.id);
        const changeTaskTitle = (title: string) => props.changeTaskTitle(t.id, title, props.id)
        return (
            <li key={t.id} className={t.isDone ? "is-done" : ""}>
                <Checkbox
                    color={"primary"}
                    size={"small"}
                    checked={t.isDone}
                    onChange={changeStatus}
                />
                <EditableSpan
                    title={t.title}
                    changeTitle={changeTaskTitle}
                />
                <IconButton onClick={removeTask}>
                    <Delete/>
                </IconButton>
            </li>
        )
    })
    const all = () => props.changeTodoListFilter("all", props.id)
    const active = () => props.changeTodoListFilter("active", props.id)
    const completed = () => props.changeTodoListFilter("completed", props.id)
    const allButtonClass = props.todoListFilter === "all" ? "active-filter" : ""
    const compButtonClass = props.todoListFilter === "completed" ? "active-filter" : ""
    const actButtonClass = props.todoListFilter === "active" ? "active-filter" : ""
    const removeTodoList = () => props.removeTodoList(props.id)
    const nameTodoList = props.title
    const addTask = (title: string) => {
        props.addTasks(title, props.id)
    }
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.id)
    const butVariantAll = props.todoListFilter === "all" ? "outlined" : "contained"
    const buttonVariantActive = props.todoListFilter === "active" ? "outlined" : "contained"
    const buttonVariantCompleted = props.todoListFilter === "completed" ? "outlined" : "contained"
    return (
        <div>
            <h3>
                <EditableSpan title={nameTodoList} changeTitle={changeTodoListTitle}/>
                <IconButton onClick={removeTodoList}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul style={{listStyle: "none"}}>{tasks}</ul>
            <div>
                <Button
                    style={{marginRight: "5px"}}
                    className={allButtonClass}
                    color={"primary"}
                    size={"small"}
                    variant={butVariantAll}
                    onClick={all}>All
                </Button>
                <Button
                    style={{marginRight: "5px"}}
                    className={actButtonClass}
                    color={"primary"}
                    size={"small"}
                    variant={buttonVariantActive}
                    onClick={active}>Active
                </Button>
                <Button
                    style={{marginRight: "5px"}}
                    className={compButtonClass}
                    color={"primary"}
                    size={"small"}
                    variant={buttonVariantCompleted}
                    onClick={completed}>Completed
                </Button>
            </div>
        </div>
    )
}

export default TodoList