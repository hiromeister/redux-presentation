import React, { Component } from 'react';
import './App.css';
import TodoList from './containers/TodoList'

export default class App extends Component {
  render() {
    return (
      <div>
        < TodoList />
      </div>
    )
  }
}
