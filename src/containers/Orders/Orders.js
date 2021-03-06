import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandlre';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

const orders = (props) => {
  const { onFetchOrders } = props;
  useEffect(() => {
    onFetchOrders(props.token, props.userId);
    // axios.get('/orders.json')
    //     .then(res => {
    //         const fetchedOrders = [];
    //         for(let key in res.data) {
    //             fetchedOrders.push({
    //                 ...res.data[key],
    //                 id: key
    //             });
    //         }
    //         this.setState({orders: fetchedOrders, loading: false});
    //     })
    //     .catch(err => {
    //         this.setState({loading: false});
    //     })
  }, [onFetchOrders]);

  let orders = <Spinner />;
  if (!props.loading) {
    orders = props.orders.map((order) => (
      <Order key={order.id} ingredients={order.ingredients} price={order.price} />
    ));
  }
  return <div>{orders}</div>;
};

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(orders, axios));
