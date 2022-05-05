import React, {ChangeEvent, KeyboardEvent} from "react";

type PropsType = {
    value:string,
    onChange:(e: ChangeEvent<HTMLInputElement>)=>void,
    onKeyPress:(e: KeyboardEvent<HTMLInputElement>)=>void,
    error:string | null,
    onClick:()=>void,
}

export let AddItemForm = (props:PropsType) => {
    return (
        <div>
            <input value={props.value}
                   onChange={props.onChange}
                   onKeyPress={props.onKeyPress}
                   className={props.error ? "error" : ""}
            />
            <button onClick={props.onClick}>+</button>
            {props.error && <div className="error-message">{props.error}</div>}
        </div>
    )
}