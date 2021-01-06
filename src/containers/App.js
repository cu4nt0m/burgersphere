import React, {Component} from 'react';
import Layout from '../hoc/Layout/Layout';
import BurgerBuilder from '../containers/BurgerBuilder/BurgerBuilder';
import Checkout from './Checkout/Checkout';
import Auth from './Auth/Auth';

import Orders from './Orders/Orders';
import { Route, Switch } from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component= {Checkout} />
            <Route path="/orders" component= {Orders} />
            <Route path="/auth" component= {Auth} />
            <Route path="/" component= {BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
