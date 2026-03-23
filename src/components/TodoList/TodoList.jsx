import { useState } from "react";
import "./TodoList.css";

import TodoCard from "../TodoCard/TodoCard";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setTodos([...todos, newTodo]);
    setNewTodo("");
  };

  const handleChange = (e) => {
    setNewTodo(e.target.value);
  };

  const mappedTodoCards = todos.map((todo, i) => {
    return <TodoCard key={i} todo={todo} />;
  });

  return (
    <div>
      <h2>My Todo's</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleChange}
          placeholder="Add your task here..."
          value={newTodo}
        />
        <button type="submit">+</button>
      </form>
      {mappedTodoCards}
    </div>
  );
};

export default TodoList;
