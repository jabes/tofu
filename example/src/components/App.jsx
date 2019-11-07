import React, { Component } from 'react';
import Header from '~/components/Header';
import TofuAnimation from '~/components/TofuAnimation';
import TofuAssertType from '~/components/TofuAssertType';
import TofuComputedStyle from '~/components/TofuComputedStyle';

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
        <TofuAssertType />
        <TofuComputedStyle />
      </div>
    );
  }

}

export default App;
