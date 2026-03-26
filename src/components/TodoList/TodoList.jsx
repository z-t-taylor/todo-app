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

  useEffect(() => {
    fetch("http://localhost:3000/tasks")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const formatData = data.map((task) => ({
          id: task._id,
          task: task.task,
          completed: task.completed,
        }));
        setTodos(formatData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3000/tasks", {
      method: "POST",
      body: JSON.stringify({ task: newTodo }),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((res) => {
        return res.json();
      })
      .then((newTask) => {
        setTodos([
          ...todos,
          { id: newTask._id, task: newTask.task, completed: newTask.completed },
        ]);
        setNewTodo("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleRemove = (id) => {
    fetch(`http://localhost:3000/tasks/${id}`, { method: "DELETE" })
      .then(() => {
        const removeTodo = todos.filter((todo) => {
          return id !== todo.id;
        });
        setTodos(removeTodo);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toggleComplete = (id) => {
    const completeTodo = todos.map((todo) => {
      return id === todo.id ? { ...todo, completed: !todo.completed } : todo;
    });
    setTodos(completeTodo);

    const checkTodo = todos.find((todo) => todo.id === id);
    if (checkTodo.completed) {
      setBadges((images) => images.splice(-1, 1));
      setCompletedTodoCount((count) => count - 1);
    } else {
      setCompletedTodoCount((count) => count + 1);
    }
  };

  const mappedTodoCards = todos.map((todo) => {
    return (
      <TodoCard
        key={todo.id}
        todo={todo}
        handleRemove={handleRemove}
        toggleComplete={toggleComplete}
      />
    );
  });

  const resetAll = () => {
    fetch("http://localhost:3000/tasks", { method: "DELETE" })
      .then(() => {
        setTodos([]);
        setBadges([]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
