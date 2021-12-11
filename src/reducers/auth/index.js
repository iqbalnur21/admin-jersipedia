import { LOGIN_USER, CHECK_LOGIN, LOGOUT } from "../../actions/AuthAction";

const initialState = {
  loginLoading: false,
  loginResult: false,
  loginError: false,

  checkLoginLoading: false,
  checkLoginResult: false,
  checkLoginError: false,

  logOutLoading: false,
  logOutResult: false,
  logOutError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        loginLoading: action.payload.loading,
        loginResult: action.payload.data,
        loginError: action.payload.errorMessage,
      };

    case CHECK_LOGIN:
      return {
        ...state,
        checkLoginLoading: action.payload.loading,
        checkLoginResult: action.payload.data,
        checkLoginError: action.payload.errorMessage,
      };

    case LOGOUT:
      return {
        ...state,
        logOutLoading: action.payload.loading,
        logOutResult: action.payload.data,
        logOutError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
