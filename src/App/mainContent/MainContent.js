import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Header from "./Header/Header";
import Start from './Start/Start';
import About from './About/About';
import Memory from './Memory/Memory';
import ToDo from './ToDo/ToDo';
import Rubic from './RubicCube/Rubic';


export default function MainContent({mediasData, winW}) {
  return (
    <>
      <HashRouter>
      <Header winW={winW}/>
        <Switch>
          <Route exact path="/" component={ToDo} />
          <Route path="/weather" component={Start} />
          <Route path="/memory" render={() =><Memory winW={winW}/>} />
          <Route path="/rubiccube" component={Rubic} />
          <Route path="/about" render={() =><About mediasData={mediasData}/>} />
        </Switch>
      </HashRouter>

    </>
  );
}
