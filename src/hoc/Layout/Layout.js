import React, {Component} from 'react';
import {connect} from 'react-redux';

import classes from './Layout.module.css'
import Aux from '../Auxiliary/Auxiliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

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
                <Toolbar 
                    menuClicked={this.sideDrawerToggleHandler}
                    isAuth={this.props.isAuthenticated}/>

                <SideDrawer 
                    open={this.state.sideDrawerShow} clicked={this.sideDrawerCloseHandler}
                    isAuth={this.props.isAuthenticated}/>
                    
                <main className={classes.Content}>
                    {this.props.children}
                </main>

                <footer className={classes.Footer}>
                    <p>Under development by cu4nt0m
                        Arsalan H.
                    </p>
                </footer>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Layout);