import FIREBASE from "../config/FIREBASE";
import { dispatchError, dispatchLoading, dispatchSuccess } from "../utils";

export const GET_LIST_JERSEY = "GET_LIST_JERSEY";
export const UPLOAD_JERSEY = "UPLOAD_JERSEY";
export const TAMBAH_JERSEY = "TAMBAH_JERSEY";
export const GET_DETAIL_JERSEY = "GET_DETAIL_JERSEY";
export const UPDATE_JERSEY = "UPDATE_JERSEY";
export const DELETE_JERSEY = "DELETE_JERSEY";

export const getListJersey = () => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_LIST_JERSEY);

    FIREBASE.database()
      .ref("jerseys")
      .once("value", (querySnapshot) => {
        //Hasil
        let data = querySnapshot.val();

        dispatchSuccess(dispatch, GET_LIST_JERSEY, data);
      })
      .catch((error) => {
        dispatchError(dispatch, GET_LIST_JERSEY, error);
        alert(error);
      });
  };
};

export const getDetailJersey = (id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_DETAIL_JERSEY);

    FIREBASE.database()
      .ref("jerseys/" + id)
      .once("value", (querySnapshot) => {
        //Hasil
        let data = querySnapshot.val();

        dispatchSuccess(dispatch, GET_DETAIL_JERSEY, data);
      })
      .catch((error) => {
        dispatchError(dispatch, GET_DETAIL_JERSEY, error);
        alert(error);
      });
  };
};

export const uploadJersey = (gambar, imageToDB) => {
  return (dispatch) => {
    dispatchLoading(dispatch, UPLOAD_JERSEY);

    //upload ke storage firebase
    var uploadTask = FIREBASE.storage()
      .ref("jerseys")
      .child(gambar.name)
      .put(gambar);

    uploadTask.on(
      "state_changed",
      function (snapshot) {
        console.log(snapshot);
      },
      function (error) {
        dispatchError(dispatch, UPLOAD_JERSEY, error);
      },
      function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          const dataBaru = {
            image: downloadURL,
            imageToDB: imageToDB,
          };

          dispatchSuccess(dispatch, UPLOAD_JERSEY, dataBaru);
        });
      }
    );
  };
};

export const tambahJersey = (data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, TAMBAH_JERSEY);

    const dataBaru = {
      gambar: [data.imageToDB1, data.imageToDB2],
      nama: data.nama,
      harga: data.harga,
      berat: data.berat,
      jenis: data.jenis,
      ready: data.ready,
      ukuran: data.ukuranSelected,
      liga: data.liga,
    };

    FIREBASE.database()
      .ref("jerseys")
      .push(dataBaru)
      .then((response) => {
        dispatchSuccess(dispatch, TAMBAH_JERSEY, response);
      })
      .catch((error) => {
        dispatchError(dispatch, TAMBAH_JERSEY, error);
        alert(error);
      });
  };
};

export const updateJersey = (data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, UPDATE_JERSEY);

    const dataBaru = {
      gambar: [
        data.imageToDB1 ? data.imageToDB1 : data.imageLama1,
        data.imageToDB2 ? data.imageToDB2 : data.imageLama2,
      ],
      nama: data.nama,
      harga: data.harga,
      berat: data.berat,
      jenis: data.jenis,
      ready: data.ready,
      ukuran: data.ukuranSelected,
      liga: data.liga,
    };

    FIREBASE.database()
      .ref("jerseys/"+data.id)
      .update(dataBaru)
      .then((response) => {

        if(data.imageToDB1) {
          var desertRef = FIREBASE.storage().refFromURL(data.imageLama1);
          desertRef
            .delete()
            .catch(function (error) {
              dispatchError(dispatch, UPDATE_JERSEY, error);
            })
        }

        if(data.imageToDB2) {
          var desertRef2 = FIREBASE.storage().refFromURL(data.imageLama2);
          desertRef2
            .delete()
            .catch(function (error) {
              dispatchError(dispatch, UPDATE_JERSEY, error);
            })
        }

        dispatchSuccess(dispatch, UPDATE_JERSEY, "Update Jersey Sukses");
      })
      .catch((error) => {
        dispatchError(dispatch, UPDATE_JERSEY, error);
        alert(error);
      });
  };
};

export const deleteJersey = (images, id) => {
  return (dispatch) => {

    dispatchLoading(dispatch, DELETE_JERSEY);

    var desertRef = FIREBASE.storage().refFromURL(images[0]);
    desertRef
      .delete()
      .then(function() {

        var desertRef2 = FIREBASE.storage().refFromURL(images[1]);

        desertRef2
          .delete()
          .then(function() {

            //hapus realtime database
            FIREBASE.database().ref('jerseys/'+id).remove()
              .then(function() {
                dispatchSuccess(dispatch, DELETE_JERSEY, "Jersey Berhasil di Hapus")
              })
              .catch(function (error) {
                dispatchError(dispatch, DELETE_JERSEY, error);
              })

          })
          .catch(function (error) {
            dispatchError(dispatch, DELETE_JERSEY, error);
          })

      })
      .catch(function (error) {
        dispatchError(dispatch, DELETE_JERSEY, error);
      })

  }
}
