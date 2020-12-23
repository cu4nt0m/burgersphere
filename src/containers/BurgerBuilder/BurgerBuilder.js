import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../hoc/axios-orders'; //created instance of axios
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

//a good place to fetch data(axios) 
//is inside the componentDidMount() lifecycle.

//Ingridient prices..
const INGRIDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.5,
    bacon: 2,
}

//Initializations
class BurgerBuilder extends Component {
    state = {
        ingridients : null,
        totalPrice: 4, 
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

componentDidMount() {
    console.log(this.props);
    axios.get('https://burgershpear-default-rtdb.firebaseio.com/ingridients.json')
        .then(response => {
            this.setState({ingridients: response.data});
        })
        .catch(error => {
            this.setState({error: true});
        });
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
        this.setState({
            purchasable: sum > 0,
        })
    };

    addIngridientHandler = (type) => {
        const oldCount = this.state.ingridients[type];
        const updatedCount = oldCount + 1;
        const updatedIngridients = {
            ...this.state.ingridients
        };
        updatedIngridients[type] = updatedCount;
        const priceAddition = INGRIDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            ingridients: updatedIngridients,
            totalPrice: newPrice,
        })
        this.updatePurchaseState(updatedIngridients);
    };

    removeIngridient = (type) => {
        const oldCount = this.state.ingridients[type];
        if (oldCount <= 0){
            return;
        };
        const updatedCount = oldCount - 1;
        const updatedIngridients = {
            ...this.state.ingridients
        };
        updatedIngridients[type] = updatedCount;

        const priceDeduction = INGRIDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({
            ingridients: updatedIngridients,
            totalPrice: newPrice,
        })
        this.updatePurchaseState(updatedIngridients);
    };

    orderPurchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        //alert('You are going well!');
        
        const queryParams = [];
        for (let i in this.state.ingridients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingridients[i]));
            //We loop our ingre dients in queryParams as ['bacon=0','meat=1',...] 
        }
        queryParams.push('price='+ this.state.totalPrice);
        const queryString = queryParams.join('&');
        //join the array elements together with an '&' between, so we get sth like : 'bacon=0&meat=1...'
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
            //we push that string we made to the /checkout path and search param, so we can access it in the checkout page.
        });
        }
//end of methods-----------------------

//Render section-=-=-=-=-=-=-=-=-=-=-=-=-
    render() {
        const disabledInfo = {
            ...this.state.ingridients
        };
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        };
        
    //checking till ingredients get request finishes then renders
        let burger = this.state.error ? 
            <p style={{textAlign: 'center'}}>Ingredients can not load. Network error!</p>
             : <Spinner />;
        let orderSummary = null;

        if(this.state.ingridients){
            burger = (
                <Aux>
                    <Burger ingridients={this.state.ingridients}/>
                        <BuildControls 
                            addIg={this.addIngridientHandler}
                            removeIg={this.removeIngridient}
                            disabled={disabledInfo}
                            price={this.state.totalPrice}
                            orderDisabled={this.state.purchasable}
                            orderBtn={this.orderPurchaseHandler}/>
                </Aux>
                );
                orderSummary = <OrderSummary 
                    ingridients={this.state.ingridients}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                    price={this.state.totalPrice}/>;

            }
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }
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

export default withErrorHandler(BurgerBuilder, axios);
