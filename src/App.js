import React, { useState, useEffect } from 'react';
import './App.scss';
import queryString from 'query-string'
import TodoList from './Components/TodoList';
import TodoForm from './Components/TodoForm';
import PostList from './Components/PostList';
import Pagination from './Components/Pagination';
import PostFiltersForm from './Components/PostFiltersForm';



function App(props) {
  const [todoList, setTodoList] = useState([
    { id: 1, title: 'I love Reactjs' },
    { id: 2, title: 'I love Nodejs' },
    { id: 3, title: 'I love ReactNative' },
  ]);

  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 1,
  });

  const [filters, setFilters] = useState({
    _limit: 10,
    _page: 1,
  })

  const [postList, setpostList] = useState([]);
  useEffect(() => {
    async function fetchPostList() {
      //..
      try {
        // _limit=10&_page=1
        const paramsString = queryString.stringify(filters)
        const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramsString}`;
        const response = await fetch(requestUrl)
        const responseJSON = await response.json();
        console.log({ responseJSON });

        const { data, pagination } = responseJSON
        setpostList(data);
        setPagination(pagination)
      } catch (error) {
        console.log('Failed to fetch post list: ', error.message);

      }
    }
    fetchPostList();
  }, [filters]);

  function handlePageChange(newPage) {
    console.log('new page: ', newPage);
    setFilters({
      ...filters,
      _page: newPage
    })
  }

  function handelTodoClick(todo) {
    console.log(todo);
    const index = todoList.findIndex((x) => x.id === todo.id)

    if (index < 0) return;

    const newTodoList = [...todoList];
    newTodoList.splice(index, 1)
    setTodoList(newTodoList);
  }

  function handleTodolFormSubmit(formValue) {
    console.log("Form submit: ", formValue);
    //add new todo list
    const newTodo = {
      id: Date.now() + 1,
      ...formValue
    }
    const newTodoList = [...todoList]
    newTodoList.push(newTodo)
    setTodoList(newTodoList)
  }

  function handleFiltersChange(newFilters) {
    console.log('new filter: ', newFilters);
    setFilters({
      ...filters,
      _page: 1,
      title_like: newFilters.searchTerm,
    })

  }

  return (
    <div className="app">
      <h1>React Hooks - PostList</h1>
      <PostFiltersForm onSubmit={handleFiltersChange} />
      <PostList posts={postList} />
      <Pagination
        Pagination={pagination}
        onPageChange={handlePageChange}
      />
      {/* <TodoForm onSubmit={handleTodolFormSubmit} />
      <TodoList todos={todoList} onTodoClick={handelTodoClick} /> */}
    </div>
  );
}

export default App;