import { useReducer } from "react";
import { Todo } from "../types/Todo";
import { ActionTodo } from "../types/ActionTodo";

const initialState: Todo[] = JSON.parse(localStorage.getItem('todo') || '[]');

const reducer = (state: Todo[], action: ActionTodo) => {
    switch (action.type) {
        case 'ADD':
            if (action.payload?.task) {
                const newState = [...state];
                newState.push({
                    id: state.length + 1,
                    task: action.payload.task,
                    done: false
                })
                return newState;
            }
        case 'DEL':
            if (action.payload?.id) {
                let newState = [...state];
                newState = newState.filter((item) => item.id !== action.payload?.id)
                return newState;
            }
        case 'CLEAR':
            const newState: Todo[] = [];
            return newState;
        case 'DONE':
            if (action.payload?.done !== undefined) {
                let newState = [...state];
                for (let i in state) {
                    if (newState[i].id === action.payload.id) {
                        newState[i].done = action.payload.done;
                    }
                }
                return newState;
            }
    }
    return state;
}

export const useTodoList = () => {
    return useReducer(reducer, initialState);
}