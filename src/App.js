import React from 'react';
import './App.css';
import ReactGA from 'react-ga';

import Map from './components/Map';
import News from './components/News';
import Stats from './components/Stats';

ReactGA.initialize('UA-164261436-1')
ReactGA.pageview(window.location.pathname + window.location.search);

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
        <div class='main-container'>
          <div className='top-container'>
          <p id='main-title'>COVID-19 Global Spread</p>
          <Stats />

          </div>
            <div class="central-content-container">
              <Map />
            </div>
            {/* <News /> */}
          </div>
  
      </div>
    )
  }
}

export default App;
