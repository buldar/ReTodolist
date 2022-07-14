import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {AddItemForm} from "../AddItemForm";
import {action} from "@storybook/addon-actions";

export default {
    title: 'AddItemForm',
    component: AddItemForm,
} as ComponentMeta<typeof AddItemForm>;

const callback = action('Button add was pressed')

export const AddItemFormBaseExample = () => {
    return <AddItemForm addItem={callback}/>
    }
