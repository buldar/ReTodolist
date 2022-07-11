import {v1} from "uuid";
import {TasksStateType} from "../AppWithRedux";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";


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
    isDone: boolean,
    todolistId: string
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    title: string,
    todolistId: string,
    id: string
}
type ActionType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType

export const removeTaskAC = (id: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', id, todolistId}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title, todolistId}
}
export const changeTaskStatusAC = (id: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', id, isDone, todolistId}
}
export const changeTaskTitleAC = (title: string, id: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: "CHANGE-TASK-TITLE", id, title, todolistId}
}

const initialState:TasksStateType={}

export const tasksReducer = (state: TasksStateType=initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistId]: [...state[action.todolistId]]
                    .filter(t => t.id !== action.id)
            }
        case 'ADD-TASK':
            return {
                ...state,
                [action.todolistId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]]
            }
        case "CHANGE-TASK-STATUS":
            let todolistTasks = state[action.todolistId];
            let task = todolistTasks.find(t => t.id === action.id);
            if (task) {
                task.isDone = action.isDone;
            }
            state[action.todolistId] = [...todolistTasks]
            return {...state};
        case "CHANGE-TASK-TITLE":
            let newTasks = state[action.todolistId]
            let taskWithNewTitle = newTasks.find(t => t.id === action.id)
            if (taskWithNewTitle) {
                taskWithNewTitle.title = action.title
            }
            state[action.todolistId]=[...newTasks]

            return {...state}
        case "ADD-TODOLIST":
            return {
                ...state,
                [action.id]: []
            }
        case "REMOVE-TODOLIST":
            let deletedTlState = {...state}
            delete deletedTlState[action.id]
            return deletedTlState
        default:
            return state
    }

}
