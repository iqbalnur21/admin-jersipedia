import {
  GET_LIST_JERSEY,
  UPLOAD_JERSEY,
  TAMBAH_JERSEY,
  GET_DETAIL_JERSEY,
  UPDATE_JERSEY,
  DELETE_JERSEY,
} from "../../actions/JerseyAction";

const initialState = {
  getListJerseyLoading: false,
  getListJerseyResult: false,
  getListJerseyError: false,

  uploadJerseyLoading: false,
  uploadJerseyResult: false,
  uploadJerseyError: false,

  tambahJerseyLoading: false,
  tambahJerseyResult: false,
  tambahJerseyError: false,

  getDetailJerseyLoading: false,
  getDetailJerseyResult: false,
  getDetailJerseyError: false,

  updateJerseyLoading: false,
  updateJerseyResult: false,
  updateJerseyError: false,

  deleteJerseyLoading: false,
  deleteJerseyResult: false,
  deleteJerseyError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LIST_JERSEY:
      return {
        ...state,
        getListJerseyLoading: action.payload.loading,
        getListJerseyResult: action.payload.data,
        getListJerseyError: action.payload.errorMessage,
      };

    case UPLOAD_JERSEY:
      return {
        ...state,
        uploadJerseyLoading: action.payload.loading,
        uploadJerseyResult: action.payload.data,
        uploadJerseyError: action.payload.errorMessage,
      };

    case TAMBAH_JERSEY:
      return {
        ...state,
        tambahJerseyLoading: action.payload.loading,
        tambahJerseyResult: action.payload.data,
        tambahJerseyError: action.payload.errorMessage,
      };

    case GET_DETAIL_JERSEY:
      return {
        ...state,
        getDetailJerseyLoading: action.payload.loading,
        getDetailJerseyResult: action.payload.data,
        getDetailJerseyError: action.payload.errorMessage,
      };

    case UPDATE_JERSEY:
      return {
        ...state,
        updateJerseyLoading: action.payload.loading,
        updateJerseyResult: action.payload.data,
        updateJerseyError: action.payload.errorMessage,
      };

    case DELETE_JERSEY:
      return {
        ...state,
        deleteJerseyLoading: action.payload.loading,
        deleteJerseyResult: action.payload.data,
        deleteJerseyError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
