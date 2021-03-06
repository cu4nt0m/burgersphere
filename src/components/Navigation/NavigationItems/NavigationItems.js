import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';


const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Burger Builder</NavigationItem>
        {props.isAuthenticated ? <NavigationItem link="/orders" >My Orders</NavigationItem> : null}
        <NavigationItem link="/contact">Contact</NavigationItem>
        {props.isAuthenticated 
            ?   <NavigationItem link="/logout" >Logout</NavigationItem>
            :   <NavigationItem link="/auth" >Sign in</NavigationItem>}
    </ul>
);

export default navigationItems;
