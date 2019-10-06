import React, { Component } from "react";
import { Paper, Box, Grid, Typography, Button, Fab } from "@material-ui/core";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import ShippingIcon from "@material-ui/icons/LocalShipping";

import CartSubItem from "../../components/cartSubItem/cartSubItem.component";
import { connect } from "react-redux";
import {
  setCartItems,
  addStock,
  removeStock
} from "../../redux/cart/cart.actions";
import {
  cartItemsSelector,
  totolSelector
} from "../../redux/cart/cart.selector";
// import { SET_CART } from "../../utils/actions/const";
const style = theme => ({
  root: {
    width: "100%",
    margin: 10,
    paddingBottom: 55,
    overflowY: "scroll"
  },
  paper: {
    marginTop: 90,
    padding: 15
  },
  totalTypo: {
    float: "right"
  },
  gridTitle: {
    paddingBottom: 24
  },
  addButton: {
    display: "flex",
    justifyContent: "center"
  },
  fab: {
    position: "absolute",
    bottom: 86,
    right: 29
  }
});
export class CartPage extends Component {
  handleAddStock = item => {
    this.props.addStock(item);
  };
  handleRemoveStock = item => {
    this.props.removeStock(item);
  };

  render() {
    const { classes, cartItems } = this.props;
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Box>
            <Grid className={classes.gridTitle} container>
              <Grid item xs={6}>
                <Typography variant="body1"> Cart</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="button" align="right" component="h2">
                  TOTAL: {this.props.total} RS
                </Typography>
              </Grid>
            </Grid>
            {cartItems.map(val => (
              <CartSubItem
                key={val.name}
                itemDetails={val}
                handleAddStock={this.handleAddStock}
                handleRemoveStock={this.handleRemoveStock}
              ></CartSubItem>
            ))}

            <Box className={classes.addButton}>
              <Button
                variant="text"
                color="primary"
                component={Link}
                to={"/console/add-items"}
              >
                Add Product
              </Button>
            </Box>
          </Box>
        </Paper>
        <Fab
          color="primary"
          aria-label="add"
          className={classes.fab}
          onClick={this.props.toggleProcessPageStatus}
        >
          <ShippingIcon />
        </Fab>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    cartItems: cartItemsSelector(state),
    total: totolSelector(state)
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setCart: items => dispatch(setCartItems(items)),
    addStock: item => dispatch(addStock(item)),
    removeStock: item => dispatch(removeStock(item))
  };
};
const CartPageStyle = withStyles(style)(CartPage);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartPageStyle);
