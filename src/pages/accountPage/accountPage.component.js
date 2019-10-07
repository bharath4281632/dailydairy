import React, { Component } from "react";
import {
  Paper,
  List,
  ListSubheader,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Switch
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import "./accountPage.style.scss";
import NotificationsIcon from "@material-ui/icons/Notifications";
// import WifiIcon from "@material-ui/icons/Wifi";
import HistoryIcon from "@material-ui/icons/History";
import ExitIcon from "@material-ui/icons/ExitToApp";
// import { connect } from "http2";
import { connect } from "react-redux";
import { currentUser } from "../../redux/user/user.selector";
import { logoutUser } from "../../firebase/auth.firebase";
// import { GoogleLogout } from "react-google-login";
const style = theme => ({
  paper: {
    width: "100%",
    margin: 12,
    marginBottom: 70
  },
  typo: {
    paddingTop: 15
  },
  bigAvatar: {
    margin: 10
  }
});

export class AccountPage extends Component {
  handleLoginOut = () => {
    try {
      logoutUser().then(() => this.props.history.replace("/login"));
    } catch (ex) {
      console.log(ex);
    }
  };
  render() {
    const { classes, userInfo } = this.props;
    return (
      <Paper id="account-paper">
        <Typography
          variant="h6"
          component="h2"
          align="center"
          className="header"
        >
          Profile Information
        </Typography>
        {userInfo.picture ? (
          <Avatar
            // alt="Remy Sharp"
            src={userInfo.picture}
            className="profile-avatar"
          />
        ) : (
          <Avatar className="profile-anon">ANONY</Avatar>
        )}
        <Typography variant="body1" component="h2" className="profile-name">
          {userInfo.name || "Anonymous User"}
        </Typography>
        <Typography variant="body2" component="h2" className="profile-email">
          {userInfo.email}
        </Typography>

        <div>
          <List
            subheader={<ListSubheader>Settings</ListSubheader>}
            className={classes.root}
          >
            <ListItem>
              <ListItemIcon>
                <NotificationsIcon />
              </ListItemIcon>
              <ListItemText primary="Notifications" />
              <ListItemSecondaryAction>
                <Switch
                  edge="end"
                  // onChange={handleToggle('bluetooth')}
                  // checked={checked.indexOf('bluetooth') !== -1}
                  inputProps={{
                    "aria-labelledby": "switch-list-label-bluetooth"
                  }}
                />
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <HistoryIcon />
              </ListItemIcon>
              <ListItemText primary="Purchase History" />
            </ListItem>
            <ListItem button onClick={this.handleLoginOut}>
              <ListItemIcon>
                <ExitIcon />
              </ListItemIcon>
              <ListItemText primary="LogOut" />
            </ListItem>
          </List>
        </div>
      </Paper>
    );
  }
}
const accountPageStyle = withStyles(style)(AccountPage);
const mapStateToProps = state => {
  return {
    userInfo: currentUser(state)
  };
};
export default connect(mapStateToProps)(accountPageStyle);
// export default withStyles(style)(AccountPage);
