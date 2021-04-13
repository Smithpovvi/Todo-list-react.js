import React from "react";
import {FilterValuesTypes, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";

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
                <input type="checkbox" checked={t.isDone} onChange={changeStatus}/>
                <EditableSpan
                    title={t.title}
                    changeTitle={changeTaskTitle}
                />
                <button onClick={removeTask}>X</button>
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

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <button onClick={removeTodoList}>X</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>{tasks}</ul>
            <div>
                <button
                    className={allButtonClass}
                    onClick={all}>All
                </button>
                <button
                    className={actButtonClass}
                    onClick={active}>Active
                </button>
                <button
                    className={compButtonClass}
                    onClick={completed}>Completed
                </button>
            </div>
        </div>
    )

}

export default TodoList