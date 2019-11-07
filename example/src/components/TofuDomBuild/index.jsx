import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokaiSublime } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import style from './index.styl';
import codeRaw from './code.raw.js';

class TofuDomBuild extends React.Component {

  componentDidMount() {
    console.log(tofu);
    console.log(_tofu);
    eval(codeRaw);
  }

  render() {
    return (
      <section className={style.section}>
        <h2>Build HTML From JSON</h2>
        <div id="TofuDomBuild" className={style.container}></div>
        <p>The code:</p>
        <SyntaxHighlighter language="javascript" style={monokaiSublime}>
          {codeRaw}
        </SyntaxHighlighter>
      </section>
    );
  }

}

export default TofuDomBuild;