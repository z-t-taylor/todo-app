import { useState, useEffect } from "react";
import "./TodoList.css";

import TodoCard from "../TodoCard/TodoCard";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import BadgeList from "../BadgeList/BadgeList";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [badges, setBadges] = useState([]);
  const [completedTodoCount, setCompletedTodoCount] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTodos([...todos, { id: Date.now(), todo: newTodo, completed: false }]);
    setNewTodo("");
  };

  const handleChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleRemove = (id) => {
    const removeTodo = todos.filter((todo) => {
      return id !== todo.id;
    });
    setTodos(removeTodo);
  };

  const toggleComplete = (id) => {
    const completeTodo = todos.map((todo) => {
      return id === todo.id ? { ...todo, completed: !todo.completed } : todo;
    });
    setTodos(completeTodo);
    setCompletedTodoCount((count) => count + 1);
  };

  const mappedTodoCards = todos.map((todo, i) => {
    return (
      <TodoCard
        key={i}
        todo={todo}
        handleRemove={handleRemove}
        toggleComplete={toggleComplete}
      />
    );
  });

  const resetAll = () => {
    setTodos([]);
    setBadges([]);
  };

  useEffect(() => {
    if (completedTodoCount === 0) return;

    fetch("https://cataas.com/cat?type=square&json=true")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        return setBadges((images) => [...images, data.url]);
      });
  }, [completedTodoCount]);

  return (
    <>
      <section className="todo-list">
        <div className="todo-list-header">
          <h1 className="title">My Todos</h1>
          <button className="__reset-button" onClick={resetAll}>
            Reset
          </button>
        </div>
        <form onSubmit={handleSubmit} className="todo-list-form">
          <input
            type="text"
            onChange={handleChange}
            placeholder="Add your task here..."
            value={newTodo}
            className="__todo-input"
          />
          <button type="submit" className="__todo-submit-btn">
            <AddCircleIcon />
          </button>
        </form>
      </section>
      <section>
        <BadgeList badges={badges} />
      </section>
      {mappedTodoCards}
    </>
  );
};

export default TodoList;
