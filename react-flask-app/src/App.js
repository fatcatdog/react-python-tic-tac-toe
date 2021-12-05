import logo from './logo.svg';
import './App.css';
import Game from './components/Game';

import React, { useState, useEffect } from 'react';

function App() {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    fetch('/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">

        <h1>Tic Tac Toe!</h1>

        <p>The current time is {currentTime}.</p>
        <Game />

      </header>
    </div>
  );
}

export default App;
