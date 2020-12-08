import React from 'react';
import classes from './DrawerToggle.module.css';

const drawerToggle = (props) => (
    <div className={classes.DrawerToggle} onClick={props.clicked}>MENU</div>
);

export default drawerToggle;