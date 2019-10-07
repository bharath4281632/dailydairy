import React, { Component } from "react";

import { connect } from "react-redux";
// import {
//   LOGIN_ANONYMOUSLY,
//   LOGIN_WITH_GMAIL,
//   SET_CURRENT_USER
// } from "../../utils/actions/const";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/core/styles";

import "./loginpage.style.scss";
import {
  loginWithGmail,
  currentUser,
  loginAnonymously
} from "../../firebase/auth.firebase";
import {
  setCurrentUser,
  setAnonymous,
  setAdmin
} from "../../redux/user/user.actions";
import { checkAnonymously } from "../../services/userAuth.service";
// import { create } from "handlebars";
import { getFirebase, setFirebase } from "../../firebase/db.firebase";
// import GoogleLogin from "react-google-login";
// import { urlGoogle } from "../../googleapis/auth.services";
const styles = {
  label: {
    textTransform: "none",
    width: 190,
    background: "#2680EB",
    "&:hover": {
      background: "#2680EB"
    }
  }
};

class Login extends Component {
  componentDidMount() {}
  login = async () => {
    try {
      const response = await loginWithGmail();
      const {
        uid,
        displayName,
        email,
        emailVerified,
        phoneNumber,
        isAnonymous,
        photoURL
      } = response.user;
      const userToken = await response.user.getIdToken();
      localStorage.setItem("token", userToken);
      // console.log(uid);
      const userExistance = await getFirebase("/users/" + uid);
      console.log(userExistance.val());
      let isAdmin;
      if (!userExistance.val()) {
        isAdmin = false;
        setFirebase("/users/" + uid, {
          displayName,
          email,
          emailVerified,
          phoneNumber,
          isAnonymous,
          photoURL,
          isAdmin: false
        });
      } else {
        isAdmin = userExistance.val().isAdmin || false;
        this.props.adminStatus(isAdmin);
      }
      console.log(isAdmin, "isAdmin status");
      const userInfo = currentUser();
      this.props.setCurrentUser(userInfo);
      this.props.setAnonymous(checkAnonymously(userInfo));
      this.props.history.replace("/console/cart");
    } catch (ex) {
      console.log(ex.message);
    }
  };
  anonymously = async () => {
    try {
      const resp = await loginAnonymously();
      const userToken = await resp.user.getIdToken();
      localStorage.setItem("token", userToken);
      const userInfo = currentUser();
      this.props.setCurrentUser(userInfo);
    } catch (ex) {
      console.log(ex.message);
    }
  };
  googleLogin = () => {
    this.login();
    // this.props.loginWithGmail(this.props);
  };
  anonymousLogin = () => {
    this.anonymously().then(() => this.props.history.replace("/console/cart"));
    // this.props.loginAnonymously(this.props);
  };

  render() {
    const { classes } = this.props;
    return (
      <div id="home">
        <Typography variant="h1" component="h2" className="title-home">
          <div>
            Da<span className="upper">iry</span>
            <span className="lower">Daily</span>
          </div>
        </Typography>
        <div className="login-area-home">
          <Button
            color="primary"
            variant="contained"
            classes={{
              containedPrimary: classes.label
              // colorInherit: classes.label
            }}
            onClick={this.googleLogin}
            // href={urlGoogle()}
          >
            Login with Google
          </Button>
          {/* <GoogleLogin
            clientId="821757378934-tnne7b30u5l21v40s2fp3gnjargirkt8.apps.googleusercontent.com"
            buttonText="Login With Google"
            onSuccess={this.login}
            onFailure={() => console.log("login Fails")}
            cookiePolicy={"single_host_origin"}
          /> */}
          <div className="or-home">
            <Divider></Divider>
            <Typography variant="body1">Or</Typography>
            <Divider></Divider>
          </div>
          <div className="later-home">
            <Button variant="text" onClick={this.anonymousLogin}>
              Sign-In Later
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setCurrentUser: userInfo => dispatch(setCurrentUser(userInfo)),
    setAnonymous: status => dispatch(setAnonymous(status)),
    adminStatus: status => dispatch(setAdmin(status))
  };
};
const loginStyle = withStyles(styles)(Login);
export default connect(
  null,
  mapDispatchToProps
)(loginStyle);
// export default connect()loginStyle;
