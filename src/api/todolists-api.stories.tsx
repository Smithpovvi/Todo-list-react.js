import React, { useEffect, useState } from "react"
import { todoAPI } from "./todo-Api"

export default {
    title: "API",
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoAPI.getTodo().then((res) => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoAPI.createTodo("new todo").then((res) => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoID = "f4497c25-c3cf-435f-81b2-03f0ef88ae99"
        todoAPI.deleteTodo(todoID).then((res) => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoID ="f4497c25-c3cf-435f-81b2-03f0ef88ae99"
        const title = "REDUX"
        todoAPI.updateTodo(todoID, title).then((res) => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
