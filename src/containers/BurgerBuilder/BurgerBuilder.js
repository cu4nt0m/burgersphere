import React, {Component} from 'react';
import { connect } from 'react-redux';
import axios from '../../hoc/axios-orders'; //created instance of axios

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

//a good place to fetch data(axios) 
//is inside the componentDidMount() lifecycle.


//Initializations
class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        // loading: false,
        // error: false
    }

componentDidMount() {
    this.props.onInitIngridients();
}

//methods----------------
    updatePurchaseState = (ingridients) => {
        const sum = Object.keys(ingridients)
            .map(igkey => {
                return ingridients[igkey];
            })
            .reduce((sum, el) =>{
                return sum + el > 0;
            }, 0);
        return sum > 0;
    };

    // addIngridientHandler = (type) => {
    //     const oldCount = this.state.ingridients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngridients = {
    //         ...this.state.ingridients
    //     };
    //     updatedIngridients[type] = updatedCount;
    //     const priceAddition = INGRIDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
    //     this.setState({
    //         ingridients: updatedIngridients,
    //         totalPrice: newPrice,
    //     })
    //     this.updatePurchaseState(updatedIngridients);
    // };

    // removeIngridient = (type) => {
    //     const oldCount = this.state.ingridients[type];
    //     if (oldCount <= 0){
    //         return;
    //     };
    //     const updatedCount = oldCount - 1;
    //     const updatedIngridients = {
    //         ...this.state.ingridients
    //     };
    //     updatedIngridients[type] = updatedCount;

    //     const priceDeduction = INGRIDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceDeduction;
    //     this.setState({
    //         ingridients: updatedIngridients,
    //         totalPrice: newPrice,
    //     })
    //     this.updatePurchaseState(updatedIngridients);
    // };

    orderPurchaseHandler = () => {
        if(this.props.isAuthenticated) {
            this.setState({purchasing: true});
        }
        else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        //alert('You are going well!');

        // const queryParams = [];
        // for (let i in this.state.ingridients) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingridients[i]));
        //     //We loop our ingre dients in queryParams as ['bacon=0','meat=1',...] 
        // }
        // queryParams.push('price='+ this.props.totalPrice);
        // const queryString = queryParams.join('&');
        //join the array elements together with an '&' between, so we get sth like : 'bacon=0&meat=1...'
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
        }

//end of methods-----------------------

//Render section-=-=-=-=-=-=-=-=-=-=-=-=-
    render() {
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        };
        
    //checking till ingredients get request finishes then renders
        let burger = this.props.error ? 
            <p style={{textAlign: 'center'}}>Ingredients can not load. Network error!</p>
             : <Spinner />;
        let orderSummary = null;

        if(this.props.ings){
            burger = (
                <Aux>
                    <Burger ingridients={this.props.ings}/>
                        <BuildControls 
                            addIg={this.props.onIngridientAdded}
                            removeIg={this.props.onIngridientRemoved}
                            disabled={disabledInfo}
                            price={this.props.totalPrice}
                            orderDisabled={this.updatePurchaseState(this.props.ings)}
                            orderBtn={this.orderPurchaseHandler}
                            isAuth={this.props.isAuthenticated}/>
                </Aux>
                );
                orderSummary = <OrderSummary 
                    ingridients={this.props.ings}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                    price={this.props.totalPrice}/>;

            }
        // if (this.state.loading) {
        //     orderSummary = <Spinner />;
        // }
//end of Render section -=-=-=-=-=-=--=-=-=-=-=
        return(
            <Aux>
                <Modal show={this.state.purchasing} purchaseCancel={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingridients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        purchased: state.order.purchased,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngridientAdded: (ingName) => dispatch(actions.addIngridient(ingName)),
        onIngridientRemoved: (ingName) => dispatch(actions.removeIngridient(ingName)),
        onInitIngridients: () => dispatch(actions.initIngridients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) =>dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
