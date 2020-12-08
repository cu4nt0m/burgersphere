import React, {Component} from 'react';
import classes from './Layout.module.css'
import Aux from '../../hoc/Auxiliary';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        sideDrawerShow: false,
    }

    sideDrawerCloseHandler = () => {
        this.setState({
            sideDrawerShow: false,
        })
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {sideDrawerShow: !prevState.sideDrawerShow}
        });
    }
            
    render() {
        return(
            <Aux>
                <Toolbar menuClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer open={this.state.sideDrawerShow} clicked={this.sideDrawerCloseHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;