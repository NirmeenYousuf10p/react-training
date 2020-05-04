import React, {useState} from 'react';
import { connect } from 'react-redux';

import classes from './Layout.css';
import Aux from '../Aux/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const layout = props => {
    const [sideDrawerIsVisible, setSidDrawerIsVisible] = useState(false);

    const sideDrawerClosedHandler = () => {
        setSidDrawerIsVisible(false);
    }

    const sideDrawerToggleHandler = () => {
        setSidDrawerIsVisible(!sideDrawerIsVisible)
    }

        return (
            <Aux>
                <Toolbar
                    isAuthenticated={props.isAuthenticated} 
                    drawerToggleClicked={sideDrawerToggleHandler} />
                <SideDrawer
                    isAuthenticated={props.isAuthenticated}
                    open={sideDrawerIsVisible}
                    closed={sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {props.children}
                </main>
            </Aux>
        )
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(layout);