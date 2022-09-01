import React, { useState, useEffect } from "react";
import "./ToDoItem.scss";
import { FiEdit } from "react-icons/fi";
import { TiDelete } from "react-icons/ti";
import { HiCheck } from "react-icons/hi";
import Modal from "react-modal";
import { FiX } from "react-icons/fi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

Modal.setAppElement("#root");
function ToDoItem({ task, id, setToDo, toDo }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [editState, setEditState] = useState({
    priority: "",
    description: "",
    title: task.title,
    selectedDate: null,
  });

  useEffect(() => {
    console.log(editState);
  }, [editState]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("helloo");
    setToDo(
      toDo.map((item) => {
        return item.id === id
          ? {
              ...item,
              title: editState.title,
              priority: editState.priority,
              description: editState.description,
              selectedDate: editState.selectedDate,
            }
          : item;
      })
    );
  };

  return (
    <div className="toDo-conteiner">
      <div className="todo-title">{task.title}</div>
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
        <p>
          Edit task{" "}
          <span
            style={{
              fontWeight: "bold",
            }}
          >
            {task.title}
          </span>
        </p>
        <form className="edit-task" onSubmit={handleSubmit}>
          <div className="edit-task__title">
            <p>Title:</p>
            <input
              type="text"
              placeholder={task.title}
              maxLength="100"
              value={editState.title}
              onChange={(e) =>
                setEditState({ ...editState, title: e.target.value })
              }
            />
          </div>
          <div className="edit-task__date">
            <p>Due date:</p>
            <DatePicker
              selected={editState.selectedDate}
              onChange={(date) =>
                setEditState({ ...editState, selectedDate: date })
              }
              dateFormat="dd/MM/yyyy"
              minDate={new Date()}
              value={
                task.selectedDate ? task.selectedDate : editState.selectedDate
              }
            />
          </div>
          <div className="edit-task__description">
            <p>Description:</p>
            <textarea
              maxLength="100"
              placeholder={
                task.description ? task.description : "...description"
              }
              onChange={(e) => {
                setEditState({ ...editState, description: e.target.value });
              }}
            ></textarea>
          </div>
          <div className="edit-task__select">
            <p>Priority:</p>
            <select
              onChange={(e) => {
                setEditState({ ...editState, priority: e.target.value });
              }}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="heigh">Heigh</option>
            </select>
          </div>
          <button className="edit-btn">edit</button>
        </form>

        <div
          className="close-modal"
          onClick={() => {
            setModalIsOpen(false);
          }}
        >
          <FiX />
        </div>
      </Modal>
    </div>
  );
}

export default ToDoItem;
