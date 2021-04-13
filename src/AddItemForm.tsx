import React, {ChangeEvent, KeyboardEvent, useState} from "react"
import {IconButton, TextField} from "@material-ui/core"
import {AddBox} from "@material-ui/icons"

type AddItemFormPropsType = {
    addItem: (title: string) => void
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
    const errorMessage = error ? <div className={"errorText"}>{error}</div> : null
    return (
        <div>
            <TextField
                variant={"outlined"}
                value={title}
                size={"small"}
                onChange={changeTitle}
                onKeyPress={pressAdd}
                label={"Title:"}
                error={!!error}
                helperText={errorMessage}
            />
            <IconButton onClick={addItem} color={"primary"}>
                <AddBox/>
            </IconButton>
        </div>
    )
}

export default AddItemForm

