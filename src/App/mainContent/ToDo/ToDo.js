import React, { useState } from "react";
import "./ToDo.scss";
import Task from "./Task";
import uuid from "react-uuid";
import ToDoAdd from "./ToDoAdd";
import { useEffect } from "react";

export default function ToDo() {
  const [taskList, setTaskList] = useState([
    {
      id: `12345`,
      edit: true,
      title: "Kostka Rubika",
      date: "2020-05-19",
      time: "18:20",
      description: "Stworzyć kostkę rubika css",
      color: "B8DEB8",
      rotate: "-5",
    },
    {
      id: `123456`,
      edit: true,
      title: "ToDoList",
      date: "2020-05-24",
      time: "18:20",
      description:
        "guzik delete  + aktualnosc tasku -> done/fail + stylowanie inputow ? ",
      color: "f7918a",
      rotate: "-10",
    },
  ]);
  const [task, setTask] = useState({
    id: uuid(),
    edit: true,
    title: "",
    date: "",
    time: "",
    description: "",
    color: "F4F48E",
    rotate: Math.floor(Math.random() * 21) - 10,
  });

  const handleAddTask = () => {
    console.log("cos sie dzieje");
    setTaskList((prev) => [...prev, task]);
    setTask({
      id: uuid(),
      edit: true,
      title: "",
      date: "",
      time: "",
      description: "",
      color: "F4F48E",
      rotate: Math.floor(Math.random() * 21) - 10,
    });
  };

  const handleTaskSubmit = (oneTask, onOff) => {

    setTaskList((prev) =>
      prev.map((el) => {
        if (el.id !== oneTask.id) return el;
        return { ...oneTask, edit: onOff };
      })
    );
  };
  useEffect(() => {
    setTaskList((prev) => prev.map((el) => ({ ...el, edit: false })));
  }, []);

  return (
    <div className="toDoMain">
      <div className="toDoCards">
        {taskList.map((el, ind) => (
          <Task
            key={ind}
            el={el}
            ind={ind}
            handleTaskSubmit={handleTaskSubmit}
          />
        ))}
      </div>
      <div className="toDoForm">
        {taskList.length < 12 ? (
          <ToDoAdd handleAddTask={handleAddTask} />
        ) : (
          <h1>Ogarnij się, już masz dośc zadań!</h1>
        )}
      </div>
    </div>
  );
}
