import React from "react";

class ProductBox extends React.Component {
  render() {
    return <div className="product">
      <h3>{ this.props.title }</h3>
      { this.props.children }
    </div>;
  }
}

export default ProductBox;