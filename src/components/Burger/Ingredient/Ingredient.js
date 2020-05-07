import React from 'react';
import PropType from 'prop-types';
import classes from './Ingredient.css';

const ingredient = (props) => {
  let burgerIngredient = null;
  switch (props.type) {
    case 'meat':
      burgerIngredient = <div className={classes.Meat}></div>;
      break;
    case 'cheese':
      burgerIngredient = <div className={classes.Cheese}></div>;
      break;
    case 'salad':
      burgerIngredient = <div className={classes.Salad}></div>;
      break;
    case 'bacon':
      burgerIngredient = <div className={classes.Bacon}></div>;
      break;
    case 'bread-top':
      burgerIngredient = (
        <div className={classes.BreadTop}>
          <div className={classes.Seeds1}></div>
          <div className={classes.Seeds2}></div>
        </div>
      );
      break;
    case 'bread-bottom':
      burgerIngredient = <div className={classes.BreadBottom}></div>;
      break;
    default:
      burgerIngredient = null;
      break;
  }

  return burgerIngredient;
};

ingredient.propTypes = {
  type: PropType.string.isRequired,
};
export default ingredient;
