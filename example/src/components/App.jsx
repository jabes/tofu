import React, { Component } from 'react';
import Header from '~/components/Header';
import Deprecated from '~/components/Deprecated';
import TofuAnimation from '~/components/TofuAnimation';
import TofuAssertType from '~/components/TofuAssertType';
import TofuComputedStyle from '~/components/TofuComputedStyle';
import TofuDomBuild from '~/components/TofuDomBuild';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    // warning: this is a really stupid solution
    // we need a reference to _tofu in our code
    // so that webpack will include it in our bundle
    // tofu is a really old legacy library that does not support modules
    // once bundled, window.tofu will be available
    console.log(_tofu);
  }

  render() {
    return (
      <div>
        <Header />
        <Deprecated />
        <TofuAnimation />
        <TofuAssertType />
        <TofuComputedStyle />
        <TofuDomBuild />
      </div>
    );
  }

}

export default App;
