import React, {Component} from 'react';
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
                <Toolbar menuClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer open={this.state.sideDrawerShow} clicked={this.sideDrawerCloseHandler}/>
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

export default Layout;