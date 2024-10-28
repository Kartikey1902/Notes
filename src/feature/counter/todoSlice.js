import { createSlice } from "@reduxjs/toolkit";
import toast from 'react-hot-toast';

const initialState = {
  todos: localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState, 
  reducers: {
    addTodoFile: (state, action) => {
      const todo = action.payload;
      state.todos.push(todo);
      localStorage.setItem("todos", JSON.stringify(state.todos));
      toast.success('ToDo Successfully created!');
    },
    
    updateTodoFile: (state, action) => {
      const todo = action.payload;
      const index = state.todos.findIndex((t) => t.id === todo.id);

      if(index >= 0){
        state.todos[index] = todo;
        localStorage.setItem("todos", JSON.stringify(state.todos));
        toast.success('ToDo Successfully updated!');
      }
    },

    resetAllTodoFiles: (state, action) => {
      state.todos = [];
      localStorage.removeItem("todos");
      toast.success('All ToDos Successfully deleted!');
    },

    deleteTodoFile: (state, action) => {
      const todoId = action.payload;
      console.log(todoId);

      const index = state.todos.findIndex((t) => t._id   === todoId);
      console.log(index);
      
      if(index >= 0){
        state.todos.splice(index, 1);
        localStorage.setItem("todos", JSON.stringify(state.todos));
        toast.success('ToDo Successfully deleted!');
      }

    },
  },
});

// Action creators are generated for each case reducer function
export const { addTodoFile, updateTodoFile, resetAllTodoFiles, deleteTodoFile } =
  todoSlice.actions;

export default todoSlice.reducer;
