import React, {useState} from 'react'
import './App.css'
import TodoList from "./TodoList"
import {v1} from "uuid"
import AddItemForm from "./AddItemForm"
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core"
import {Menu} from "@material-ui/icons"

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
export type FilterValuesTypes = "all" | "active" | "completed"
export type TodoListType = {
    title: string,
    filter: FilterValuesTypes,
    id: string
}
export type TaskStateType = {
    [key: string]: Array<TaskType>,
}

function App() {
    const todoListID_1 = v1()
    const todoListID_2 = v1()
    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID_1, title: "What to learn", filter: "all"},
        {id: todoListID_2, title: "What to buy", filter: "all"},
    ])
    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListID_1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "React", isDone: false},
        ],
        [todoListID_2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Sweet", isDone: false},
        ]
    })
    const todoListComponents = todoLists.map(tl => {
        return (
            <Grid item key={tl.id}>
                <Paper elevation={6} style={{padding: "20px"}}>
                    <TodoList
                        id={tl.id}
                        title={tl.title}
                        tasks={getTaskForTodoList(tl)}
                        addTasks={addTasks}
                        removeTask={removeTask}
                        changeTodoListFilter={changeTodoListFilter}
                        todoListFilter={tl.filter}
                        changeTaskStatus={changeTaskStatus}
                        removeTodoList={removeTodoList}
                        changeTaskTitle={changeTaskTitle}
                        changeTodoListTitle={changeTodoListTitle}
                    />
                </Paper>
            </Grid>
        )
    })

    function addTasks(title: string, todoListID: string) {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        const updateTask = [newTask, ...tasks[todoListID]];
        setTasks({...tasks, [todoListID]: updateTask});
    }

    function removeTask(taskID: string, todoListID: string) {
        tasks[todoListID] = tasks[todoListID].filter(t => t.id !== taskID)
        setTasks({...tasks})
    }

    function changeTodoListFilter(newFilterValue: FilterValuesTypes, todoListID: string) {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, filter: newFilterValue} : tl))
    }

    function getTaskForTodoList(todoList: TodoListType) {
        switch (todoList.filter) {
            case "active":
                return tasks[todoList.id].filter(t => !t.isDone)
            case "completed":
                return tasks[todoList.id].filter(t => t.isDone)
            default:
                return tasks[todoList.id]
        }
    }

    function changeTaskStatus(taskID: string, todoListID: string) {
        const updatedTask = tasks[todoListID].map(t => t.id === taskID ? {...t, isDone: !t.isDone} : t)
        setTasks({...tasks, [todoListID]: updatedTask});
    }

    function removeTodoList(todoListID: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID));
        delete tasks[todoListID];
    }

    function addTodoList(title: string) {
        const newTodoListID = v1()
        const newTodoList: TodoListType = {
            id: newTodoListID, title, filter: "all"
        }
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [newTodoListID]: []})
    }

    function changeTaskTitle(taskID: string, title: string, todoListID: string) {
        const updatedTask = tasks[todoListID].map(t => t.id === taskID ? {...t, title: title} : t)
        setTasks({
            ...tasks,
            [todoListID]: updatedTask
        })
    }

    function changeTodoListTitle(tittle: string, todoListID: string) {
        const updatedTodoLists = todoLists.map(tl => tl.id === todoListID ? {...tl, title: tittle} : tl)
        setTodoLists(updatedTodoLists)
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        TodoList
                    </Typography>
                    <Button color="inherit" variant={"outlined"}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container={true} style={{padding: "20px 0px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container={true} spacing={5}>
                    {todoListComponents}
                </Grid>
            </Container>
        </div>
    )

}

export default App

