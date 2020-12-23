import React, { Component } from 'react';
import axios from '../../hoc/axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Order from '../../components/Order/Order';


class Orders extends Component {
    state = {
        orders: [],
        loading: true,
    }

    componentDidMount() {
        axios.get('/orders.json')
        .then(response => {
            const fetchedOrders = [];
            
            for (let key in response.data){
                fetchedOrders.push({
                    ...response.data[key],
                    id: key
                });
            }
            this.setState({loading: false, orders: fetchedOrders});
        })
        .catch(err => {
            this.setState({loading: false});
        })
    }

    render() {
        console.log(this.state.orders);
        return(
            <div>
                {this.state.orders.map(order => (
                    <Order key={order.id}
                    ingridients={order.ingridients}
                    price={order.price}/>
                ))}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);