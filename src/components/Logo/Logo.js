import React from 'react';

import classes from './Logo.module.css';
import burgerLogo from '../../assets/images/burger-logo.png';
import { Link } from 'react-router-dom';

const Logo = (props) => (
    <div className={classes.Logo}>
        <Link
            to="/">
            <img src={burgerLogo} alt="myBurger"/>
        </Link>
    </div>
);

export default Logo;