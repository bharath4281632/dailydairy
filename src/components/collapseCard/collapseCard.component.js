import React, { useState, useEffect } from "react";
import ColorBox from "../colorBox/colorBox.component";

import { makeStyles } from "@material-ui/core/styles";

//Material Ui components
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AddShoppingCart from "@material-ui/icons/AddShoppingCart";
import RemoveShoppingCart from "@material-ui/icons/RemoveShoppingCart";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import { capitalizeFist } from "../../services/pre-processor.service";

const useStyles = makeStyles(theme => ({
  root: {
    padding: "4px 0"
  },
  divider: {
    marginTop: 10
  },
  RemoveCart: {
    color: "blue"
  },
  subTitleColor: {
    color: "rgba(0, 0, 0, 0.6)"
  }
}));
function CollapseCard({ product, handleAdditem, cartStatus }) {
  const classes = useStyles();
  const [cartState, setCartState] = useState(false);
  const { name, color, quantity, rate } = product;
  useEffect(() => {
    setCartState(cartStatus);
    return () => {};
  }, [cartStatus]);

  return (
    <div className={classes.root}>
      <Grid container justify="space-between" alignItems="center">
        <Grid item xs={2}>
          <ColorBox color={color} size={31}></ColorBox>
        </Grid>
        <Grid item xs={8}>
          <Typography component="h2" variant="subtitle1">
            {capitalizeFist(name)}
          </Typography>
          <Typography
            component="h2"
            variant="caption"
            className={classes.subTitleColor}
          >
            Rate Rs {rate} / {quantity}ml
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <IconButton onClick={() => handleAdditem(product)}>
            {cartState ? (
              <RemoveShoppingCart
                className={classes.RemoveCart}
              ></RemoveShoppingCart>
            ) : (
              <AddShoppingCart />
            )}
          </IconButton>
        </Grid>
      </Grid>
      <Divider className={classes.divider} />
    </div>
  );
}

export default CollapseCard;
