import React, { useState, useEffect } from "react";
import uuid from "react-uuid";
import CounterWatch from "./CounterWatch";
import Backs from './Backs';
import "./Memory.scss";



//funkcja do mieszania tablicy
const shuffleArray = (array) => array.sort(() => 0.5 - Math.random());
const generateTable = (pairs, name = "animals") => {
  let arr = [];
  let x;
  for (let i = 1; i <= pairs; i++) {
    if(i<10){
    x = `https://source.unsplash.com/10${i}x100/`
    arr.push(x,x);
    }else{
      x = `https://source.unsplash.com/1${i}x100/`
      arr.push(x,x);
    }
}
  const AllPairs = arr.map((el) => ({
    id: uuid(),
    value: el,
    isActive: true,
    canBeActive: false,
  }));

  return shuffleArray(AllPairs);
}



export default function Memory({winW}) {
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
  const [cath, setCath]=useState();
  const [load, setLoad] =useState(0);
  const [shuffle, toggleShuffle]= useState('none');
  const [showBacks, setShowBacks] = useState(false);
  const [backMenuSrc, setBackMenuSrc]=useState(`/assets/images/memocards/back1.jpg`)


//usawienei rzedow i kolumn na 1 razem -> memo na stole
useEffect(() => {
   colsAndRows();
    setTab(generateTable(pairs, cath));
    setTimeout(() => {
      setTab((prev) => prev.map((el) => ({ ...el, isActive: true })));
      setTab((prev) => prev.map((el) => ({ ...el, canBeActive: false })));
    }, 3000);
}, [])

const handleLoad = () => {
    setLoad(prev=>prev+1);

    if(load===(2*pairs)){
      if(shuffle==='shuffling'){toggleShuffle('shuffled')};
      setTab((prev) => prev.map((el) => ({ ...el, isActive: true })));
      setTab((prev) => prev.map((el) => ({ ...el, canBeActive: false })));
      setTimeout(() => {
        toggleShuffle('none')
        setTab((prev) => prev.map((el) => ({ ...el, isActive: false })));
        setTab((prev) => prev.map((el) => ({ ...el, canBeActive: true })));
        setWatch(true);
      }, 3000);
    }
}

  // // na handleClicku wywoluje funkcje ktora generuje mi tablice (funkcja poza komponentem) i zeruje mi liczniki
const handleClick = () => {
     toggleShuffle('shuffling')
    setStarting(true);
    reset();
    colsAndRows();
    setTab(generateTable(pairs, cath));
    setTab((prev) => prev.map((el) => ({ ...el, isActive: false })));
    setTab((prev) => prev.map((el) => ({ ...el, canBeActive: false })));
  };

  const reset = () => {
    setLoad(1);
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

  let cardStyle;
  winW<800 ? cardStyle={
    width: `calc(70vw / ${cols})`,
    height: `calc(55vh / ${rows})`
  }
  : cardStyle={
    width: `calc(40vw / ${cols})`,
    height: `calc(55vh / ${rows})`
  }

  //tworze tablice a tablicami w których są poszczególne rzędy
  const makeRows = (row, col, array) => {
    const newArr = [];
    for (let i = 0; i < row; i++) {
      const oneRow = array.slice(i * col, (i + 1) * col).map((el) => (
        <td key={el.id} onClick={() => onObjectClick(el)} id={el.id} >
          <div style={cardStyle}
          className={`memo_div` +" "+ (el.isActive ? "" : `flipped` )}
          >
          <img onLoad={handleLoad} className="memo" src={el.value}/>
          <div className="memo back" ><img src={backMenuSrc}/></div>
        </div>
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

const handleBackClick = (e) =>{
  setShowBacks(prev=>!prev);
  setBackMenuSrc(e.target.name)
}

  return (
    <div className="memory_main">
    {showBacks ? <Backs handleBackClick={handleBackClick}/> : <div className='backImgDiv'><img className="backImgFirstChoice" src={backMenuSrc} name={backMenuSrc}  onClick={handleBackClick}/><span className='backImgTooltip'>Change image</span></div>}
     <div className="memory_game" >
      {shuffle==='shuffling'? <p className='shuffleInfo'>Wait for shuffle...</p> : (shuffle==='shuffled'? <p className='shuffleInfo'>Try to remember!</p> :null)}
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
      <div>
        <h1>Memory:</h1>
        <label>Pairs:
        <input
          onChange={(e) => setPairs(e.target.value > 0 ? e.target.value : '')}
          type="number"

          value={pairs}
        /></label>
        {pairs !=='' ? (pairs>21 ? <h2 className='cant'>Max 21 pairs :(</h2> : <button className="btn" onClick={handleClick}>
          Start
        </button>): <h2 className='cant'>Choose some pairs :(</h2>}
        <h2> {next ? "Click 'start' to play" : <br></br>}</h2>
        </div>
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
