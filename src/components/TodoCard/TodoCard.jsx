import "./TodoCard.css";

const TodoCard = ({ todo, handleRemove }) => {
  return (
    <div>
      <p>{todo.todo}</p>
      <button onClick={() => handleRemove(todo.id)}>Delete</button>
    </div>
  );
};

export default TodoCard;
