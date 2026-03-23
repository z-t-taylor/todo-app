import "./TodoCard.css";

const TodoCard = ({ todo, handleRemove, toggleComplete }) => {
  return (
    <div>
      <input type="checkbox" onChange={() => toggleComplete(todo.id)} />
      <p className={todo.completed ? "completed" : ""}>{todo.todo}</p>
      <button onClick={() => handleRemove(todo.id)}>Delete</button>
    </div>
  );
};

export default TodoCard;
