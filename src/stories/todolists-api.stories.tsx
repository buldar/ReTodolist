import React, {useEffect, useState} from 'react'
import axios from "axios";
import {Todolist} from '../Todolist';
import {action} from "@storybook/addon-actions";
import {tasksAPI, todolistsAPI} from "../api/todolists-api";

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

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.getTodolists()
            .then((res) => {
                setState(res.data);
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.createTodolist('SecondTestTodolist')
            .then((res) => {
                setState(res.data);
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}


export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '4beddc1c-cf5e-47c8-9972-9f6991bff82d';
        todolistsAPI.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data);
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'dfb5cd4f-f090-4940-96a4-4a424ef79e09'
        todolistsAPI.updateTodolist(todolistId, 'NewName2!')
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'bdfde6f6-ad40-4899-91fa-70826d9be2f7'
        tasksAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'bdfde6f6-ad40-4899-91fa-70826d9be2f7'
        tasksAPI.createTask(todolistId,'TestTask2')
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(()=>{
        const todolistId = 'bdfde6f6-ad40-4899-91fa-70826d9be2f7'
        const taskId = '8afc0b2b-8825-4540-971a-8f5fb6edb7e3'
        tasksAPI.deleteTask(todolistId,taskId)
            .then((res)=>{
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const ChangeTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(()=>{
        const todolistId = 'bdfde6f6-ad40-4899-91fa-70826d9be2f7'
        const taskId = 'b9f1d892-376f-4cf4-8226-5e0b1a68393a'
        const task = {
            title:'Do_something',
            description: null,
            completed:false,
            status:0,
            priority:1,
            startDate:null,
            deadline:null
        }
        tasksAPI.changeTask(todolistId,taskId,task)
            .then((res)=>{
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}