import React, {Component} from 'react';
import { connect } from 'react-redux';
import classes from './ContactData.module.css';

import { checkValidity } from '../../../shared/Validation';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../hoc/axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'

import * as actions from '../../../store/actions/index';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name...'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            address: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Address'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false,
                errorMassege: "* Please enter a valid Zip Code."
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options:[
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'},
                    ]
                },
                validation: {},
                value: 'fastest',
                valid: true
            }
        },
        formIsValid: false
    }
//everything is handled in the state, we just bind them to some consts and post them to database with the following function.
    orderHandler = (event) => {
        event.preventDefault();
        
        const formData = {};
        //timeNow holds time of the submission moment and we post it to to db and we get it in my orders page :) 
        const timeNow = new Date().toLocaleString();
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingridients: this.props.ings,
            price: this.props.totalPrice,
            orderData: formData,
            orderDate: timeNow,
            userId: this.props.userId
        };

        this.props.onOrderBurger(order, this.props.token);
        // axios.post('/orders.json', order)
        //     .then(response => {
        //         this.setState({loading: false});
        //         this.props.history.push('/');
        //     })
        //     .catch(error => {
        //         this.setState({loading: false});
        //     });
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const cloneOrderForm = {
            ...this.state.orderForm
        };
        const cloneElementForm = {
            ...cloneOrderForm[inputIdentifier]
        }

        cloneElementForm.value = event.target.value;
        cloneElementForm.valid = checkValidity(cloneElementForm.value, cloneElementForm.validation)
        cloneElementForm.touched = true;
        cloneOrderForm[inputIdentifier] = cloneElementForm;

        let formIsValid = true;
        for (let inputIdentifier in cloneOrderForm) {
            formIsValid = cloneOrderForm[inputIdentifier].valid && formIsValid;
        }

        console.log(formIsValid);

        this.setState({
            orderForm: cloneOrderForm,
            formIsValid: formIsValid
        })
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id} 
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        errMassege={formElement.config.errorMassege}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
                ))}
                <Button 
                    btnType="Success"
                    disabled={!this.state.formIsValid}>ORDER</Button>
            </form>);

        if (this.props.loading){
            form = <Spinner />;
        }

        return(
            <div className={classes.ContactData}>
                <h4>Enter your contact data:</h4>
                {form}
            </div>
        );
    }

};

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token)),
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingridients,
        totalPrice: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));