import React, { useState } from "react";
import "./ToDoItem.scss";
import { FiEdit } from "react-icons/fi";
import { TiDelete } from "react-icons/ti";
import { HiCheck } from "react-icons/hi";
import Modal from "react-modal";

Modal.setAppElement("#root");
function ToDoItem({ title, id, setToDo, toDo }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleChacked = () => {
    setToDo(
      toDo.map((item) => {
        return item.id === id ? { ...item, done: !item.done } : item;
      })
    );
  };

  const { done } = toDo.find((item) => item.id === id);

  const handleDelete = () => {
    const filtered = toDo.filter((item) => item.id !== id);
    setToDo(filtered);
  };

  return (
    <div className="toDo-conteiner">
      <div className="todo-title">{title}</div>
      <div className="todo-icons">
        <div className="check-box" onClick={handleChacked}>
          {" "}
          {done && <HiCheck className="checked" />}{" "}
        </div>

        <FiEdit
          className="edit"
          onClick={() => {
            setModalIsOpen(true);
          }}
        />

        <TiDelete className="delete" onClick={handleDelete} />
      </div>
      <Modal
        className="Modal"
        overlayClassName="Overlay"
        isOpen={modalIsOpen}
        onRequestClose={() => {
          setModalIsOpen(false);
        }}
      >
        <h1>ja sam modal</h1>
        <div
          className="close-modal"
          onClick={() => {
            setModalIsOpen(false);
          }}
        >
          close
        </div>
      </Modal>
    </div>
  );
}

export default ToDoItem;
