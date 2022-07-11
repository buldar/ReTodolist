import React from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";

type PropsType = {
    id:string
    isDone:boolean
    onChangeStatusHandler:()=>void
    title:string
    onChangeTitleHandler:()=>void
    onClickHandler:()=>void
}

export const Task = (props:PropsType) => {
    return (
        <div key={props.id} className={props.isDone ? "is-done" : ""}>
            <Checkbox onChange={props.onChangeStatusHandler} checked={props.isDone}/>
            <EditableSpan title={props.title}
                          onChange={props.onChangeTitleHandler}/>
            <IconButton size={"small"} onClick={props.onClickHandler}>
                <Delete fontSize={"inherit"}/>
            </IconButton>
        </div>
    )
}