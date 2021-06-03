import React, { useEffect, useState } from "react"
import { taskAPI } from "./todo-Api"

export default {
    title: "API-TASK",
}

export const GetTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoID = ""
        taskAPI.getTask(todoID).then((res) => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoID = ""
        const taskTitle = "React"
        taskAPI.createTask(todoID, taskTitle).then((res) => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoID = ""
        const taskID = ""
        taskAPI.deleteTask(todoID, taskID).then((res) => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoID = ""
        const taskID = ""
        taskAPI.updateTask(todoID, taskID).then((res) => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
