import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

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
            {/*<input value={title}*/}
            {/*       onChange={onChangeHandler}*/}
            {/*       onKeyPress={onKeyPressHandler}*/}
            {/*       className={error ? "error" : ""}*/}
            {/*/>*/}
            <TextField id="outlined-search" label="Search field" type="search"
                       value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
            />
            <Button onClick={addItem}
                    variant={"contained"}
                    color={"primary"}>+</Button>
            {error && <div className="error-message">{error}</div>}
        </div>
    )
}