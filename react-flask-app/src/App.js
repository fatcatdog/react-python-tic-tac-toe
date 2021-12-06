import logo from './logo.svg';
import './App.css';
import Game from './components/Game';
import Home from './components/Home';

import React, { useState, useEffect } from 'react';


function App() {
  const [currentTime, setCurrentTime] = useState(0);

  // useEffect(() => {
  //   fetch('/time').then(res => res.json()).then(data => {
  //     setCurrentTime(data.time);
  //   });
  // }, []);

  return (
    <div className="App">
    
      <header className="App-header">

        <h1>Tic Tac Toe!</h1>

        <Home />

      </header>
    </div>
  );
}

export default App;
