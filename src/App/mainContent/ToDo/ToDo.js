import React, { useState } from "react";
import "./ToDo.scss";
import Task from "./Task";
import ToDoForm from './ToDoForm';

export default function ToDo() {
    const [err, setErr]=useState('')
  const [taskList, setTaskList] = useState([
    {
      title: "Kostka Rubika",
      date: "24.06.2020",
      time: "18:20",
      description: "Stworzyć kostkę rubika css",
      color: "lightgreen",
      rotate: "-5",
    },
    {
      title: "ToDoList",
      date: "24.06.2020",
      time: "18:20",
      description:
        "guzik delete  + aktualnosc tasku -> done/fail + stylowanie inputow + pinezka + shadow ? id? ",
      color: "orange",
      rotate: "-10",
    },
  ]);
  const [task, setTask] = useState({
    title: "",
    date: "",
    time: "",
    description: "",
    color: "yellow",
    rotate: Math.floor(Math.random() * 21) - 10,
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    if(task.title.length>13) {
        setErr('Za długi tytuł (max 13 znaków)');
        return}
    setTaskList((prev) => [...prev, task]);
    setTask({
      title: "",
      date: "",
      time: "",
      description: "",
      color: "yellow",
      rotate: Math.floor(Math.random() * 21) - 10,
    });
  };

  return (
    <div className="toDoMain">
      <div className="toDoCards">
        {taskList.map((el, ind) => (
          <Task el={el} ind={ind} />
        ))}
      </div>
      <div className="toDoForm">
      {taskList.length<12 ? (<ToDoForm task={task} err={err} handleChange={handleChange} handleTaskSubmit={handleTaskSubmit}/>)
      : <h1>Ogarnij się, już masz dośc zadań!</h1>}
    </div>
    </div>
  );
}
