import React, { useState, useEffect } from "react";
import "./App.scss";
import MainContent from "./mainContent/MainContent";
import LeftMenu from './LeftMenu/LeftMenu';
import Medias from './Medias/Medias'
import Clock from './LeftMenu/Clock/Clock';




function App() {
  const [winW, setWinW] = useState(window.innerWidth);
  const [load, setLoad] = useState(false);
  const [mediasData] = useState([{
    name: 'linkedin',
    url: 'https://www.linkedin.com/in/lukaszcieslak90/',
    color: '#0077b5'
  },{
    name: 'github',
    url: 'https://github.com/CieslakLukasz',
    color: '#24292e'
  }]);

  useEffect(() => {
    const handleResize = () => {
      setWinW(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  })


  // ,{
  //   name: 'pinterest',
  //   url: 'https://pl.pinterest.com/extermis/',
  //   color: '#e60023'
  // }






  return (

    <div className="App" style={{backgroundImage: 'url("/assets/images/background/desc1-min.jpg")'}}>
      <div className="wrapper">
        <div className="item1">
          <MainContent mediasData={mediasData} winW={winW}/>
        </div>
        <div className="item2">
        <LeftMenu />
        </div>
      </div>
            <div className='media_div'>
      {mediasData.map((el=> <Medias el={el} winW={winW}/>))}
        </div>
        <Clock />
    </div>)
}

export default App;
