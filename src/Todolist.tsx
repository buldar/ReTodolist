import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {IconButton, Button, Checkbox} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
// import Button from "@material-ui/core/Button";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    filter: FilterValuesType
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
}

export function Todolist(props: PropsType) {

    const removeTodolist = () => props.removeTodolist(props.id)
    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }

    return <div>

        <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                    }
                    const onChangeTitleHandler = (newValue: string) => {
                        props.changeTaskTitle(t.id, newValue, props.id)
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox onChange={onChangeStatusHandler} checked={t.isDone}/>
                        <EditableSpan title={t.title}
                                      onChange={onChangeTitleHandler}/>
                        <IconButton size={"small"} onClick={onClickHandler}>
                            <Delete fontSize={"inherit"}/>
                        </IconButton>
                    </li>
                })
            }
        </ul>
        <div>
            <Button onClick={onAllClickHandler}
                    variant={"outlined"}
                    color={"default"}>All</Button>
            <Button onClick={onActiveClickHandler}
                    variant={"outlined"}
                    color={"primary"}>Active</Button>
            <Button onClick={onCompletedClickHandler}
                    variant={"outlined"}
                    color={"secondary"}>Complited</Button>
        </div>
        {/*<div>*/}
        {/*    <button className={props.filter === 'all' ? "active-filter" : ""}*/}
        {/*            onClick={onAllClickHandler}>All*/}
        {/*    </button>*/}
        {/*    <button className={props.filter === 'active' ? "active-filter" : ""}*/}
        {/*            onClick={onActiveClickHandler}>Active*/}
        {/*    </button>*/}
        {/*    <button className={props.filter === 'completed' ? "active-filter" : ""}*/}
        {/*            onClick={onCompletedClickHandler}>Completed*/}
        {/*    </button>*/}
        {/*</div>*/}
    </div>;
}


