import React, {Component} from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingridients: null,
        totalPrice: 0
    }

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingridients = {};
        let price = 0;
        for (let param of query.entries()) {
            if (param[0] === 'price'){
                price = param[1];
            }
            else {
                ingridients[param[0]] = +param[1];
            }
        }
        this.setState({ingridients: ingridients, totalPrice: price});
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
                <Route path={this.props.match.url + '/contact-data'} 
                    render={(props) => <ContactData 
                        ingridients= {this.state.ingridients} 
                        price={this.state.totalPrice}
                        {...props}/>}
                    />
            </div>
        );
    }

}
export default Checkout;