import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
    state = {
        ingridients: {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 1
        }
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingridients = {};
        for (let param of query.entries()) {
            ingridients[param[0]] = +param[1];
        }
        this.setState({ingridients: ingridients});
    }

    checkoutCancelled = () => {
        this.props.history.goBack();
    }
    checkoutContinued = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {

        return(
            <div>
                <CheckoutSummary 
                    ingridients={this.state.ingridients}
                    checkoutCancelled={this.checkoutCancelled}
                    checkoutContinued={this.checkoutContinued}/>
            </div>
        );
    }

}
export default Checkout;