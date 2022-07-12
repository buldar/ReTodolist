import React, {useCallback} from 'react';
import {FilterValuesType} from './AppWithRedux';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {IconButton, Button, Checkbox} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";


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

export const Todolist = React.memo(function (props: PropsType) {
        const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id), [props.id]);
        const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id), [props.id]);
        const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id), [props.id]);

        const removeTodolist = () => props.removeTodolist(props.id)

        const addTask = useCallback((title: string) => {
            props.addTask(title, props.id)
        }, [props.id, props.addTask])

        const changeTodolistTitle = useCallback((newTitle: string) => {
            props.changeTodolistTitle(props.id, newTitle)
        }, [props.id, props.changeTodolistTitle])

        let tasksForTodolist = props.tasks

        if (props.filter === "active") {
            tasksForTodolist = props.tasks.filter(t => t.isDone === false);
        }
        if (props.filter === "completed") {
            tasksForTodolist = props.tasks.filter(t => t.isDone === true);
        }

        return <div>

            <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                {
                    tasksForTodolist.map(t =>
                        <Task removeTask={props.removeTask}
                              changeTaskStatus={props.changeTaskStatus}
                              changeTaskTitle={props.changeTaskTitle}
                              task={t}
                              todolistId={props.id}
                              key={t.id}/>
                    )}
            </div>
            <div>
                <Button onClick={onAllClickHandler}
                        variant={props.filter === 'all' ? 'outlined' : 'text'}
                        color={"default"}>All</Button>
                <Button onClick={onActiveClickHandler}
                        variant={props.filter === 'active' ? 'outlined' : 'text'}
                        color={"primary"}>Active</Button>
                <Button onClick={onCompletedClickHandler}
                        variant={props.filter === 'completed' ? 'outlined' : 'text'}
                        color={"secondary"}>Completed</Button>
            </div>
        </div>;
    }
)

