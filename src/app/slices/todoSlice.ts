import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit"
import type { Todo } from "../../types/todo"

const initialState: Todo[] = [{ id: 1, title: "Learn Redux", description: "", completed: false},{ id: 2, title: " Redux", description: "Learn Redux Toolkit", completed: false}, { id: 3, title: "Learn", description: "Learn Redux Toolkit", completed: false}]

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<{title: string, description: string}>) => {
      state.push({title: action.payload.title, description: action.payload.description, completed: false, id: state.length > 0 ? state[state.length - 1].id + 1 : 1})
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      return state.filter(todo => todo.id !== action.payload)
    },
    editTodo: (state, action: PayloadAction<{id: number, title: string, description: string}>) => {
      const todo = state.find(todo => todo.id === action.payload.id)
      if (todo) {
        todo.title = action.payload.title
        todo.description = action.payload.description
      }
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.find(todo => todo.id === action.payload)
      if (todo) {
        todo.completed = !todo.completed
      }
    },
  },
})

export const { addTodo, removeTodo, toggleTodo, editTodo } = todoSlice.actions