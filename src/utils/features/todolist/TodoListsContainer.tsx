import Grid from "@material-ui/core/Grid/Grid"
import Paper from "@material-ui/core/Paper/Paper"
import React, { useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router-dom"
import { AddItemForm } from "../addItemForm/AddItemForm"
import { getAppState, getTodoState } from "../../selectors/selectors"
import { addTodoThunk, setTodoThunk } from "../../../main/bll/reducers/todolists-reducer"
import { Todolist } from "./Todolist"

const TodoListsContainer: React.FunctionComponent = () => {
    const [...todolists] = useSelector(getTodoState)
    const { isLogining } = useSelector(getAppState)

    useEffect(() => {
        if (isLogining) {
            dispatch(setTodoThunk())
        } else return
    }, [])

    const dispatch = useDispatch()

    const addTodolist = useCallback(
        (title: string) => {
            dispatch(addTodoThunk(title))
        },
        [dispatch]
    )

    if (!isLogining) return <Redirect to={"/logining"} />

    return (
        <>
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
        </>
    )
}

export default TodoListsContainer
