import React, { useState } from "react";
import "./ToDo.scss";
import Task from "./Task";
import uuid from "react-uuid";
import ToDoAdd from "./ToDoAdd";
import { useEffect } from "react";
import firebase from "../../firebase";

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
// {
//   id: `123456`,
//   edit: true,
//   title: "ToDoList",
//   date: "2020-06-08",
//   time: "18:20",
//   description:
//     " fetch/post jsonserver ,aktualnosc tasku -> done/fail + paginacja zamiast ograniczenia do 12 ;) ",
//   color: "f7918a",
//   rotate: "-10",
// },

export default function ToDo() {
  // const [dontTaskList, setDoneTaskList]=useState([]);
  // const [failTaskList,setFailTaskList]=useState([]);
  const [taskList, setTaskList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState([])
  // const [toMap, setToMap]=useState(taskList)
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
    if(taskList.length===pages.length*12){
      setCurrentPage(pages.length+1)
    }else{
    setCurrentPage(pages.length)}
      firebase
      .firestore()
      .collection("toDo")
      .add({ ...task, edit: true });
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
    console.log(taskList);
    setTaskList((prev) =>
      prev.map((el) => {
        if (el.id !== oneTask.id) return el;
        return { ...oneTask, edit: onOff };
      })
    );
    firebase
      .firestore()
      .collection("toDo")
      .get()
      .then((toDos) => {
        toDos.docs.forEach((elem) => {
          if (elem.data().id === oneTask.id) {
            firebase
              .firestore()
              .collection("toDo")
              .doc(elem.id)
              .update({ ...oneTask, edit: onOff });
          }
        });
      });

  };

  useEffect(() => {
    const unsub = firebase
      .firestore()
      .collection("toDo")
      .orderBy("date", "asc")
      .get()
      .then((toDos) => {
        const loadedToDos = toDos.docs.map((toDo) => toDo.data());
        setTaskList(loadedToDos);
      });
    return () => unsub;
  }, []);

  const handleDeleteFromList = (oneTask) => {
    setTaskList((prev) =>
      prev.filter((el) => {
        return el.id !== oneTask.id;
      })
    );
    firebase
      .firestore()
      .collection("toDo")
      .get()
      .then((toDos) => {
        toDos.docs.forEach((elem) => {
          if (elem.data().id === oneTask.id) {
            firebase
              .firestore()
              .collection("toDo")
              .doc(elem.id)
              .delete()
          }
        });
      });
      if((taskList.length===(currentPage-1)*12+1) && currentPage>1){
        setCurrentPage(prev=>prev-1)
      }
  };

  useEffect(() => {
    const numberOfPages = Math.ceil(taskList.length/12);
    const arr=[];
    for(let i=1; i<numberOfPages+1; i++){
      arr.push(i)
    }
    setPages(arr)
  }, [taskList])



  return (
    <div className="toDoMain">
      <div className="toDoCards">
        {taskList.slice((currentPage-1)*12,currentPage*12).map((el, ind) => (
          <Task
            key={ind}
            el={el}
            ind={ind+(currentPage-1)*12}
            handleTaskSubmit={handleTaskSubmit}
            handleDeleteFromList={handleDeleteFromList}
          />
        ))}
        {taskList.length>12 ?
        <ul className='toDoPages'>
          {pages.map((el,ind) => <li key={ind} name={el} onClick={() =>setCurrentPage(el)}>{el}</li> )}
        </ul> : null}
      </div>
      <div className="toDoForm">
                  <ToDoAdd handleAddTask={handleAddTask} />
      </div>
    </div>
  );
}
