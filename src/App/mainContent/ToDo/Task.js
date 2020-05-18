import React, { useState } from "react";

export default function Task({ el, ind }) {
  const [active, setActive] = useState(false);

  let styleTask = {
    backgroundColor: el.color,
    transform: `rotate(${el.rotate}deg)`,
  };

  const handleClickTask = () => {
        setActive(prev => !prev)
  }

  return (
      <>
    <div className="oneTask" onClick={handleClickTask} style={styleTask}>
      <div><h2>
        #{ind + 1} <div><span>&#9999;</span><span>&#128465;</span></div> </h2>
        <h1>{el.title}</h1></div>
      <p>{el.description}</p>
      <h2>
        {el.date} {el.time}
      </h2>
    </div>
    <div  className={active ? "oneTask bigTask transition" : "oneTask bigTask"} onClick={handleClickTask} style={{backgroundColor: el.color}} >
    <div><h2>
        #{ind + 1} <div><span>&#9999;</span><span>&#128465;</span></div> </h2>
        <h1>{el.title}</h1></div>
    <p>{el.description}</p>
    <h2>
      {el.date} {el.time} <span>&#10004;</span> <span>&#10060;</span>
    </h2>
  </div>
  </>
  );
}
