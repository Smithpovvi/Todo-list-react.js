import React, { ChangeEvent, useCallback } from "react";
import { useDispatch } from "react-redux";
import { RequestStatusType } from "../../../main/bll/reducers/app-reducer";
import {
    changeTaskStatusThunk,
    changeTaskTitleThunk,
    deleteTasksThunk,
} from "../../../main/bll/reducers/tasks-reducer";
import { TaskStatuses, TaskType } from "../../../main/server-api/todolists-api";
import Task from "./Task";

type TaskPropsType = {
    task: TaskType;
    todolistId: string;
    entityStatusForTask: RequestStatusType;
};

const TasksContainer: React.FunctionComponent<TaskPropsType> = (props) => {
    const { task, todolistId, entityStatusForTask } = props;

    const dispatch = useDispatch();

    const changeStatus = useCallback(
        (id: string, status: TaskStatuses, todolistId: string) => {
            dispatch(changeTaskStatusThunk(todolistId, id, status));
        },
        [todolistId]
    );

    const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
        dispatch(changeTaskTitleThunk(todolistId, id, newTitle));
    }, []);

    const onClickHandler = useCallback(
        () => dispatch(deleteTasksThunk(todolistId, task.id)),
        [todolistId, task.id]
    );

    const onChangeHandler = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked;
            changeStatus(
                task.id,
                newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New,
                todolistId
            );
        },
        [task.id, todolistId]
    );

    const onTitleChangeHandler = useCallback(
        (newValue: string) => {
            changeTaskTitle(task.id, newValue, todolistId);
        },
        [task.id, todolistId]
    );

    return (
        <Task
            task={task}
            entityStatusForTask={entityStatusForTask}
            onTitleChangeHandler={onTitleChangeHandler}
            onClickHandler={onClickHandler}
            onChangeHandler={onChangeHandler}
        />
    );
};

export default TasksContainer;
