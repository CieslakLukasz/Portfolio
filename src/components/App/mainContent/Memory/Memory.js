import React, { useState, useEffect } from "react";
import uuid from "react-uuid";
import CounterWatch from "./CounterWatch";
import "./Memory.scss";



//funkcja do mieszania tablicy
const shuffleArray = (array) => array.sort(() => 0.5 - Math.random());
const generateTable = (pairs) => {
  let arr = [];
  for (let i = 1; i <= pairs; i++) {
    arr.push(i);
    arr.push(i);
  }
  const AllPairs = arr.map((el) => ({
    id: uuid(),
    value: el,
    isActive: true,
    canBeActive: false,
  }));

  return shuffleArray(AllPairs);
}


export default function Memory() {
  const [pairs, setPairs] = useState(8);
  const [tab, setTab] = useState([]);
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);
  const [firstChoice, setFirstChoice] = useState(null);
  const [secoundChoice, setSecoundChoice] = useState(null);
  const [succesCounter, setSuccesCounter] = useState(0);
  const [counter, setCounter] = useState(0);
  const [watch, setWatch] = useState(false);
  const [next, setNext] = useState(false);
  const [starting, setStarting] = useState(false);
  const [winW, setWinW] = useState(window.innerWidth)


  useEffect(() => {
    const handleResize = () => {
      setWinW(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  })

useEffect(() => {
   colsAndRows();
    setTab(generateTable(pairs));
    setTimeout(() => {
      setTab((prev) => prev.map((el) => ({ ...el, isActive: true })));
      setTab((prev) => prev.map((el) => ({ ...el, canBeActive: false })));
    }, 3000);
}, [])

  // // na handleClicku wywoluje funkcje ktora generuje mi tablice (funkcja poza komponentem) i zeruje mi liczniki
const handleClick = () => {
    setStarting(true);
    reset();
    colsAndRows();
    setTab(generateTable(pairs));
    setTimeout(() => {
      setTab((prev) => prev.map((el) => ({ ...el, isActive: false })));
      setTab((prev) => prev.map((el) => ({ ...el, canBeActive: true })));
      setWatch(true);
    }, 3000);
  };

  const reset = () => {
    setNext(false);
    setCounter(0);
    setSuccesCounter(0);
    setWatch(false);
    setFirstChoice(null);
    setSecoundChoice(null);
  };
  // usatawiam kolumny i rzedy
  const colsAndRows = () => {
    setCols(Math.ceil(Math.sqrt(2 * pairs)));
    setRows(Math.ceil((2 * pairs) / Math.ceil(Math.sqrt(2 * pairs))));
  };

  //tworze tablice a tablicami w których są poszczególne rzędy
  const makeRows = (row, col, array) => {
    const newArr = [];
    for (let i = 0; i < row; i++) {
      const oneRow = array.slice(i * col, (i + 1) * col).map((el) => (
        <td key={el.id} onClick={() => onObjectClick(el)} id={el.id} >
          <div style={{
            width: `calc(40vw / ${col})`,
            height: `calc(55vh / ${row})`
          }}
          className={el.isActive ? `memo${el.value} memo` : 'back memo'}
          ></div>
        </td>
      ));
      newArr.push(oneRow);
    }
    return newArr;
  };
  //gdy naciskamy pojedynczy element -> srawdzam czy moze byc aktywowany?
  // jesli moze => ustawam element jest aktywny, element nie moze byc aktywowany, i 1 lub 2gi wybor jako element
  const onObjectClick = (el) => {
    if(!starting){setStarting(true)};
    if (!secoundChoice) {
      if (el.canBeActive) {
        objectIsActive(el.id, true);
        objCanBeActive(el.id, false);
        !firstChoice ? setFirstChoice(el) : setSecoundChoice(el);
      }
    }
  };
  //zmiana objectIsActive - mapuje po calej tablicy zmieniam isActive w elemencie o podanym w funkcji ID
  const objectIsActive = (objectId, isActive) => {
    setTab((prev) =>
      prev.map((el) =>
        el.id === objectId ? { ...el, isActive: isActive } : el
      )
    );
  };

  // zmiana objCanBeActive - mapuje jak wyzej tylko zmianiam parametr canBeActive
  function objCanBeActive(objectID, canBeActive) {
    setTab((prev) =>
      prev.map((el) => {
        if (el.id !== objectID) return el;
        return { ...el, canBeActive: canBeActive };
      })
    );
  }
  //jak wybrane zostana juz 2 elementy (zmienia sie stan secoundChoice)
  //sprawdzam czy val 1 i val 2 sa identyczne -> jak tak to suces jak nei to fail
  useEffect(() => {
    if (secoundChoice) {
      firstChoice.value === secoundChoice.value ? succes() : fail();
    }
  }, [secoundChoice]);
  //succes -> elementy sa aktywne i nie do aktywowania wiec resetuje stan 1 i 2
  // fail -> zmiani oba elementy na nieaktywne i na nadajace sie aktywowac z opoznieniem 1s i resetuje stan  1 i 2
  const succes = () => {
    resetChoices();
    setCounter((prev) => prev + 1);
    setSuccesCounter((prev) => prev + 1);
  };

  function resetChoices() {
    setFirstChoice(null);
    setSecoundChoice(null);
  }

  const turnBack = () => {
    setTimeout(() => {
      setTab((prev) => prev.map((el) => ({ ...el, isActive: false })));
      setTab((prev) => prev.map((el) => ({ ...el, canBeActive: false })));
      setNext(true);
    }, 1500);
  };

  const fail = () => {
    setCounter((prev) => prev + 1);
    setTimeout(() => {
      objectIsActive(firstChoice.id, false);
      objCanBeActive(firstChoice.id, true);
    }, 1000);
    setTimeout(() => {
      objectIsActive(secoundChoice.id, false);
      objCanBeActive(secoundChoice.id, true);
      resetChoices();
    }, 1300);
  };



  let rotate = 105 - winW/60;


const startTable={
  transform:` rotateX(${rotate}deg) scale(0.4)`,
  bottom:`calc(8.6vw - 29vh - ${rows-1}px)`
}
const stopTable={
  transform: `rotateX(0deg)`,
  transform:`scale(1)`,
  bottom:`calc(100% - 58vh - ${2*rows-2}px)`,
}

  return (
    <div className="memory_main">
      <div className="memory_game" >
        <table style={starting? stopTable : startTable}>
          {makeRows(rows, cols, tab).map((el, ind) => (
            <tr
              key={ind}
            >
              {el}
            </tr>
          ))}
        </table>
      </div>
      <div className="memory_score" >
        <h1>Memory:</h1>
        <label>Ilość par:
        <input
          onChange={(e) => setPairs(e.target.value > 0 ? e.target.value : 0)}
          type="number"
      
          value={pairs}
        /></label>
        {pairs>16 ? <h2 className='cant'>Można max 16 par :(</h2> : <button className="btn" onClick={handleClick}>
          Start
        </button>}
        <h2> {next ? "Aby zagrać kliknij start" : <br></br>}</h2>
        <CounterWatch
          watch={watch}
          counter={counter}
          succesCounter={succesCounter}
          pairs={pairs}
          turnBack={turnBack}
        />
      </div>
    </div>
  );
}
