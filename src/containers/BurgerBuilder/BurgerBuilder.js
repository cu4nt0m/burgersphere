import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

//this is example for pull
const INGRIDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.5,
    bacon: 2,
}

class BurgerBuilder extends Component {
    state = {
        ingridients : {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4, 
        purchasable: false,
        purchasing: false,
    }

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
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        })
    }

    purchaseContinueHandler = () => {
        alert('You are going well!');
    }

    render() {
        const disabledInfo = {
            ...this.state.ingridients
        };
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        };

        return(
            <Aux>
                <Modal show={this.state.purchasing} purchaseCancel={this.purchaseCancelHandler}>
                    <OrderSummary 
                        ingridients={this.state.ingridients}
                        purchaseCancelled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler}
                        price={this.state.totalPrice}/>
                </Modal>

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
    }
}

export default BurgerBuilder;
