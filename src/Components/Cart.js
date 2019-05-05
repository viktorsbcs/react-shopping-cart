import React, { Component } from "react";
import PayPalButton from "./PayPalButton";

export default class Cart extends Component {
  render() {
    const { cartItems } = this.props;

    let totalPrice = 0;
    return (
      <div className="alert alert-light">
        {cartItems.length === 0 ? (
          "Cart is empty"
        ) : (
          <div className="" style={{ "margin-bottom": "20px" }}>
            {" "}
            You have {cartItems.length}{" "}
            {cartItems.length === 1 ? "guitar in cart!" : "guitars in cart!"}{" "}
          </div>
        )}

        {cartItems.length > 0 && (
          <div>
            <ul>
              {cartItems.map(
                item => (
                  (totalPrice += item.price * item.count),
                  (
                    <li key={item.id}>
                      <b>{item.title}</b> x {item.count}
                      {"    "}
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => {
                          this.props.handleRemoveFromCart(item);
                        }}
                      >
                        {"  "}X
                      </button>
                    </li>
                  )
                )
              )}

              {console.log(totalPrice)}
            </ul>

            <h3>Total price: € {totalPrice}</h3>
            <PayPalButton
              total={totalPrice}
              clearCart={() => {
                this.props.handleClearCart();
              }}
            />
            {/* <button className="btn btn-primary d-block">Checkout</button> */}
          </div>
        )}
      </div>
    );
  }
}
