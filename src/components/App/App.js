import React, { useState } from "react";
import "./App.scss";
import MainContent from "./mainContent/MainContent";
import LeftMenu from './leftMenu/LeftMenu';
import Medias from './Medias/Medias'

function App() {
  const [data] = useState([{
    name: 'LinkedIn',
    logo: 'LinkedInLogo',
    url: 'aderss',
    color: 'violet'
  },{
    name: 'GitHub',
    logo: 'GithubLogo',
    url: 'adress',
    color: 'orange'
  }])



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
      <ul className='medias_ul'>
      {data.map((el,ind)=> <li key={ind} className='medias_li'><Medias el={el}/></li>)}
        </ul>
    </div>)
}

export default App;
