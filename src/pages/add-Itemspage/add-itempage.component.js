import React, { Component } from "react";
import CustomCard from "../../components/CustomCard/customCard.component";
import { connect } from "react-redux";
import { milkSelector } from "../../redux/products/products.selector";
import { cartItemsSelector } from "../../redux/cart/cart.selector";
import AddIcons from "@material-ui/icons/Add";
import {
  CircularProgress,
  Card,
  CardActionArea,
  Typography
} from "@material-ui/core";
import "./add-Itempage.style.scss";
import { isAdminSelector } from "../../redux/user/user.selector";
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
          <div>
            {milk.map(item => (
              <CustomCard
                group={item}
                key={item.name}
                cartItems={cartItems}
              ></CustomCard>
            ))}
            <Card id="add-new-card" hidden={!this.props.isAdmin}>
              <CardActionArea>
                <div className="icons">
                  <AddIcons
                    style={{ color: "white", margin: "auto" }}
                  ></AddIcons>
                </div>
                <Typography
                  variant="caption"
                  component="h2"
                  align="center"
                  style={{ color: "white" }}
                  gutterBottom
                >
                  Add New Product
                </Typography>
              </CardActionArea>
            </Card>
          </div>
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
    cartItems: cartItemsSelector(state),
    isAdmin: isAdminSelector(state)
  };
};

export default connect(mapStateToProps)(AddItemPage);
