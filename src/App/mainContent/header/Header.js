import React from "react";
import "./Header.scss";
import { NavLink  } from "react-router-dom";

let activeStyle = {width:'8vw', padding:'2vw',backgroundColor: 'rgb(164,174 ,183 )', color:'white'}

export default function Header() {
  return (
    <div className="header">
      <nav>
        <ul className='navi_list'>
        <li className='navi_list_el'><NavLink exact to="/"  activeStyle={activeStyle} >Home</NavLink></li>
          <li className='navi_list_el'><NavLink to="/about"  activeStyle={activeStyle}>O mnie</NavLink></li>
          <li className='navi_list_el'><NavLink to="/weather" activeStyle={activeStyle} >Pogoda</NavLink></li>
          <li className='navi_list_el'><NavLink to="/memory"  activeStyle={activeStyle}>Memo</NavLink></li>
          <li className='navi_list_el'><NavLink to="/exchange" activeStyle={activeStyle} >Kantor</NavLink></li>
        </ul>
      </nav>
      <div>logo tu bedzie obrazek ? albo duze zdjecie </div>
    </div>
  );
}


