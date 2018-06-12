import { TodoTypes } from "./type_todo";

export const addTodo = todo => {
  return dispatch => {
    dispatch({
      type: TodoTypes.ADD_TODO,
      payload: {
        text: todo
      }
    });
  };
};

export const deleteTodo = id => {
  return dispatch => {
    dispatch({
      type: TodoTypes.DELETE_TODO,
      payload: {
        id
      }
    });
  };
};
