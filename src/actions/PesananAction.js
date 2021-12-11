import FIREBASE from "../config/FIREBASE";
import { dispatchError, dispatchLoading, dispatchSuccess } from "../utils";

export const GET_LIST_PESANAN = "GET_LIST_PESANAN";
export const UPDATE_PESANAN = "UPDATE_PESANAN";

export const getListPesanan = () => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_LIST_PESANAN);

    FIREBASE.database()
      .ref("histories")
      .once("value", (querySnapshot) => {
        //Hasil
        let data = querySnapshot.val();

        dispatchSuccess(dispatch, GET_LIST_PESANAN, data);
      })
      .catch((error) => {
        dispatchError(dispatch, GET_LIST_PESANAN, error);
        alert(error);
      });
  };
};

export const updatePesanan = (payload
  // , order_id, transaction_status
  ) => {
  return (dispatch) => {
    dispatchLoading(dispatch, UPDATE_PESANAN);
    // alert("hello")
    // const status =
    // transaction_status === "settlement" || transaction_status === "capture" ? "lunas" : transaction_status;
    

    FIREBASE.database()
      .ref("histories/"+payload.id)
      // .child(payload.id)
      .set(payload)
      .then((response) => {
        dispatchSuccess(dispatch, UPDATE_PESANAN, response ? response : []);
      })
      .catch((error) => {
        dispatchError(dispatch, UPDATE_PESANAN, error);
        alert(error);
      });
  };
};
