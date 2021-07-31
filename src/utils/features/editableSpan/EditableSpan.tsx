import React, { ChangeEvent, useState } from "react";
import { TextField } from "@material-ui/core";
import { RequestStatusType } from "../../../main/bll/reducers/app-reducer";

type EditableSpanPropsType = {
    value: string;
    onChange: (newValue: string) => void;
    entityStatusForTodo?: RequestStatusType;
    entityStatusForTask?: RequestStatusType;
};

export const EditableSpan = React.memo(function (props: EditableSpanPropsType) {
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(props.value);

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.value);
    };
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    };
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    };

    return editMode ? (
        <TextField
            value={title}
            onChange={changeTitle}
            autoFocus
            onBlur={activateViewMode}
            disabled={props.entityStatusForTodo === "loading"}
        />
    ) : (
        <span
            onDoubleClick={
                props.entityStatusForTask !== "loading" && props.entityStatusForTodo !== "loading"
                    ? activateEditMode
                    : undefined
            }
        >
            {props.value}
        </span>
    );
});
