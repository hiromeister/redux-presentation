import React, { Component } from "react";
import "./App.css";
import { connect } from "react-redux";
import { deleteTodo, addTodo } from "./actions/action_todo";
import { bindActionCreators } from "redux";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
  }
  getTodo(e) {
    this.setState({
      text: e.target.value
    });
  }
  onAddTodo(text) {
    this.props.addTodo(text);
  }
  onDeleteTodo(id) {
    this.props.deleteTodo(id);
  }
  render() {
    return (
      <div className="App">
        <h1>Todo with Redux</h1>
        <h3>Ajouter une todo</h3>
        <input type="text" onChange={this.getTodo.bind(this)} />
        <button
          onClick={() => {
            this.onAddTodo(this.state.text);
          }}
        >
          Ajouter la Todo
        </button>
        {this.props.todoItem.map(todo => {
          return (
            <li key={todo.id}>
              {todo.todo}{" "}
              <button
                onClick={() => {
                  this.onDeleteTodo(todo.id);
                }}
              >
                X
              </button>
            </li>
          );
        })}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return { todoItem: state.todo };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addTodo,
      deleteTodo
    },
    dispatch
  );
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
