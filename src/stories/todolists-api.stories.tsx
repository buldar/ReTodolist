import React, {useEffect, useState} from 'react'
import axios from "axios";
import {Todolist} from '../Todolist';
import {action} from "@storybook/addon-actions";

export default {
    title: 'API'
}

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'de8c7563-dd18-4912-9001-90e13a939eac'
    }
}

const callback = action('something here')

export const GetTodolists =
    () => {
        const [state, setState] = useState<any>(null)
        useEffect(() => {
            axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists',
                settings)
                .then((res) => {
                    setState(res.data);
                })
        }, [])
        return <div> {JSON.stringify(state)}</div>
    }

export const CreateTodolist =
    () => {
        const [state, setState] = useState<any>(null)
        useEffect(() => {
            axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists',
                {title: "testTodolist"}, settings).then((res) => {
                setState(res.data);
            })
        }, [])
        return <div> {JSON.stringify(state)}</div>
    }


export const DeleteTodolist =
    () => {
        const [state, setState] = useState<any>(null)
        useEffect(() => {
            const todolistId = 'fc6ff21a-6d78-4b3e-a11d-33f22c17953e';
            axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, settings)
                .then((res) => {
                    setState(res.data);
                })
        }, [])
        return <div> {JSON.stringify(state)}</div>
    }

export const UpdateTodolistTitle =
    () => {
        const [state, setState] = useState<any>(null)
        useEffect(() => {
            const todolistId = 'dfb5cd4f-f090-4940-96a4-4a424ef79e09'
            axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {title: 'REACT>>>>>>>>>'}, settings)
                .then((res) => {
                    setState(res.data)
                })
        }, [])
        return <div> {JSON.stringify(state)}</div>
    }