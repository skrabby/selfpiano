import React from 'react';
import * as Components from './components';

class App extends React.Component {

  render() {
    return (
      <React.Fragment>
        <Components.Header/>
        <Components.Router/>
        <Components.Footer/>
      </React.Fragment>
    );
  }
}

export default App;
