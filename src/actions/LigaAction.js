import FIREBASE from "../config/FIREBASE";
import { dispatchError, dispatchLoading, dispatchSuccess } from "../utils";

export const GET_LIST_LIGA = "GET_LIST_LIGA";
export const TAMBAH_LIGA = "TAMBAH_LIGA";
export const GET_DETAIL_LIGA = "GET_DETAIL_LIGA";
export const UPDATE_LIGA = "UPDATE_LIGA";
export const DELETE_LIGA = "DELETE_LIGA";

export const getListLiga = () => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_LIST_LIGA);

    FIREBASE.database()
      .ref("ligas")
      .once("value", (querySnapshot) => {
        //Hasil
        let data = querySnapshot.val();

        dispatchSuccess(dispatch, GET_LIST_LIGA, data);
      })
      .catch((error) => {
        dispatchError(dispatch, GET_LIST_LIGA, error);
        alert(error);
      });
  };
};

export const getDetailLiga = (id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_DETAIL_LIGA);

    FIREBASE.database()
      .ref("ligas/" + id)
      .once("value", (querySnapshot) => {
        //Hasil
        let data = querySnapshot.val();

        dispatchSuccess(dispatch, GET_DETAIL_LIGA, data);
      })
      .catch((error) => {
        dispatchError(dispatch, GET_DETAIL_LIGA, error);
        alert(error);
      });
  };
};

export const tambahLiga = (data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, TAMBAH_LIGA);

    //upload ke storage firebase
    var uploadTask = FIREBASE.storage()
      .ref("ligas")
      .child(data.imageToDB.name)
      .put(data.imageToDB);

    uploadTask.on(
      "state_changed",
      function (snapshot) {
        console.log(snapshot);
      },
      function (error) {
        console.log(error);
      },
      function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          const dataBaru = {
            namaLiga: data.namaLiga,
            image: downloadURL,
          };

          FIREBASE.database()
            .ref("ligas")
            .push(dataBaru)
            .then((response) => {
              dispatchSuccess(dispatch, TAMBAH_LIGA, response ? response : []);
            })
            .catch((error) => {
              dispatchError(dispatch, TAMBAH_LIGA, error);
              alert(error);
            });
        });
      }
    );
  };
};

export const updateLiga = (data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, UPDATE_LIGA);

    //Cek apakah gambar diganti
    if (data.imageToDB) {
      //ambil file gambar lama dari firebase storage
      var desertRef = FIREBASE.storage().refFromURL(data.imageLama);

      // hapus gambar lama dari firebase storage
      desertRef
        .delete()
        .then(function () {
          //upload gambar yang baru
          var uploadTask = FIREBASE.storage()
            .ref("ligas")
            .child(data.imageToDB.name)
            .put(data.imageToDB);

          uploadTask.on(
            "state_changed",
            function (snapshot) {
              console.log(snapshot);
            },
            function (error) {
              console.log(error);
            },
            function () {
              uploadTask.snapshot.ref
                .getDownloadURL()
                .then(function (downloadURL) {
                  const dataBaru = {
                    namaLiga: data.namaLiga,
                    image: downloadURL,
                  };

                  FIREBASE.database()
                    .ref("ligas/" + data.id)
                    .update(dataBaru)
                    .then((response) => {
                      dispatchSuccess(
                        dispatch,
                        UPDATE_LIGA,
                        response ? response : []
                      );
                    })
                    .catch((error) => {
                      dispatchError(dispatch, UPDATE_LIGA, error);
                      alert(error);
                    });
                });
            }
          );
        })
        .catch(function (error) {
          dispatchError(dispatch, UPDATE_LIGA, error);
          alert(error);
        });
    } else {
      const dataBaru = {
        namaLiga: data.namaLiga,
        image: data.image,
      };

      FIREBASE.database()
        .ref("ligas/" + data.id)
        .update(dataBaru)
        .then((response) => {
          dispatchSuccess(dispatch, UPDATE_LIGA, response ? response : []);
        })
        .catch((error) => {
          dispatchError(dispatch, UPDATE_LIGA, error);
          alert(error);
        });
    }
  };
};

export const deleteLiga = (image, id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, DELETE_LIGA);

    //Hapus gambar dari storage
    var desertRef = FIREBASE.storage().refFromURL(image);

    // Delete the file
    desertRef
      .delete()
      .then(function () {
        //hapus juga data di realtime database
        FIREBASE.database()
          .ref("ligas/" + id)
          .remove()
          .then(() => {
            dispatchSuccess(dispatch, DELETE_LIGA, "Liga Sukses Dihapus");
          })
          .catch((error) => {
            dispatchError(dispatch, DELETE_LIGA, error);
            alert(error);
          });
      })
      .catch(function (error) {
        // Uh-oh, an error occurred!
        dispatchError(dispatch, DELETE_LIGA, error);
        alert(error);
      });
  };
};
