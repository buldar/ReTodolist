import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'de8c7563-dd18-4912-9001-90e13a939eac'
    }
}
const instance = axios.create({
    baseURL:'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})

export type TodolistType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}
export type AddTodolistResponceType = {
    messages: Array<string>,
    resultCode: number,
    data: {
        item: TodolistType
    }
}
export type DeleteTodolistResponceType = {
    resultCode: number,
    messages: Array<string>,
    data: {}
}
export type UpdateTodolistResponceType = {
    resultCode: number,
    messages: Array<string>,
    data: {}
}
export type ResponceType <D={}> = {
    resultCode:number,
    messages:Array<string>,
    data:D
}

export const todolistsAPI = {
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponceType>(`todo-lists/${todolistId}`,
            {title: title})
    },
    getTodolists() {
        return instance.get<Array<TodolistType>>(`todo-lists`)
    },
    createTodolist(title: string) {
        return instance.post<ResponceType<{item:TodolistType}>>(`todo-lists`,
            {title: title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponceType>(`todo-lists/${todolistId}`)
    }
}

type TaskType = {
    description: string,
    title: string,
    completed: boolean,
    status: number,
    priority: number,
    startDate: string,
    deadline: string,
    id: string,
    todoListId: string,
    order: number,
    addedDate: string
}
export type GetTasksResponseType = {
    items: Array<TaskType>,
    totalCount: number,
    error: string | null
}
export type ChangeTaskType = {
    title:string,
    description:string | null,
    completed:boolean,
    status:number,
    priority:number,
    startDate:string | null,
    deadline:string | null
}

export const tasksAPI = {
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post(`todo-lists/${todolistId}/tasks`,
            {title: title})
    },
    deleteTask(todolistId:string,id:string){
        return instance.delete<ResponceType>(`todo-lists/${todolistId}/tasks/${id}`)
    },
    changeTask(todolistId:string,id:string, task:ChangeTaskType) {
        return instance.put(`todo-lists/${todolistId}/tasks/${id}`, task)
    }
}
