import React from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const orderSummary = Object.keys(props.ingredients).map(key => {
        return (
            <li key={key}>{key} : {props.ingredients[key]}</li>
        )
    });

    return (
        <Aux>
            <h2>Order Summary</h2>
            <p>Details of burger are as follows:</p>
            <ul>
                {orderSummary}
            </ul>
            <p>Total price: {props.price}</p>
            <p>Want to checkout? </p>
            <Button clicked={props.purchaseCancelled} btnType="Danger">Cancel</Button>
            <Button clicked={props.purchaseContinued} btnType="Success">Continue</Button>
        </Aux>
    );
};

export default orderSummary;
