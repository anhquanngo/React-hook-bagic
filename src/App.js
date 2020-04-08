import React, { useState } from 'react';
import './App.scss';
import TodoList from './Components/TodoList';


function App(props) {
  const [todoList, setTodoList] = useState([
    { id: 1, title: 'I love Reactjs' },
    { id: 2, title: 'I love Nodejs' },
    { id: 3, title: 'I love ReactNative' },
  ]);

  function handelTodoClick(todo) {
    console.log(todo);
    const index = todoList.findIndex((x) => x.id === todo.id)

    if (index < 0) return;

    const newTodoList = [...todoList];
    newTodoList.splice(index, 1)
    setTodoList(newTodoList);
  }

  return (
    <div className="app">
      <h1>React Hooks - TodoList</h1>

      <TodoList todos={todoList} onTodoClick={handelTodoClick} />
    </div>
  );
}

export default App;