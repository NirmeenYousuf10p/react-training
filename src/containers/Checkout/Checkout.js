import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route, Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect} from 'react-redux';

const checkout  = props => {

    // state = {
    //     ingredients: null,
    //     price: 0
    // }

    // componentWillMount() {
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price  = 0;
    //     for (let param of query.entries()) {
    //         if (param[0] === 'price') {
    //             price = param[1];
    //         } else {
    //             ingredients[param[0]] = +param[1];
    //         }
    //     }
    //     this.setState({ingredients: ingredients, price: price});
    // }

    const checkoutCancelledHandler = () => {
        props.history.goBack();

    }

    const checkoutContinuedHandler = () => {
        props.history.replace('/checkout/contact-data');
    }

        let summary = <Redirect to ="/"/>
        if (props.ingredients) {
            const purchasedRedirect = props.purchased ? <Redirect to="/"/> : null;
            summary = (
            <div>
                {purchasedRedirect}
                <CheckoutSummary 
                    ingredients={{...props.ingredients}}
                    checkoutCancelled={checkoutCancelledHandler}
                    checkoutContinued={checkoutContinuedHandler}/>
                <Route 
                    path={props.match.path + '/contact-data'}
                    component={ContactData}/>
                    {/* <Route 
                path={this.props.match.path + '/contact-data'}
                render = {(props)=>(<ContactData 
                                ingredients={this.props.ingredients}
                                price={this.props.price}
                                {...props}
                                />)}/> */}
            </div>
            );
        }
        return summary;
}

const mapStateToProps = state => {
    return {
       ingredients: state.burgerBuilder.ingredients,
       purchased: state.order.purchased
    }
};

export default connect(mapStateToProps)(checkout);