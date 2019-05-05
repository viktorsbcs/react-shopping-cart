import React, { Component } from "react";

export default class Products extends Component {
  render() {
    const items = this.props.products.map(item => (
      <div key={item.id} className="col-md-4">
        <div className="thumbnail text-center">
          {/* <a href={`#${item.id}`} onClick={this.props.handleAddToCart} /> */}
          <img src={item.img} alt={item.title} />

          <p className="text-center" style={{ height: "75px" }}>
            {item.title}
          </p>

          <div className="">
            <h4 className="float-left ">€ {item.price}</h4>
            <button
              className="btn btn-info"
              onClick={e => this.props.handleAddToCart(e, item)}
            >
              <i className="fas fa-cart-plus " /> Add To Cart
            </button>
          </div>
        </div>
      </div>
    ));
    return <div className="row">{items}</div>;
  }
}
