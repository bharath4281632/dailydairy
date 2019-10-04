import React, { Component } from "react";
import clsx from "clsx";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Box from "@material-ui/core/Box";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";
// import Collapse from "@material-ui/core/Collapse";

import ColorBox from "../colorBox/colorBox.component";
import CollapseCard from "../collapseCard/collapseCard.component";
// import { ADD_TO_CART, REMOVE_FROM_CART } from "../../utils/actions/const";
import { isValeInArray } from "../../services/pre-processor.service";
import { addCartItem, removeCartitem } from "../../redux/cart/cart.actions";
import { cartItemsSelector } from "../../redux/cart/cart.selector";
// import moduleName from 'module'
const style = theme => ({
  card: {
    minWidth: "95vw",
    margin: "12px 10px"
  },
  cardContent: {
    paddingBottom: 0,
    paddingTop: 10,
    paddingRight: 13
  },
  subTitle: {
    color: "rgba(0, 0, 0, 0.6)",
    fontSize: 11,
    letterSpacing: 0.37
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  cardMedia: {
    height: 95
  },
  collapseCard: {
    paddingRight: 6
  },
  available: { display: "flex" }
});
export class CustomCard extends Component {
  state = {
    expand: true,
    cartItems: []
  };

  handleExpandClick = () => {
    this.setState({ expand: !this.state.expand });
  };
  handleAdditem = item => {
    let cartItems = [...this.props.cartItems];
    if (!isValeInArray(cartItems, item)) {
      this.props.addCartItem(item);
    } else {
      this.props.removeCartitem(item);
    }
  };
  render() {
    const {
      card,
      cardMedia,
      cardContent,
      subTitle,
      expand,
      expandOpen,
      available,
      collapseCard
    } = this.props.classes;
    const { name, imageUrl, catagory } = this.props.group;

    return (
      <div>
        <Card className={card}>
          <CardActionArea onClick={this.handleExpandClick}>
            <Grid container>
              <Grid item xs={6}>
                <CardMedia className={cardMedia} image={imageUrl}></CardMedia>
              </Grid>
              <Grid item xs={6}>
                <CardContent className={cardContent}>
                  <Typography variant="h5">{name}</Typography>
                  <Typography
                    variant="caption"
                    className={subTitle}
                    gutterBottom
                    component="h2"
                  >
                    Starts at Rs 23 / 500ml
                  </Typography>
                  <Typography variant="caption" component="h2">
                    Availability:
                  </Typography>
                  <Box className={available}>
                    {catagory.map(types => (
                      <ColorBox
                        key={types.color}
                        color={types.color}
                        size={21}
                      ></ColorBox>
                    ))}
                  </Box>
                </CardContent>
                <CardActions disableSpacing>
                  <Box
                    className={clsx(expand, {
                      [expandOpen]: this.state.expand
                    })}
                    onClick={this.handleExpandClick}
                    aria-expanded={this.state.expand}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </Box>
                </CardActions>
              </Grid>
            </Grid>
          </CardActionArea>

          <CardContent className={collapseCard} hidden={this.state.expand}>
            {catagory.map(types => (
              <CollapseCard
                key={types.name}
                cartStatus={isValeInArray(this.props.cartItems, types)}
                product={types}
                handleAdditem={this.handleAdditem}
              ></CollapseCard>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    cartItems: cartItemsSelector(state)
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addCartItem: item => dispatch(addCartItem(item)),
    removeCartitem: item => dispatch(removeCartitem(item))
  };
};
const CustomCardStyle = withStyles(style)(CustomCard);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomCardStyle);
