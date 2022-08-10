import React from 'react';
import {ComponentMeta} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Task} from "../Task";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";

export default {
    title: 'Task',
    component: Task,
} as ComponentMeta<typeof Task>;

const changeTaskStatusCallback = action('Status changed')
const removeTaskCallback = action('Task removed')
const changeTaskTitle = action('Title changed')

export const TaskBaseExample = () => {


    return <>
        <Task removeTask={removeTaskCallback}
              changeTaskStatus={changeTaskStatusCallback}
              changeTaskTitle={changeTaskTitle}
              task={{
                  id: '1', status: TaskStatuses.New, title: 'Something',
                  todoListId: 'todolist1', description: '', startDate: '',
                  deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
              }}
              todolistId={'todolist1'}
        />
        <Task removeTask={removeTaskCallback}
              changeTaskStatus={changeTaskStatusCallback}
              changeTaskTitle={changeTaskTitle}
              task={{
                  id: '1', status: TaskStatuses.Completed, title: 'Nothing',
                  todoListId: 'todolist2', description: '', startDate: '',
                  deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
              }}
              todolistId={'todolist2'}
        />
    </>
}
