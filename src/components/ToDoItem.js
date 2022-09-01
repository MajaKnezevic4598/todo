import React from "react";
import "./ToDoItem.scss";
import { FiEdit } from "react-icons/fi";
import { TiDelete } from "react-icons/ti";
import { HiCheck } from "react-icons/hi";

function ToDoItem({ title, id, setToDo, toDo }) {
  const handleChacked = () => {
    setToDo(
      toDo.map((item) => {
        return item.id === id ? { ...item, done: !item.done } : item;
      })
    );
  };

  const { done } = toDo.find((item) => item.id === id);

  return (
    <div className="toDo-conteiner">
      <div className="todo-title">{title}</div>
      <div className="todo-icons">
        <div className="check-box" onClick={handleChacked}>
          {" "}
          {done && <HiCheck className="checked" />}{" "}
        </div>

        <FiEdit className="edit" />

        <TiDelete className="delete" />
      </div>
    </div>
  );
}

export default ToDoItem;
