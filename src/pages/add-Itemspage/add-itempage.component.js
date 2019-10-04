import React, { Component } from "react";
import CustomCard from "../../components/CustomCard/customCard.component";
import { connect } from "react-redux";
import { milkSelector } from "../../redux/products/products.selector";
import { cartItemsSelector } from "../../redux/cart/cart.selector";
export class AddItemPage extends Component {
  render() {
    const { milk, cartItems } = this.props;
    return (
      <div
        style={{
          width: "100%",
          paddingBottom: 55,
          overflowY: "scroll"
        }}
      >
        {milk
          ? milk.map(item => (
              <CustomCard
                group={item}
                key={item.name}
                cartItems={cartItems}
              ></CustomCard>
            ))
          : null}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    milk: milkSelector(state),
    cartItems: cartItemsSelector(state)
  };
};

export default connect(mapStateToProps)(AddItemPage);
