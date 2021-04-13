import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropsType = {
    addItem: (title: string) => void //родительский callback
}

function AddItemForm(props: AddItemFormPropsType) {
    const [error, setError] = useState<string | null>(null)
    const [title, setTitle] = useState<string>("")
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }
    const addItem = () => {
        const trimTitle = title.trim()
        if (trimTitle) {
            props.addItem(trimTitle)
        } else {
            setError("Title is required!")
        }
        setTitle("")
    }
    const pressAdd = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addItem()
        }
    }
    const classInput = error ? "error" : ""
    const errorMessage = error ? <div className={"errorText"}>{error}</div> : null

    return (
        <div>
            <input
                value={title}
                onChange={changeTitle}
                onKeyPress={pressAdd}
                className={classInput}
            />
            <button onClick={addItem}>+</button>
            {errorMessage}
        </div>
    )
}

export default AddItemForm

