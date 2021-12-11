import swal from "sweetalert";
import FIREBASE from "../config/FIREBASE";
import { dispatchError, dispatchLoading, dispatchSuccess } from "../utils";

export const LOGIN_USER = "LOGIN_USER";
export const CHECK_LOGIN = "CHECK_LOGIN";
export const LOGOUT = "LOGOUT"

export const loginUser = (email, password) => {
  return (dispatch) => {
    dispatchLoading(dispatch, LOGIN_USER);

    FIREBASE.auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        FIREBASE.database()
          .ref(`users/${res.user.uid}`)
          .once("value")
          .then((resDB) => {
            // Signed in
            if (resDB.val()) {
              if (resDB.val().status === "admin") {
                window.localStorage.setItem(
                  "user",
                  JSON.stringify(resDB.val())
                );
                dispatchSuccess(dispatch, LOGIN_USER, resDB.val());
              } else {
                dispatchError(dispatch, LOGIN_USER, "Anda Bukan Admin");
                swal("Failed", "Anda Bukan Admin", "error");
              }
            }
          })
          .catch((error) => {
            dispatchError(dispatch, LOGIN_USER, error);
            swal("Failed", error, "error");
          });
      })
      .catch((error) => {
        var errorMessage = error.message;

        dispatchError(dispatch, LOGIN_USER, errorMessage);
        swal("Failed", errorMessage, "error");
      });
  };
};

export const checkLogin = (history) => {
  return (dispatch) => {
    dispatchLoading(dispatch, CHECK_LOGIN);

    if (window.localStorage.getItem("user")) {
      const user = JSON.parse(window.localStorage.getItem("user"));

      FIREBASE.database()
        .ref(`users/${user.uid}`)
        .once("value")
        .then((resDB) => {
          if (resDB.val()) {
            if (resDB.val().status === "admin") {
              dispatchSuccess(dispatch, CHECK_LOGIN, resDB.val());
            } else {
              dispatchError(dispatch, CHECK_LOGIN, "Anda Bukan Admin");
              history.push({ pathname: "/login" });
            }
          } else {
            dispatchError(dispatch, CHECK_LOGIN, "Anda Bukan Admin");
            history.push({ pathname: "/login" });
          }
        })
        .catch((error) => {
          dispatchError(dispatch, CHECK_LOGIN, error);
          history.push({ pathname: "/login" });
        });
    } else {
      dispatchError(dispatch, CHECK_LOGIN, "Belum Login");
      history.push({ pathname: "/login" });
    }
  };
};


export const logOutUser = (history) => {
  return (dispatch) => {

    dispatchLoading(dispatch, LOGOUT);

    FIREBASE.auth().signOut()
      .then((res) => {

        window.localStorage.removeItem('user');
        dispatchSuccess(dispatch, LOGOUT, res);
        history.push({pathname: '/login'})

      })
      .catch((error) => {

        dispatchError(dispatch, LOGOUT, error.message);
        swal('Failed!', error.message, "error");


      })

  }
}