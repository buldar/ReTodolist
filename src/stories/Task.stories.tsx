import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Task} from "../Task";

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
              task={{id: '1', isDone: false, title: 'Something'}}
              todolistId={'todolist1'}
        />
        <Task removeTask={removeTaskCallback}
              changeTaskStatus={changeTaskStatusCallback}
              changeTaskTitle={changeTaskTitle}
              task={{id: '1', isDone: true, title: 'Nothing'}}
              todolistId={'todolist2'}
        />
    </>
}
