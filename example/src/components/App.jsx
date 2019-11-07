import React, { Component } from 'react';
import Header from '~/components/Header';
import TofuAnimation from '~/components/TofuAnimation';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Header />
        <TofuAnimation />
      </div>
    );
  }

}

export default App;
