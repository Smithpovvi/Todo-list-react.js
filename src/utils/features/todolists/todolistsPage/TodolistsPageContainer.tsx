import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAppState, getTodoState } from "../../../selectors/selectors";
import { addTodoThunk, setTodoThunk } from "../../../../main/bll/reducers/todolists-reducer";
import TodolistsPage from "./TodolistsPage";

const TodolistsContainer: React.FunctionComponent = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (isLogining) {
            dispatch(setTodoThunk());
        } else return;
    }, []);

    const [...todolists] = useSelector(getTodoState);
    const { isLogining } = useSelector(getAppState);

    const addTodolist = useCallback(
        (title: string) => {
            dispatch(addTodoThunk(title));
        },
        [dispatch]
    );

    return (
        <TodolistsPage addTodolist={addTodolist} isLogining={isLogining} todolists={todolists} />
    );
};

export default TodolistsContainer;
