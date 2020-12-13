import React, {Component} from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

    render() {
        const ingridients = Object.keys(this.props.ingridients)
        .map(igKey => {
            return <li key={igKey}>
                        {igKey.charAt(0).toUpperCase() + igKey.slice(1)}
                            : {this.props.ingridients[igKey]}
                    </li>
        });
        return(
            <Aux>
            <h3>Your Order</h3>
            <p>Your burger includes the following ingredients:</p>
            <ul>
                {ingridients}
            </ul>
            <p><strong>Total Price: {this.props.price.toFixed(2)}$</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" 
                    clicked={this.props.purchaseCancelled}>
                        Cancel
            </Button>
            <Button btnType="Success"
                    clicked={this.props.purchaseContinued}>
                        Continue
            </Button>
        </Aux>
        );
    }
};

export default OrderSummary;