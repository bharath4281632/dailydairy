import { rxauth } from "./init.firebase";
import * as jwt_decoder from "jwt-decode";
import * as firebase from "firebase/app";
import "firebase/auth";

export function loginWithGmail() {
  const provider = new firebase.auth.GoogleAuthProvider();
  return rxauth().signInWithPopup(provider);
}
export function loginAnonymously() {
  return rxauth().signInAnonymously();
}
export function logoutUser() {
  return rxauth()
    .signOut()
    .then(() => localStorage.removeItem("token"));
}

export function currentUser() {
  let unix_epoch = Math.floor(new Date().getTime() / 1000.0);
  if (localStorage.getItem("token")) {
    var userInfo = jwt_decoder(localStorage.getItem("token"));
    if (userInfo.provider_id === "anonymous") return userInfo;
    if (userInfo.exp <= unix_epoch) {
      localStorage.removeItem("token");
      return false;
    } else if (userInfo.email) {
      return userInfo;
    }
  }
  localStorage.removeItem("token");
  return false;
}
