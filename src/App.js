import React, { Component } from "react";

import "./App.css";
import Navbar from "./Components/Navbar";
import Products from "./Components/Products";
import Filter from "./Components/Filter";
import Cart from "./Components/Cart";
import { products } from "./db";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { products: [], filteredProducts: [], cartItems: [] };

    this.handleChangeSort = this.handleChangeSort.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this);
    this.handleClearCart = this.handleClearCart.bind(this);
  }

  componentWillMount() {
    //fetch("http://localhost:8000/products");
    // .then(res => res.json())
    // .then(data => {
    //   this.setState({
    //     products: data,
    //     filteredProducts: data
    //   });
    // });

    console.log(products);

    this.setState({
      products: products,
      filteredProducts: products
    });

    if (localStorage.getItem("cartItems")) {
      this.setState({
        cartItems: JSON.parse(localStorage.getItem("cartItems"))
      });
    }
  }

  handleAddToCart(e, item) {
    this.setState(state => {
      const cartItems = state.cartItems;
      let productAlreadyInCart = false;
      cartItems.forEach(itemInCart => {
        if (item.id === itemInCart.id) {
          productAlreadyInCart = true;
          itemInCart.count++;
        }
      });

      if (!productAlreadyInCart) {
        cartItems.push({ ...item, count: 1 });
      }
      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      return this.state.cartItems;
    });
  }

  handleChangeSort(e) {
    this.setState({ sort: e.target.value });
    this.listProducts();
  }

  handleRemoveFromCart(item) {
    this.setState(state => {
      const cartItems = state.cartItems.filter(e => e.id !== item.id);
      localStorage.setItem("cartItems", cartItems);

      return { cartItems };
    });
  }

  handleClearCart() {
    this.setState(state => {
      const cartItems = (state.cartItems = []);

      localStorage.setItem("cartItems", cartItems);

      return { cartItems };
    });
  }

  listProducts() {
    this.setState(state => {
      if (state.sort !== "") {
        state.products.sort((a, b) =>
          state.sort === "highest"
            ? a.price < b.price
              ? 1
              : -1
            : a.price > b.price
            ? 1
            : -1
        );
      } else {
        state.products.sort((a, b) => (a.id < b.id ? 1 : -1));
      }
      return { filteredProducts: state.products };
    });
  }
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <Filter
                sort={this.state.sort}
                handleChangeSort={this.handleChangeSort}
                count={this.state.filteredProducts.length}
              />
              <hr />
              <Products
                products={this.state.filteredProducts}
                handleAddToCart={this.handleAddToCart}
                handleRemoveFromCart={this.handleRemoveFromCart}
              />
            </div>

            <div className="col-md-5">
              <Cart
                cartItems={this.state.cartItems}
                handleRemoveFromCart={this.handleRemoveFromCart}
                handleClearCart={this.handleClearCart}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
