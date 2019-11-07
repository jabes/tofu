import React, { Component } from 'react';
import Header from '~/components/Header';
import TofuAnimation from '~/components/TofuAnimation';
import TofuUnitTest from '~/components/TofuUnitTest';

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
        <TofuUnitTest />
      </div>
    );
  }

}

export default App;
