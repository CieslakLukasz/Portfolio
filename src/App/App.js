import React, { useState, useEffect } from "react";
import "./App.scss";
import uuid from "react-uuid";

import MainContent from "./mainContent/MainContent";
import LeftMenu from './LeftMenu/LeftMenu';
import Medias from './Medias/Medias'





function App() {
  const [mediasData] = useState([{
    name: 'linkedin',
    url: 'https://www.linkedin.com/in/lukaszcieslak90/',
    color: '#0077b5'
  },{
    name: 'github',
    url: 'https://github.com/CieslakLukasz',
    color: '#24292e'
  },{
    name: 'pinterest',
    url: 'https://pl.pinterest.com/extermis/',
    color: '#e60023'
  }]);








  return (
    <div className="App">
      <div className="wrapper">
        <div className="item1">
          <MainContent />
        </div>
        <div className="item2">
        <LeftMenu />
        </div>
      </div>
            <div className='media_div'>
      {mediasData.map((el=> <Medias el={el} />))}
        </div>

    </div>)
}

export default App;
