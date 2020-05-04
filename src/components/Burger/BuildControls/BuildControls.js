import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css';

const buildControls = (props) => {
    const controls = [
        {label: 'bacon', type: 'bacon'},
        {label: 'cheese', type: 'cheese'},
        {label: 'meat', type: 'meat'},
        {label: 'salad', type: 'salad'},
    ];

    return(
        <div className={classes.BuildControls}>
            <p>Current Price: {props.price}</p>
            {controls.map(control=>{
            return <BuildControl 
                 label={control.label}
                 key={control.type}
                 added={() => props.ingredientAdded(control.type)}
                 removed={() => props.ingredientRemoved(control.type)}
                 disabled={props.disabledInfo[control.type]}></BuildControl>;
        })}
        <button 
            disabled={!props.purchaseable} 
            className={classes.OrderButton}
            onClick={props.ordered}>{props.isAuthenticated ? 'Order Now' : 'Sign Up to Order'}</button>
        </div>
    );
};

export default buildControls;