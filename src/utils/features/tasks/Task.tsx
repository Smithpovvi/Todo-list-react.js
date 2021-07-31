import React, { ChangeEvent } from "react";
import { Checkbox, IconButton } from "@material-ui/core";
import { EditableSpan } from "../editableSpan/EditableSpan";
import { Delete } from "@material-ui/icons";
import { TaskStatuses, TaskType } from "../../../main/server-api/todolists-api";
import { RequestStatusType } from "../../../main/bll/reducers/app-reducer";

type TaskPropsType = {
    task: TaskType;
    entityStatusForTask: RequestStatusType;
    onTitleChangeHandler: (newValue: string) => void;
    onClickHandler: () => void;
    onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
};
const Task: React.FunctionComponent<TaskPropsType> = React.memo((props) => {
    const { task, entityStatusForTask, onTitleChangeHandler, onClickHandler, onChangeHandler } =
        props;

    return (
        <div key={task.id} className={task.status === TaskStatuses.Completed ? "is-done" : ""}>
            <Checkbox
                checked={task.status === TaskStatuses.Completed}
                color="primary"
                onChange={onChangeHandler}
                disabled={entityStatusForTask === "loading"}
            />
            <EditableSpan
                value={task.title}
                onChange={onTitleChangeHandler}
                entityStatusForTask={entityStatusForTask}
            />
            <IconButton onClick={onClickHandler} disabled={entityStatusForTask === "loading"}>
                <Delete />
            </IconButton>
        </div>
    );
});

export default Task;
