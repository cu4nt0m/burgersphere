import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingridients = Object.keys(props.ingridients)
    .map(igKey => {
        return <li key={igKey}>
                    {igKey}: {props.ingridients[igKey]}
                </li>
    });
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>Your burger includes the following ingredients:</p>
            <ul>
                {ingridients}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}$</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" 
                    clicked={props.purchaseCancelled}>
                        Cancel
            </Button>
            <Button btnType="Success"
                    clicked={props.purchaseContinued}>
                        Continue
            </Button>
        </Aux>
    );
};

export default orderSummary