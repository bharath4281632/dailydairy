import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import MainPage from "./pages/mainpage/mainpage.component";
import LoginPage from "./pages/loginpage/loginpage.component";
import NotFoundPage from "./pages/notfoundpage/notfoundpage.component";

import ProtectedRoute from "./services/protectedRoute.service";
import DesktopPage from "./pages/desktoppage/desktoppage.component";
import { isMobileDevice } from "./services/pre-processor.service";
import { currentUser } from "./firebase/auth.firebase";
import { setCurrentUser, setAnonymous } from "./redux/user/user.actions";
import { connect } from "react-redux";
import { checkAnonymously } from "./services/userAuth.service";
// import { connect } from "react-redux";
// import { SET_CURRENT_USER } from "./utils/actions/const";

class App extends React.Component {
  state = {
    isMobile: false
  };

  componentDidMount() {
    this.setState({ isMobile: isMobileDevice() });
    let userInfo = currentUser() || null;
    this.props.setCurrentUser(userInfo);
    this.props.setAnonymous(checkAnonymously(userInfo));
  }

  render() {
    return (
      <BrowserRouter>
        <div style={{ height: "100%" }}>
          {this.state.isMobile ? (
            <Switch>
              <Route path="/login" component={LoginPage} />
              <ProtectedRoute path="/console" component={MainPage} />
              <Redirect exact={true} from="/" to="/console/cart" />
              <Route path="/not-found" component={NotFoundPage} />
              <Redirect to="/not-found" />
            </Switch>
          ) : (
            <DesktopPage></DesktopPage>
          )}
        </div>
      </BrowserRouter>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setCurrentUser: userInfo => dispatch(setCurrentUser(userInfo)),
    setAnonymous: status => dispatch(setAnonymous(status))
  };
};
export default connect(
  null,
  mapDispatchToProps
)(App);
