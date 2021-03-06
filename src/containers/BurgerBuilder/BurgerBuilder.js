import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandlre';
import * as actions from '../../store/actions/index';

const burgerBuilder = (props) => {
  const [purchasing, setPurchasing] = useState(false);

  // using useDispatch and useState instead of mapStateToProps and mapDispatchToProps
  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.burgerBuilder.ingredients);
  const totalPrice = useSelector((state) => state.burgerBuilder.totalPrice);
  const error = useSelector((state) => state.burgerBuilder.error);
  const isAuthenticated = useSelector((state) => state.auth.token !== null);

  const onIngredientAdded = (ingName) => dispatch(actions.addIngredient(ingName));
  const onIngredientRemoved = (ingName) => dispatch(actions.removeIngredient(ingName));
  const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()), [dispatch]);
  const onInitPurchase = () => dispatch(actions.purchaseInit());
  const onSetAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path));

  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

  const updatePurcaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((key) => {
        return ingredients[key];
      })
      .reduce((sum, el) => {
        return (sum = sum + el);
      });
    return sum > 0;
  };

  const purchaseHandler = () => {
    if (isAuthenticated) {
      setPurchasing(true);
    } else {
      onSetAuthRedirectPath('/checkout');
      props.history.push('/auth');
    }
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    //alert('You continue');
    // const queryParams = [];
    // for (let i in this.state.ingredients) {
    //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    // }
    // queryParams.push('price=' + this.state.totalPrice);
    // const queryString = queryParams.join('&');
    // this.props.history.push({
    //     pathname: '/checkout',
    //     search: '?' + queryString
    // }); // since inredients are now managed through store , we don't need to pass as query params
    onInitPurchase();
    props.history.push('/checkout');
  };

  const disabledInfo = { ...ingredients };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }
  let orderSummary = null;
  let burger = error ? <p>Ingredients can't be loaded</p> : <Spinner />;
  if (ingredients) {
    burger = (
      <Aux>
        <Burger ingredients={ingredients}></Burger>
        <BuildControls
          price={totalPrice}
          ingredientAdded={onIngredientAdded}
          ingredientRemoved={onIngredientRemoved}
          disabledInfo={disabledInfo}
          purchaseable={updatePurcaseState(ingredients)}
          ordered={purchaseHandler}
          isAuthenticated={isAuthenticated}
        ></BuildControls>
      </Aux>
    );
    orderSummary = (
      <OrderSummary
        purchaseCancelled={purchaseCancelHandler}
        purchaseContinued={purchaseContinueHandler}
        ingredients={ingredients}
        price={totalPrice}
      />
    );
  }

  return (
    <Aux>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
  );
};
export default WithErrorHandler(burgerBuilder, axios);

// const mapStateToProps = (state) => {
//     return {
//         ingredients: state.burgerBuilder.ingredients,
//         totalPrice: state.burgerBuilder.totalPrice,
//         error: state.burgerBuilder.error,
//         isAuthenticated: state.auth.token !== null
//     };
// }

// const mapDispatchToProps = dispatch => {
//     return {
//         onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
//         onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
//         onInitIngredients: () => dispatch(actions.initIngredients()),
//         onInitPurchase: () => dispatch(actions.purchaseInit()),
//         onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
//     };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(burgerBuilder, axios));
