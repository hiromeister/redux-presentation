import React from 'react'


const TodoItem = (props) => {

    const { todoId, todo } = props;
    return (
        <div>
            <li key={todoId}> {todo} <button onClick={() => { props.onDeleteTodo(todoId) }} >X</button></li>
        </div>
    )
}
export default TodoItem;