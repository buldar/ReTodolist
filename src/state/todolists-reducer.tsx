import {FilterValuesType} from "../App";
import {v1} from "uuid";

type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string
    id: string
}

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    title: string
    id: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    filter: FilterValuesType
    id: string
}

type ActionType = RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

export const addTodolistAC = (title: string): AddTodolistActionType => {
    return {id: v1(), title: title, type: "ADD-TODOLIST" }
}
export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const changeTodolistTitleAC = (title: string, id: string): ChangeTodolistTitleActionType => {
    return {id: id, title: title, type: "CHANGE-TODOLIST-TITLE"}
}
export const changeTodolistFilterAC = (filter: FilterValuesType, id: string): ChangeTodolistFilterActionType => {
    return {type: "CHANGE-TODOLIST-FILTER", filter: filter, id: id}
}

export const todolistsReducer = (state: Array<TodolistType>, action: ActionType): Array<TodolistType> => {
    debugger
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return [...state].filter(tl => tl.id !== action.id);
        case 'ADD-TODOLIST':
            return [{id: action.id, title: action.title, filter: "all"}, ...state];
        case 'CHANGE-TODOLIST-TITLE':
            let changeTodolistTitleState = [...state]
            let renamedTotolist = changeTodolistTitleState.find(tl => tl.id === action.id)
            if (renamedTotolist) {
                renamedTotolist.title = action.title
            }
            return changeTodolistTitleState;
        case 'CHANGE-TODOLIST-FILTER':
            let changeFilterState = [...state]
            let todolistWithChangedFilter = changeFilterState.find(tl => tl.id === action.id)
            if (todolistWithChangedFilter) {
                todolistWithChangedFilter.filter = action.filter
            }
            return changeFilterState
        default:
            return state
    }

}