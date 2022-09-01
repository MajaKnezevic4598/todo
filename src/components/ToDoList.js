import React, { useState } from "react";

import ToDoItem from "./ToDoItem";
import "./ToDoList.scss";

function ToDoList() {
  const [toDo, setToDo] = useState([]);

  const [inputValue, setInputValue] = useState("");
  const addToDo = (e) => {
    e.preventDefault();
    if (inputValue) {
      if (toDo.length === 0) {
        let newTask = {
          title: inputValue,
          done: false,
          id: 1,
        };
        setToDo((prev) => {
          return [...prev, newTask];
        });
        setInputValue("");
      }
      if (toDo.length !== 0) {
        let newTask = {
          title: inputValue,
          done: false,
          id: toDo.length + 1,
        };
        setToDo((prev) => {
          return [...prev, newTask];
        });
        setInputValue("");
      }
    }
  };

  return (
    <div className="todo-conteiner">
      <section className="todo-conteiner__section">
        <form
          className="form"
          onSubmit={(e) => {
            addToDo(e);
          }}
        >
          <input
            type="text"
            placeholder="enter your task"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
          <button className="btn-add">Add</button>
        </form>
        <div className="items-list">
          {toDo && toDo.length
            ? toDo.map((item) => {
                return (
                  <ToDoItem
                    title={item.title}
                    key={item.id}
                    id={item.id}
                    setToDo={setToDo}
                    toDo={toDo}
                    task={item}
                  />
                );
              })
            : "no todos"}
        </div>
      </section>
    </div>
  );
}

export default ToDoList;
