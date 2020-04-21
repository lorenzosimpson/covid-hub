import React, { useState, useEffect } from 'react';
import './App.css';

import Map from './components/Map';
import News from './components/News';
import Stats from './components/Stats';
import Loader from './components/Loader';
import { render } from '@testing-library/react';




class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false })
    }, 2000);
  }

  render() {
    return (
      <div className="App">
        {/* <Loader loading={this.state.loading} /> */}
        <div class='main-container'>
          <div className='top-container'>
          <p id='main-title'>COVID-19 Global Spread</p>
          <Stats />

          </div>
            <div class="central-content-container">
              <Map />
            </div>
            <News />
          </div>
  
      </div>
    )
  }
}

export default App;
