import React from 'react';
import PrismCode from '~/components/PrismCode';
import style from './index.styl';
import codeRaw from './code.raw.js';

class TofuComputedStyle extends React.Component {

  componentDidMount() {
    console.log(tofu);
    console.log(_tofu);
    eval(codeRaw);
  }

  render() {
    return (
      <section className={style.section}>
        <h2>Computed Styles</h2>
        <div id="TofuComputedStyle" className={style.container}></div>
        <p>The code:</p>
        <PrismCode code={codeRaw} language="js" plugins={[]} />
      </section>
    );
  }

}

export default TofuComputedStyle;