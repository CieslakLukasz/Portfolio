import React, { useState, useEffect } from 'react';
import "./ToDo.scss";

export default function ToDoForm({el, ind,  handleTaskSubmit}) {
  const [oneTask, setOneTask] = useState(el);
  const [err, setErr]=useState('');


  const handleChangeOne = (e) => {
          setOneTask({...oneTask, [e.target.name]:e.target.value})

  }

  useEffect(() => {
    if(oneTask.edit===true){
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


    return (
        <form onSubmit={handleTaskSubmitOne}>
        <div className='taskHeader'><h2>
        #{ind + 1} {err ? <p>{err}</p> : null} <div><span>&#128465;</span></div> </h2>
        <h1><input 
        type="text"
        name="title"
        value={oneTask.title}
        placeholder="Tytuł zadania"
        onChange={handleChangeOne}
      ></input></h1></div>
      <textarea
        name="description"
        value={oneTask.description}
        placeholder="Twoje zadanie"
        onChange={handleChangeOne}
      ></textarea>
      <div className='dateAndTime'>
          <label>
            Termin:{" "}
            <input
              type="date"
              name="date"
              value={oneTask.date}
              onChange={handleChangeOne}
            ></input>
          </label>
          <label>
            Godzina:{" "}
            <input
              type="time"
              name="time"
              value={oneTask.time}
              onChange={handleChangeOne}
            ></input>
          </label>
          </div>
          <div className='dateAndTime'>
          <label>Priorytet: &nbsp;
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
