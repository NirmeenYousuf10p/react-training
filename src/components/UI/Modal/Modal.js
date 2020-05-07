import React from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => {
  // shouldComponentUpdate(nextProps, nextState) {
  //     return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  // }
  return (
    <Aux>
      <Backdrop clicked={props.modalClosed} show={props.show}></Backdrop>
      <div
        className={classes.Modal}
        style={{
          transform: props.show ? 'translateY(0)' : 'translateY(-100wh)',
          opacity: props.show ? '1' : '0',
        }}
      >
        {props.children}
      </div>
    </Aux>
  );
};
export default React.memo(
  modal,
  (prevProps, nextProps) =>
    nextProps.show === prevProps.show && nextProps.children === prevProps.children,
);
