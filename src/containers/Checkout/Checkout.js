import React, {Component} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    // componentWillMount() {
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingridients = {};
    //     let price = 0;
    //     for (let param of query.entries()) {
    //         if (param[0] === 'price'){
    //             price = param[1];
    //         }
    //         else {
    //             ingridients[param[0]] = +param[1];
    //         }
    //     }
    //     this.setState({ingridients: ingridients, totalPrice: price});
    // }


    checkoutCancelled = () => {
        this.props.history.goBack();
    }
    checkoutContinued = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        let summary = <Redirect to="/" />
        if (this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary 
                        ingridients={this.props.ings}
                        checkoutCancelled={this.checkoutCancelled}
                        checkoutContinued={this.checkoutContinued}/>
                    <Route path={this.props.match.url + '/contact-data'}
                        component={ContactData} 
                        // render={(props) => <ContactData 
                        //     ingridients= {this.props.ings} 
                        //     price={this.props.totalPrice}
                        //     {...props}/>}
                        />
                </div>);
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingridients,
        purchased: state.order.purchased
    }
}



export default connect(mapStateToProps)(Checkout);