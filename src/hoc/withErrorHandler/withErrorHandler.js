import React, { Component } from 'react';
import Aux from '../Auxiliary/Auxiliary';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = ( WrapperComponent, axios ) => {
    return class extends Component {
        state = {
            error: null,
        }
//axios interceptors init---------------------------------
        constructor() {
            super();
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });

            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
        }
//following lifecycle is for cleaning up the created interceptors for wrapped component when we wont use
//it anymore, so me 'unmount' them.
        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }
//end of axios interceptors finish---------------------------

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        render() {
            return(
            <Aux>
                <Modal show={this.state.error} purchaseCancel={this.errorConfirmedHandler}>
                    {this.state.error ? this.state.error.message : null}
                </Modal>
                <WrapperComponent {...this.props} />
            </Aux>
            );
        }
    } 
};


export default withErrorHandler;