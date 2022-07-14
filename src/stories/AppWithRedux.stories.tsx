import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {EditableSpan} from "../EditableSpan";
import AppWithRedux from "../AppWithRedux";
import {Provider} from "react-redux";
import {store} from "../state/store";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";

export default {
    title: 'AppWithRedux',
    component: AppWithRedux,
    decorators:[ReduxStoreProviderDecorator]
} as ComponentMeta<typeof AppWithRedux>;


export const AppExample = () => {
    return <>
        <AppWithRedux/>
    </>
}
