import React, { useCallback, useEffect } from "react"
import "./App.css"
import { Todolist } from "./Todolist"
import { AddItemForm } from "./AddItemForm"
import {
    AppBar,
    Button,
    Container,
    Grid,
    IconButton,
    LinearProgress,
    Paper,
    Toolbar,
    Typography,
} from "@material-ui/core"
import { Menu } from "@material-ui/icons"
import { setTodoThunk, TodolistDomainType, addTodoThunk } from "./state/todolists-reducer"
import { useDispatch, useSelector } from "react-redux"
import { AppRootStateType } from "./state/store"
import { RequestStatusType } from "./state/app-reducer"
import { ErrorSnackbar } from "./ErrorSnackbar"
//
//
function App() {
    //
    useEffect(() => {
        dispatch(setTodoThunk())
    }, [])
    //
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(
        (state) => state.todolists
    )
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    const dispatch = useDispatch()
    //
    const addTodolist = useCallback(
        (title: string) => {
            dispatch(addTodoThunk(title))
        },
        [dispatch]
    )
    //
    return (
        <div className="App">
            <ErrorSnackbar />
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6">News</Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
                {status === "loading" && <LinearProgress color={"secondary"} />}
            </AppBar>
            <Container fixed>
                <Grid container style={{ padding: "20px" }}>
                    <AddItemForm addItem={addTodolist} disabled={"idle"} />
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map((tl) => {
                        return (
                            <Grid item key={tl.id}>
                                <Paper style={{ padding: "10px" }} elevation={3}>
                                    <Todolist id={tl.id} entityStatus={tl.entityStatus} />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    )
}

export default App
