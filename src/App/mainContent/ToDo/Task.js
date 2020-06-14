import React from "react";
import ToDoForm from './ToDoForm'

export default function Task({ el, ind, handleTaskSubmit, handleDeleteFromList,handleAddToDoneList, toMap}) {


  let styleTask = {
    backgroundColor: `#${el.color}`,
    transform: `rotate(${el.rotate}deg)`,
  };

  const handleClickTaskOne = () => {
      handleTaskSubmit(el, true)
  }
  const handleDelete = (e) => {
    e.stopPropagation();
    handleDeleteFromList(el);
  }
  const handleDone = (e) => {
    e.stopPropagation();
    handleAddToDoneList(el)
  }


  return (
      <>
    <div className="oneTask" onClick={handleClickTaskOne} style={styleTask}>
    <div className='circle'></div>
     <div className='taskHeader'><h2>
        #{ind + 1} <div>{toMap!=='done'? <span onClick={handleDone}>&#10003;</span> : null}<span onClick={handleDelete}>&#128465;</span></div> </h2>
        <h1>{el.title}</h1></div>
      <p>{el.description}</p>
      <h2>
        {el.date} {el.time}
      </h2>
    </div>
    <div  className={el.edit ? "oneTask bigTask transition" : "oneTask bigTask"} style={{backgroundColor: `#${el.color}`}} >
    <ToDoForm el={el} ind={ind} toMap={toMap} handleAddToDoneList={handleAddToDoneList} handleTaskSubmit={handleTaskSubmit} handleDeleteFromList={handleDeleteFromList}/>
  </div>
  </>
  );
}
