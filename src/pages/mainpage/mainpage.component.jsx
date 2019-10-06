import React, { Component } from "react";
import { connect } from "react-redux";
import { getFirebase } from "../../firebase/db.firebase";
import { setProducts } from "../../redux/products/products.actions";
// import React, { Component } from "react";
import { Switch, Link, Redirect } from "react-router-dom";

import CartPage from "../cartpage/cartpage.component";
import AddItemsPage from "../add-Itemspage/add-itempage.component";
import ProcessPage from "../processpage/processpage.component";

//Material Ui component
import { withStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import AddIcon from "@material-ui/icons/Add";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ProtectedRoute from "../../services/protectedRoute.service";
import AccountPage from "../accountPage/accountPage.component";

import "./mainpage.style.scss";
// import { connect } from "react-redux";
const style = theme => ({
  root: {
    position: "relative",
    display: "flex",
    background: "#e4e4e4",
    width: "100%",
    height: "100vh"
  },
  bottomNav: {
    position: "fixed",
    bottom: 0,
    width: "100%"
  }
});
class MainPage extends Component {
  state = {
    processPageStatus: true
  };
  componentDidMount() {
    this.product();
  }
  toggleProcessPageStatus = () => {
    this.setState({ processPageStatus: !this.state.processPageStatus });
  };
  product = async () => {
    try {
      const resp = await getFirebase("/products");
      let result = {};
      for (const [key, value] of Object.entries(resp.val())) {
        let temp = value.filter(item => {
          item.catagory = item.catagory.filter(type => {
            type.purchase = 1;
            return type.availability && type.stock !== 0;
          });
          return item.catagory.length !== 0;
        });
        result[key] = temp;
      }
      this.props.setProducts(result);
    } catch (ex) {
      console.log(ex.message);
    }
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Switch>
          <ProtectedRoute
            path="/console/process-cart"
            component={AccountPage}
          />
          <ProtectedRoute path="/console/add-items" component={AddItemsPage} />
          <ProtectedRoute
            path="/console/cart"
            component={CartPage}
            toggleProcessPageStatus={this.toggleProcessPageStatus}
          />
          <Redirect exact={true} from="/" to="/console/cart" />
          <Redirect to="/not-found" />
        </Switch>
        <ProcessPage
          toggleProcessPageStatus={this.toggleProcessPageStatus}
          hidden={this.state.processPageStatus}
        ></ProcessPage>
        <BottomNavigation
          value={this.props.location.pathname}
          classes={{ root: classes.bottomNav }}
        >
          <BottomNavigationAction
            label="Add Items"
            icon={<AddIcon />}
            component={Link}
            to={"/console/add-items"}
            value={"/console/add-items"}
          />
          <BottomNavigationAction
            label="Cart"
            icon={<ShoppingCartIcon />}
            component={Link}
            to={"/console/cart"}
            value={"/console/cart"}
          />
          <BottomNavigationAction
            label="UserItem"
            icon={<AccountCircle />}
            component={Link}
            to={"/console/process-cart"}
            value={"/console/process-cart"}
          />
        </BottomNavigation>
      </div>
    );
  }
}
const mainStyle = withStyles(style)(MainPage);

// const mapStateToProps = state => {
//   return {
//     products: state.products
//   };
// };
const mapDispatchToProps = dispatch => {
  return {
    setProducts: products => dispatch(setProducts(products)),
    addStock: () => dispatch({ type: "INCREASE_STOCK" })
  };
};

export default connect(
  // mapStateToProps,
  null,
  mapDispatchToProps
)(mainStyle);
