import React, { Component } from 'react';
import './App.css';
import Map from './components/Map.jsx'
import Home from './components/Home.jsx'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1> Welcome to<span className="App-title" > VACCess NYC </span></h1>
        </header>
        <Home />
      </div>
    );
  }
}

export default App;
