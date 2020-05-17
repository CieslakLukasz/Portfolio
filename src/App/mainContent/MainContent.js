import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Header from "./header/Header";
import Footer from './footer/Footer';
import Start from './Start/Start'
import About from './about/About'
import Memory from './Memory/Memory'

export default function MainContent({mediasData, winW}) {
  return (
    <>
      <HashRouter>
      <Header winW={winW}/>
        <Switch>
          <Route exact path="/" component={Start} />
          <Route path="/weather" component={Start} />
          <Route path="/memory" component={Memory} />
          <Route path="/exchange" component={Start} />
          <Route path="/about" render={() =><About mediasData={mediasData}/>} />
        </Switch>
      </HashRouter>
      <Footer />
    </>
  );
}
