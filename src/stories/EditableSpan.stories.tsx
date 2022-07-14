import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {EditableSpan} from "../EditableSpan";

export default {
    title: 'EditableSpan',
    component: EditableSpan,
} as ComponentMeta<typeof EditableSpan>;

const changeTodolistTitleCallback = action('Title was changed')

export const TaskBaseExample = () => {
    return <>
        <EditableSpan title={'Test title'} onChange={changeTodolistTitleCallback}/>
    </>
}
