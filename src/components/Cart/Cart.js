import { Fragment, useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

import Checkout from "./Checkout";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const [isCheckout, setIsCheckout] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };


  const submitOrderHandler = async (userData)=>{

    setIsSubmitting(true);

    await fetch('https://react-http-a6b89-default-rtdb.firebaseio.com/orders.json',{
      method:'POST',
      body: JSON.stringify({
        user :userData,
        orderItems: cartCtx.items
      })
    });

    setIsSubmitting(false);
    setDidSubmit(true);

    cartCtx.clearCart();
  };


  const cartModelContent = <Fragment>
     {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
  </Fragment>

  const didSubmitModalContent = <p>Successfully send the order!</p>

  const submit = <p>Sending orderData</p>
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {!isSubmitting && !didSubmit && cartModelContent}
      {isSubmitting && submit}
      {!isSubmitting && didSubmit && didSubmitModalContent}


    </ul>
  );

  const modalActions  =    
  <div className={classes.actions}>
        { (
          <button className={classes["button-alt"]} onClick={props.onClose}>
            Close
          </button>
        )}

        { hasItems && (
          <button className={classes.button} onClick={orderHandler}>
            Order
          </button>
        )}
      </div>
  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && <Checkout   onConfirm={submitOrderHandler} onCancel={props.onClose}/>}
      {!isCheckout && modalActions}

    </Modal>
  );
};

export default Cart;
