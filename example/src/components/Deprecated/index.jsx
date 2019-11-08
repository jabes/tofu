import React from 'react';
import SVG from 'react-inlinesvg';
import style from './index.styl';
import grave from '~/assets/images/grave.svg';

class Deprecated extends React.Component {

  render() {
    return (
      <section className={style.section}>
        <div className={style.leftSide}>
          <SVG src={grave} className={style.grave}/>
        </div>
        <div className={style.rightSide}>
          <p>
            <span>This library is now dead and lives here in archive heaven.</span>
            <span>It was written at a time where IE6 compatibility was necessary, and many of the features are now outdated or have been replaced by native solutions.</span>
            <span>Below are some examples of Tofu when he was hard at work.</span>
            <span>Rest in peace my friend.</span>
          </p>
        </div>
      </section>
    );
  }

}

export default Deprecated;
