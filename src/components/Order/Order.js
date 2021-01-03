import React from 'react';

import classes from './Order.module.css';
import Button from '../UI/Button/Button';

const order = (props) => {
    const ingridients = [];

    for (let ingridientName in props.ingridients){
        ingridients.push({
            name: ingridientName,
            amount: props.ingridients[ingridientName]
        });

    }

    const ingridientOutput = ingridients.map(ig => {
        return <span
            style={{
                display: 'inline-block',
                textTransform: 'capitalize',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
            }} 
            key={ig.name}>
                {ig.name} ({ig.amount})</span>
            
    });

    return(
        <div className={classes.Order}>
            <p>Ingredients: {ingridientOutput}</p>
            <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
            <p>Order date: <span className={classes.Date}>{props.date}</span></p>
            {/* added date of now by me */}
            <div>
                <Button 
                    btnType="Danger"
                    clicked={props.delete}>Delete</Button>
            </div>
            
        </div>
        );
};

export default order;