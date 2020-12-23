import React, {Component} from 'react';
import classes from './ContactData.module.css';

import Button from '../../../components/UI/Button/Button';
import axios from '../../../hoc/axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: '',
        },
        loading: false,
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true})
        const order = {
            ingridients: this.props.ingridients,
            price: this.props.price,
            customer: {
                name: 'Arsalan HK',
                address: {
                    street: 'Rushdie st.',
                    zipcode: '43821',
                    country: 'IRAN'
                },
                email: 'harooni@gmail.com',
            },
            deliveryMethod: 'fastest'
        };
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({loading: false});
            });
    }

    render() {
        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your name..." />
                <input className={classes.Input} type="email" name="email" placeholder="Your email..." />
                <input className={classes.Input} type="text" name="name" placeholder="Your address..." />
                <input className={classes.Input} type="text" name="postal" placeholder="Your postal code..." />
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>);
        if (this.state.loading){
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

export default ContactData;