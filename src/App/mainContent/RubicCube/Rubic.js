import React from 'react'
import "./Rubc.scss";
import Box from './Box';
import { useState } from 'react';
import { useEffect } from 'react';


export default function Rubic() {
const [topSide, setTopSide] = useState(['red' , 'red' ,'red' ,'red' ,'red' ,'red' ,'red' ,'red' ,'red']);
const [bottomSide, setBottomSide] = useState(['orange' , 'orange' ,'orange' ,'orange' ,'orange' ,'orange' ,'orange' ,'orange' ,'orange']);
const [leftSide, setLeftSide] = useState(['blue' , 'blue' ,'blue' ,'blue' ,'blue' ,'blue' ,'blue' ,'blue' ,'blue']);
const [rightSide, setRightSide] = useState(['green' , 'green' ,'green' ,'green' ,'green' ,'green' ,'green' ,'green' ,'green']);
const [frontSide, setFrontSide] = useState(['yellow' ,'yellow' ,'yellow' ,'yellow' ,'yellow' ,'yellow' ,'yellow' ,'yellow' ,'yellow']);
const [backSide, setBackSide] = useState(['white' , 'white' ,'white' ,'white' ,'white' ,'white' ,'white' ,'white' ,'white']);
const [animation, setAnimation] = useState(false);
const [rubicStyles, setRubicStyles] = useState({
  X: `-10`,
  Y: `30`
})

const handleAnimation = () => {
  setAnimation(prev=>!prev)
}
let intervalId;

useEffect(() => {
  if(animation){
    intervalId = setInterval(()=>{
    setRubicStyles(prev=>({...prev, X: `${prev.X -1}`, Y: `${prev.Y -1}`}))
  },100)}
  return () => {
    clearInterval(intervalId)
  }
}, [animation])

  return (
    <div className="rubic-container" >
    <button onClick={handleAnimation} className='addTaskButton' style={{width:'25%'}}>Click me!</button>
    <div className='rubic-cube'  style={{transform: `rotateX(${rubicStyles.X}deg) rotateY(${rubicStyles.Y}deg)`}}>
    <div className='face top'>
      {topSide.map(el=> <div style={{backgroundColor:el}}></div>)}
    </div>
    <div className='face front'>
    {frontSide.map(el=> <div style={{backgroundColor:el}}></div>)}
    </div>
    <div className='face back'>
    {backSide.map(el=> <div style={{backgroundColor:el}}></div>)}
    </div>
    <div className='face left'>
    {leftSide.map(el=> <div style={{backgroundColor:el}}></div>)}
    </div>
    <div className='face right'>
    {rightSide.map(el=> <div style={{backgroundColor:el}}></div>)}
    </div>
    <div className='face bottom'>
    {bottomSide.map(el=> <div style={{backgroundColor:el}}></div>)}
    </div>
</div>
  </div>
  );
}

