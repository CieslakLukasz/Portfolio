import React, { useState } from "react";
import "./ToDo.scss";
import Task from "./Task";
import uuid from "react-uuid";
import ToDoAdd from "./ToDoAdd";
import { useEffect } from "react";
import Firebase from "../../firebase";

// {
//   id: `12345`,
//   edit: true,
//   title: "Kostka Rubika",
//   date: "2020-06-05",
//   time: "18:20",
//   description: "Kostak rubika pod mobile (strzalki / eventy do podpiecia), logika -> guziki shuffle i solve",
//   color: "B8DEB8",
//   rotate: "-5",
// },
const compare = (a,b) =>{
  const colorA = a.color;
  const colorB = b.color;
  let comparison = 0;
  if(colorA>colorB){
    comparison=1;
  }else if(colorA<colorB){
    comparison=-1;
  }
  return -comparison;
}


export default function ToDo() {
  const [taskList, setTaskList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState([]);
  const [toMap, setToMap] = useState("toDo");
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
    if (taskList.length === pages.length * 12) {
      setCurrentPage(pages.length + 1);
    } else {
      setCurrentPage(pages.length);
    }
    Firebase.add(task, true, "toDo");
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
    if(onOff){
    setTaskList((prev) =>
      prev.map((el) => {
        if (el.id !== oneTask.id) return el;
        return { ...oneTask, edit: onOff };
      })
    )}else{
      setTaskList((prev) =>
      prev.map((el) => {
        if (el.id !== oneTask.id) return el;
        return { ...oneTask, edit: onOff };
      }).sort(compare));
    }
    Firebase.update(oneTask, onOff, toMap);

  };

  useEffect(() => {
    const fullDate = new Date();
    const date = fullDate.toLocaleDateString();
    let time = fullDate.toLocaleTimeString();

    const unsub = Firebase.db
      .collection(toMap)
      .orderBy("color", "desc")
      .get()
      .then((toDos) => {
        const loadedToDos = toDos.docs.map((toDo) => toDo.data());
        let toShow = [];
        if(toMap==='toDo'){
          loadedToDos.forEach(el => {
            if(date>= new Date(el.date).toLocaleDateString() && time>el.time){
              Firebase.delete(el, toMap);
              Firebase.add(el, false, 'failed')
            }else{
              toShow.push(el)
            }
          });
        }else{
          toShow = loadedToDos;
        }
        setTaskList(toShow);
        setCurrentPage(1);
      });
    return () => unsub;
  }, [toMap]);

  const handleAddToDoneList = (oneTask) => {
    setTaskList((prev) =>
      prev.filter((el) => {
        return el.id !== oneTask.id;
      })
    );
    Firebase.delete(oneTask, toMap);
    Firebase.add(oneTask, false, "done");
  };
  
  const handleDeleteFromList = (oneTask) => {
    setTaskList((prev) =>
      prev.filter((el) => {
        return el.id !== oneTask.id;
      })
    );
    Firebase.delete(oneTask, `${toMap}`);
    if (taskList.length === (currentPage - 1) * 12 + 1 && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const numberOfPages = Math.ceil(taskList.length / 12);
    const arr = [];
    for (let i = 1; i < numberOfPages + 1; i++) {
      arr.push(i);
    }
    setPages(arr);
  }, [taskList]);

  const handleListChange = (e) => {
    setToMap(e.target.name);
  };

  return (
    <div className="toDoMain">
      <div className="toDoCards">
        {taskList
          .slice((currentPage - 1) * 12, currentPage * 12)
          .map((el, ind) => (
            <Task
              key={ind}
              el={el}
              ind={ind + (currentPage - 1) * 12}
              handleTaskSubmit={handleTaskSubmit}
              handleDeleteFromList={handleDeleteFromList}
              handleAddToDoneList={handleAddToDoneList}
              toMap={toMap}
            />
          ))}
        {taskList.length > 12 ? (
          <ul className="toDoPages">
            {pages.map((el, ind) => (
              <li key={ind} name={el} onClick={() => setCurrentPage(el)}>
                {el}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      <div className="toDoForm">
      {toMap!=='toDo'? <p>Go to Current to add new task</p> :
        <ToDoAdd handleAddTask={handleAddTask} />}
        <p>{toMap==='toDo'? 'current' : toMap}</p>
        <ul className="toDoTab">
          <li>
            <button
              onClick={handleListChange}
              className="addTaskButton"
              name="toDo"
            >
              Current
            </button>
          </li>
          <li>
            <button
              onClick={handleListChange}
              className="addTaskButton"
              name="done"
            >
              Done
            </button>
          </li>
          <li>
            <button
              onClick={handleListChange}
              className="addTaskButton"
              name="failed"
            >
              Failed
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
