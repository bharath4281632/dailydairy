import React, { Component } from "react";
import CustomCard from "../../components/CustomCard/customCard.component";
import { connect } from "react-redux";
import { milkSelector } from "../../redux/products/products.selector";
import { cartItemsSelector } from "../../redux/cart/cart.selector";
import { CircularProgress } from "@material-ui/core";
import "./add-Itempage.style.scss";
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
        {milk ? (
          milk.map(item => (
            <CustomCard
              group={item}
              key={item.name}
              cartItems={cartItems}
            ></CustomCard>
          ))
        ) : (
          <div id="additem-loading">
            <CircularProgress />
          </div>
        )}
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
