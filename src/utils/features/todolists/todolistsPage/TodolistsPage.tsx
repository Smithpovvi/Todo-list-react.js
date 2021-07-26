import Grid from "@material-ui/core/Grid/Grid"
import Paper from "@material-ui/core/Paper/Paper"
import React from "react"
import { Redirect } from "react-router-dom"
import { TodolistDomainType } from "../../../../main/bll/reducers/todolists-reducer"
import { AddItemForm } from "../../addItemForm/AddItemForm"
import TodolistContainer from "../todolist/TodolistContainer"

type TodolistsPageType = {
    isLogining: boolean
    addTodolist: (title: string) => void
    todolists: Array<TodolistDomainType>
}

const TodolistsPage: React.FunctionComponent<TodolistsPageType> = (props) => {
    const { isLogining, addTodolist, todolists } = props

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
                                <TodolistContainer
                                    id={tl.id}
                                    entityStatus={tl.entityStatus}
                                    title={tl.title}
                                    filter={tl.filter}
                                />
                            </Paper>
                        </Grid>
                    )
                })}
            </Grid>
        </>
    )
}

export default TodolistsPage
