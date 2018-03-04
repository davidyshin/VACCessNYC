import React, { Component } from 'react';
import './App.css';
import Map from './components/Map.jsx'
import Home from './components/Home.jsx'
import { Route, Link, Switch, Redirect } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1> Welcome to<span className="App-title" > VACCess NYC </span></h1>
        </header>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </div>
    );
  }
}

export default App;
