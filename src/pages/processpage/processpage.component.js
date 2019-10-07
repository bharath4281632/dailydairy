import React, { useState } from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import BackSpaceIcon from "@material-ui/icons/ArrowBack";
import { deliveryInfoSelector } from "../../redux/user/user.selector";
import { setDelivery } from "../../redux/user/user.actions";
import { schema, inputField } from "./processpage.util";
import "./processpage.style.scss";
import { totolSelector } from "../../redux/cart/cart.selector";
const useStyle = makeStyles(theme => ({
  textField: {
    paddingBottom: 10
  },
  button: {
    color: "black",
    marginBottom: 10
  },
  icons: {
    paddingRight: 5,
    width: 16,
    height: 16
  },
  submitButton: {
    display: "flex",
    justifyContent: "center",
    paddingTop: 10
  }
}));

const ProcessPage = ({
  toggleProcessPageStatus,
  hidden,
  delivery,
  addDelivery,
  total
}) => {
  const classes = useStyle();

  const [deliveryInfo, setDeliveryInfo] = useState({
    name: "",
    address: "",
    apartmentName: "",
    phoneNo: "",
    isCashOnDelivery: false
  });

  const [errors, setErrors] = useState({});

  const handleInputField = (e, values) => {
    let delivery = { ...deliveryInfo };
    let { value, name } = e.currentTarget;
    if (typeof values === "boolean") {
      name = "isCashOnDelivery";
      value = values;
    }
    delivery[name] = value;
    setDeliveryInfo(delivery);
  };

  const handleSubmitEvent = e => {
    e.preventDefault();
    let result = schema.validate(deliveryInfo, {
      abortEarly: false
    });
    let valiation = {};
    if (result.error) {
      result.error.details.map(err => {
        valiation[err.context.label] = err.message;
      });
    } else {
      addDelivery(result.value);
    }
    setErrors(valiation);
  };
  console.log(delivery);
  return (
    <Box hidden={hidden} id="processpage-component">
      <Paper id="process-paper">
        <Button
          variant="text"
          color="default"
          className={classes.button}
          onClick={toggleProcessPageStatus}
        >
          <BackSpaceIcon classes={{ root: classes.icons }}></BackSpaceIcon>back
        </Button>

        <form onSubmit={handleSubmitEvent}>
          {inputField.map(field => (
            <FormControl
              fullWidth
              className={classes.textField}
              key={field.name}
            >
              <TextField
                label={field.label}
                name={field.name}
                value={deliveryInfo[field.name]}
                multiline={field.name === "address" ? true : false}
                rows={field.rows}
                variant="filled"
                onChange={handleInputField}
              />
              <FormHelperText error={errors[field.name] ? true : false}>
                {errors[field.name]}
              </FormHelperText>
            </FormControl>
          ))}

          <FormGroup row className={classes.textField}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={deliveryInfo.isCashOnDelivery}
                  value="checkedA"
                  color="primary"
                  onChange={handleInputField}
                />
              }
              label="Cash on delivery"
            />
          </FormGroup>
          <div className="payment-amount">
            Total Amount to be payed <span>{total} Rs</span>
          </div>
          <div className={classes.submitButton}>
            <Button
              variant="contained"
              color="primary"
              style={{ width: 175 }}
              type="submit"
            >
              Pay now
            </Button>
          </div>
        </form>
      </Paper>
    </Box>
  );
};
const mapStateToProps = state => {
  return {
    delivery: deliveryInfoSelector(state),
    total: totolSelector(state)
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addDelivery: info => dispatch(setDelivery(info))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProcessPage);
