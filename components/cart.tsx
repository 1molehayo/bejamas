import { useState } from "react";
import { useAppContext } from "../contexts/appContext";
import { Context } from "./context";

export const Cart = () => {
  const { cart, showContext, toggleContext } = useAppContext();

  return (
    <div className="cart__container">
      <button className="cart__icon" onClick={toggleContext}>
        <span className="icon-shopping-cart" />
        {cart.length > 0 && <span className="cart__badge">{cart.length}</span>}
      </button>

      {showContext && <Context onClose={toggleContext} />}
    </div>
  );
};
