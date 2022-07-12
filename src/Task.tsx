import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./Todolist";

type PropsType = {
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    task: TaskType
    todolistId:string
}

export const Task = React.memo( (props:PropsType) => {

    const onClickHandler = () => props.removeTask(props.task.id, props.todolistId)
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeTaskStatus(props.task.id, newIsDoneValue, props.todolistId);
    }
    const onChangeTitleHandler = useCallback ((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistId)
    },[props.changeTaskTitle, props.task.id,props.todolistId])

    return <div key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
        <Checkbox onChange={onChangeStatusHandler} checked={props.task.isDone}/>
        <EditableSpan title={props.task.title}
                      onChange={onChangeTitleHandler}/>
        <IconButton size={"small"} onClick={onClickHandler}>
            <Delete fontSize={"inherit"}/>
        </IconButton>
    </div>

})