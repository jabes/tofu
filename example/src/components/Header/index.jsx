import React from 'react';
import SVG from 'react-inlinesvg';
import style from './index.styl';
import logo from '~/assets/images/logo.svg';
import githubCorner from '~/assets/images/github-corner.svg';

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
          <SVG src={githubCorner} className={style.githubCorner}/>
        </a>
      </header>
    );
  }

}

export default Header;
