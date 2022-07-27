import axios from "axios";

const settings = {
    withCredentials:true,
    headers: {
        'API-KEY':'de8c7563-dd18-4912-9001-90e13a939eac'
    }
}

export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        const promise =
            axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,
                {title: title}, settings)
        return promise
    },
    getTodolists() {

    }
}
