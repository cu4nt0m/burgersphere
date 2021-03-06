import React, {Component} from 'react';
import {connect} from 'react-redux';

import Layout from '../hoc/Layout/Layout';
import BurgerBuilder from '../containers/BurgerBuilder/BurgerBuilder';
import Checkout from './Checkout/Checkout';
import Auth from './Auth/Auth';
import Logout from './Auth/Logout/Logout';

import Orders from './Orders/Orders';
import { Route, Switch, Redirect } from 'react-router-dom';
import * as actions from '../store/actions/index';
import Instagram from '../components/Navigation/NavigationItems/NavigationItem/Instagram';

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component= {Auth} />
        <Route path="/contact" component= {Instagram} />
        <Route path="/" exact component= {BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
            <Route path="/checkout" component= {Checkout} />
            <Route path="/orders" component= {Orders} />
            <Route path="/logout" component= {Logout} />
            <Route path="/contact" component= {Instagram} />
            <Route path="/auth" component= {Auth} />
            <Route path="/" exact component= {BurgerBuilder} />
            <Redirect to="/" />
        </Switch>);
    }
    return (
      <div>
        <Layout>
            {routes}      
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
//cause of connect, if routing didnt work in app, we have to include "withRouter" high order wrapper
//which is included in react-router-dom to fix the problem. now all fine!
