import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import {AddBox} from "@material-ui/icons";

type AddItemFormType = {
    addItem: (title: string) => void,
}

export function AddItemForm(props: AddItemFormType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addItem();
        }
    }

    const addItem = () => {
        let newTitle = title.trim();
        if (newTitle !== "") {
            props.addItem(newTitle);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    return (
        <div>
            <TextField id="outlined-search" label="New title" type="search"
                       value={title}
                       error={!!error}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       helperText={error}
            />
            <IconButton color={"inherit"}
                        onClick={addItem}>
                <AddBox fontSize={"large"}/>
            </IconButton>
        </div>
    )
}