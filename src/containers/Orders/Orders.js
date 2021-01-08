import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../hoc/axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Order from '../../components/Order/Order';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrders(this.props.token);
    }

    render() {
        let orders = <Spinner />;
        if (!this.props.loading) {
            orders = 
                this.props.orders.map(order => (
                    <Order key={order.id}
                    ingridients={order.ingridients}
                    price={order.price}
                    date={order.orderDate}
                    delete={() => this.props.onDeleteOrders(order.id)}/>
                )).reverse()
        }
        // if (this.props.error) {
        //     orders = (
        //         <div>
        //             <p style={{textAlign: 'center'}}>Can not load the Orders, Permission Denied!</p>
        //             <hr />
        //         </div>)
        // }
        console.log(this.props.orders);
        return(
            <div>
                {orders}
                {/* reverse added to reverse the order in my orders, may change later */}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        error: state.order.error,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token) => dispatch(actions.fetchOrders(token)),
        onDeleteOrders: (id) => dispatch(actions.deleteOrder(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));