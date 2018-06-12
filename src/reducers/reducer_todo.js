import { TodoTypes } from '../actions/type_todo';
let counter = 1;
export default function (state = [], action) {
    switch (action.type) {
        case TodoTypes.ADD_TODO:
            if (action.payload.text.length > 0) {
                return [{
                    todo: action.payload.text,
                    id: counter++
                }, ...state];
            } return state
        case TodoTypes.DELETE_TODO:
            return state.filter((todo) => {
                return todo.id !== action.payload.id
            })
        default: return state;
    }
}

