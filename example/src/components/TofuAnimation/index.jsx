import React from 'react';
import PrismCode from '~/components/PrismCode';
import style from './index.styl';
import codeRaw from './code.raw.js';

class TofuAnimation extends React.Component {

  componentDidMount() {
    eval(codeRaw);
  }

  render() {
    return (
      <section className={style.section}>
        <h2>Animations</h2>
        <div id="TofuAnimation" className={style.container}></div>
        <p>The code:</p>
        <PrismCode code={codeRaw} language="js" plugins={[]} />
      </section>
    );
  }

}

export default TofuAnimation;
