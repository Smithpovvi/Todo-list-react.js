import React, { useCallback, useEffect } from "react"
import {
    changeTitleTodoThunk,
    changeTodolistFilter,
    deleteTodoThunk,
    FilterValuesType,
} from "../../../../main/bll/reducers/todolists-reducer"
import { useDispatch, useSelector } from "react-redux"
import {
    addTaskThunk,
    setTasksThunk,
} from "../../../../main/bll/reducers/tasks-reducer"
import Todolist from "./Todolist"
import { getTaskState } from "../../../selectors/selectors"
import { RequestStatusType } from "../../../../main/bll/reducers/app-reducer"

type TodolistContPropsType = {
    id: string
    entityStatus: RequestStatusType
    title: string
    filter: FilterValuesType
}

const TodolistContainer: React.FunctionComponent<TodolistContPropsType> = React.memo((props) => {
    const { id, entityStatus, title, filter } = props

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setTasksThunk(id))
    }, [])
    
    let allTasksFromState = useSelector(getTaskState)

    let tasks = allTasksFromState[id]

    const addTask = useCallback(
        (title: string) => {
            dispatch(addTaskThunk(id, title))
        },
        [id]
    )

    const removeTodolist = useCallback(() => {
        dispatch(deleteTodoThunk(props.id))
    }, [])

    const changeTodolistTitle = useCallback(
        (title: string) => {
            dispatch(changeTitleTodoThunk(id, title))
        },
        [id]
    )

    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        const action = changeTodolistFilter(todolistId, value)
        dispatch(action)
    }, [])

    return (
        <Todolist
            id={id}
            addTask={addTask}
            changeFilter={changeFilter}
            changeTodolistTitle={changeTodolistTitle}
            entityStatus={entityStatus}
            filter={filter}
            removeTodolist={removeTodolist}
            tasks={tasks}
            title={title}
        />
    )
})

export default TodolistContainer
