import React, { Component } from "react";

export default class Filter extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-4">
          <h3>{this.props.count} products found</h3>
        </div>

        <div className="col-md-4">
          <label>
            Order By Price
            <select
              className="form-control"
              value={this.props.sort}
              onChange={this.props.handleChangeSort}
            >
              <option value="">Select</option>
              <option value="lowest">lowest to highest </option>
              <option value="highest">highest to lowest</option>
            </select>
          </label>
        </div>

        <div className="col-md-4" />
      </div>
    );
  }
}
