import React from 'react';
import './App.css';

import Map from './components/Map';
import News from './components/News';
import Stats from './components/Stats';


function App() {
  return (
    <div className="App">
      <div class='main-container'>
        <p id='main-title'>COVID-19 Global Spread</p>
        <div class="central-content-container">
          <Stats />
          <Map />
        </div>
        <News />
      </div>
    </div>
  );
}

export default App;
