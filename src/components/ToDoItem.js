import React, { useState } from "react";
import "./ToDoItem.scss";
import { FiEdit } from "react-icons/fi";
import { TiDelete } from "react-icons/ti";
import { HiCheck } from "react-icons/hi";
import Modal from "react-modal";
import { FiX } from "react-icons/fi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

Modal.setAppElement("#root");
function ToDoItem({ title, id, setToDo, toDo }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

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
        <p>
          Edit task{" "}
          <span
            style={{
              fontWeight: "bold",
            }}
          >
            {title}
          </span>
        </p>
        <section className="edit-task">
          <div className="edit-task__title">
            <p>Title:</p>
            <input type="text" placeholder={title} maxlength="100" />
          </div>
          <div className="edit-task__date">
            <p>Due date:</p>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="dd/MM/yyyy"
              minDate={new Date()}
            />
          </div>
          <div className="edit-task__description">
            <p>Description:</p>
            <textarea maxlength="100" placeholder="...description"></textarea>
          </div>
          <div className="edit-task__select">
            <p>Priority:</p>
            <select>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="heigh">Heigh</option>
            </select>
          </div>
        </section>

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
