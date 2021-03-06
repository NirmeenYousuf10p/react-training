import React from 'react';
import classes from './Logo.css';
import BurgerLogo from '../../assets/images/burger_logo.png';

const logo = (props) => (
  <div className={classes.Logo} style={{ height: props.height }}>
    <img src={BurgerLogo} alt="logo"></img>
  </div>
);

export default logo;
