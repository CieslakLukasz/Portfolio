import React, { useState, useEffect } from 'react';
import "./ToDo.scss";


export default function ToDoForm({el, ind,  handleTaskSubmit, handleDeleteFromList, handleAddToDoneList, toMap}) {
  const [oneTask, setOneTask] = useState('');
  const [err, setErr]=useState('');


  const handleChangeOne = (e) => {
          setOneTask({...oneTask, [e.target.name]:e.target.value})
  }


  useEffect(() => {
    setOneTask(el)
  }, [el])

  useEffect(() => {
    if(el.edit===true){
    handleTaskSubmit(oneTask, true)}

  }, [oneTask.color])

  const handleTaskSubmitOne = (e) => {
    e.preventDefault();
    if (oneTask.title.length > 13) {
      setErr("Za długi tytuł (max 13 znaków)");
      return;
    }
    setErr("");
    handleTaskSubmit(oneTask, false);
  }

  const handleDelete = () => {
    handleDeleteFromList(oneTask)
  }
  const handleDone = () => {
    handleAddToDoneList(oneTask)
  }


    return (
        <form onSubmit={handleTaskSubmitOne}>
        <div className='taskHeader'><h2>
        #{ind + 1} {err ? <p>{err}</p> : null} <div>{toMap!=='done'? <span onClick={handleDone}>&#10003;</span> : null}<span onClick={handleDelete}>&#128465;</span></div> </h2>
        <h1><input
        type="text"
        name="title"
        value={oneTask.title}
        placeholder="Task name"
        onChange={handleChangeOne}
      ></input></h1></div>
      <textarea
        name="description"
        value={oneTask.description}
        placeholder="Task description"
        onChange={handleChangeOne}
      ></textarea>
      <div className='dateAndTime'>
          <label>
            Date:{" "}
            <input
              type="date"
              name="date"
              value={oneTask.date}
              onChange={handleChangeOne}
            ></input>
          </label>
          <label>
            Time:{" "}
            <input
              type="time"
              name="time"
              value={oneTask.time}
              onChange={handleChangeOne}
            ></input>
          </label>
          </div>
          <div className='dateAndTime'>
          <label>Priority: &nbsp;
            <select onChange={handleChangeOne} name="color" value={oneTask.color} className={`${oneTask.color}Class`}>
              <option value="F4F48E">Normal</option>
              <option value="B8DEB8">No pressure</option>
              <option value="f7918a">ASAP</option>
            </select></label>
          <input type="submit" value="Save changes" />
          </div>
      </form>
    )
}
