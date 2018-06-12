import { combineReducers } from 'redux';
import reducer_todo from './reducer_todo';

const rootReducer = combineReducers({
    todo: reducer_todo,
})

export default rootReducer;