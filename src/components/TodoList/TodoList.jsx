import { useState } from "react";
import "./TodoList.css";

import TodoCard from "../TodoCard/TodoCard";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setTodos([...todos, { id: Date.now(), todo: newTodo }]);
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

  const mappedTodoCards = todos.map((todo, i) => {
    return <TodoCard key={i} todo={todo} handleRemove={handleRemove} />;
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
