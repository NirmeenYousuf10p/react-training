import React from 'react';
import classes from './Burger.css';
import Ingredient from './Ingredient/Ingredient';

const burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map((key) => {
      return [...Array(props.ingredients[key])].map((_, i) => {
        return <Ingredient key={key + i} type={key}></Ingredient>;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding Ingredients!</p>;
  }

  return (
    <div className={classes.Burger}>
      <Ingredient type="bread-top"></Ingredient>
      {transformedIngredients}
      <Ingredient type="bread-bottom"></Ingredient>
    </div>
  );
};

export default burger;
