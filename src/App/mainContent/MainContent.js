import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Header from "./header/Header";
import Start from './Start/Start';
import About from './about/About';
import Memory from './Memory/Memory';
import ToDo from './ToDo/ToDo';

export default function MainContent({mediasData, winW}) {
  return (
    <>
      <HashRouter>
      <Header winW={winW}/>
        <Switch>
          <Route exact path="/" component={ToDo} />
          <Route path="/weather" component={Start} />
          <Route path="/memory" render={() =><Memory winW={winW}/>} />
          <Route path="/exchange" component={Start} />
          <Route path="/about" render={() =><About mediasData={mediasData}/>} />
        </Switch>
      </HashRouter>

    </>
  );
}
