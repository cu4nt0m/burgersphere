import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';


const controls = [
    {label: 'Salad:', type: 'salad'},
    {label: 'Bacon:', type: 'bacon'},
    {label: 'Cheese:', type: 'cheese'},
    {label: 'Meat:', type: 'meat'},
]

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p><strong>Burger Price: {props.price.toFixed(2)}$</strong></p>
        {controls.map(crtl => {
            return <BuildControl 
                key={crtl.label} 
                label={crtl.label}
                added={() => props.addIg(crtl.type)}
                removed={() => props.removeIg(crtl.type)}
                disabled={props.disabled[crtl.type]}/>
            })
        }
        <button 
            style={{marginTop: '15px'}}
            className={classes.OrderButton} 
            disabled={!props.orderDisabled}
            onClick={props.orderBtn}>
                PROCEED!
        </button>
    </div>
);

export default buildControls;