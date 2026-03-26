import "./TodoCard.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const TodoCard = ({ todo, handleRemove, toggleComplete }) => {
  return (
    <div className="todo-card">
      <div className="__todo-card-inputs">
        <input type="checkbox" onChange={() => toggleComplete(todo.id)} />
        <p className={todo.completed ? "__completed" : "__not-completed"}>
          {todo.task}
        </p>
      </div>
      <button
        className="__todo-delete-btn"
        onClick={() => handleRemove(todo.id)}
      >
        <DeleteOutlineIcon />
      </button>
    </div>
  );
};

export default TodoCard;
