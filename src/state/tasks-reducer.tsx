import {v1} from "uuid";
import {TasksStateType} from "../AppWithRedux";
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsType} from "./todolists-reducer";
import {TaskPriorities, tasksAPI, TaskStatuses, TaskType} from "../api/todolists-api";
import {Dispatch} from "redux";


export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    id: string,
    todolistId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK',
    title: string,
    todolistId: string
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    id: string,
    status: TaskStatuses,
    todolistId: string
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    title: string,
    todolistId: string,
    id: string
}

export type SetTasksType = {
    type: 'SET-TASKS',
    tasks: Array<TaskType>,
    todolistId: string
}

type ActionType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsType
    | SetTasksType

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistId]: [...state[action.todolistId]]
                    .filter(t => t.id !== action.id)
            }
        case 'ADD-TASK':
            const stateCopy = {...state}
            const newTask: TaskType = {
                id: v1(),
                title: action.title,
                status: TaskStatuses.New,
                todoListId: action.todolistId,
                description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            }
            return {
                ...state,
                [action.todolistId]: [newTask, ...state[action.todolistId]]
            }
        case "CHANGE-TASK-STATUS": {
            let todolistTasks = state[action.todolistId];
            state[action.todolistId] = todolistTasks.map(t => {
                if (t.id === action.id) {
                    t.status = action.status
                    return {...t, status: action.status}
                }
                return t
            })
            return {...state};
        }
        case "CHANGE-TASK-TITLE": {
            let todolistTasks = state[action.todolistId];
            state[action.todolistId] = todolistTasks.map(t => {
                if (t.id === action.id) {
                    t.title = action.title
                    return {...t, title: action.title}
                }
                return t
            })
            return {...state};
        }
        case "ADD-TODOLIST":
            return {
                ...state,
                [action.id]: []
            }
        case "REMOVE-TODOLIST":
            let deletedTlState = {...state}
            delete deletedTlState[action.id]
            return deletedTlState
        case "SET-TODOLISTS": {
            const copyState = {...state}
            action.todolists.map(tl => {
                return copyState[tl.id] = []
            })
            return copyState
        }
        case "SET-TASKS":{
            const copyState = {...state}
            copyState[action.todolistId] = action.tasks
            return copyState
        }
        default:
            return state
    }

}

export const removeTaskAC = (id: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', id, todolistId}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title, todolistId}
}
export const changeTaskStatusAC = (id: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', id, status, todolistId}
}
export const changeTaskTitleAC = (title: string, id: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: "CHANGE-TASK-TITLE", id, title, todolistId}
}
export const setTasksAC = (tasks:Array<TaskType>, todolistId:string):SetTasksType => {
    return {type:'SET-TASKS', tasks, todolistId}
}

export const fetchTasksTC = (todolistId:string) => {
    return (dispatch:Dispatch) => {
        tasksAPI.getTasks(todolistId)
            .then((res)=>{
                dispatch(setTasksAC(res.data.items,todolistId))
            })
    }
}
