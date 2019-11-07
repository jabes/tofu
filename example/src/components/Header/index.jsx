import React from 'react';
import SVG from 'react-inlinesvg';
import style from './index.styl';
import logo from '~/assets/images/logo.svg';

class Header extends React.Component {

  render() {
    return (
      <header className={style.header}>
        <div className={style.containLeft}>
          <SVG src={logo} className={style.logo}/>
        </div>
        <div className={style.containRight}>
          <h1 className={style.heading}>Tofu.js</h1>
          <p className={style.intro}>
            Originally developed in 2010 for use in <a href="https://github.com/jabes/pinup">Pinup</a>, a graphical tool for tagging content within images on the web.
            This is a very tiny JavaScript library that focuses on element manipulation including events, animations, and html parsing.
          </p>
        </div>
        <a href="https://github.com/jabes/tofu" className={style.fork}>
          <img src="https://camo.githubusercontent.com/a6677b08c955af8400f44c6298f40e7d19cc5b2d/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f677261795f3664366436642e706e67" alt="Fork me on GitHub"/>
        </a>
      </header>
    );
  }

}

export default Header;