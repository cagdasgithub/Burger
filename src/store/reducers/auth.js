import { updateObject } from "../utility";
import * as actionTypes from "../actions/actionTypes";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  redirectURL: "/"
};

export const authStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};

export const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.idToken,
    userId: action.userId,
    error: null,
    loading: false
  });
};

export const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export const authLogout = (state, action) => {
  return updateObject(state, { token: null, userId: null });
};

export const setAuthRedirect = (state, action) => {
  return updateObject(state, { redirectURL: action.redirectURL });
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.SET_AUTH_REDIRECT:
      return setAuthRedirect(state, action);
    default:
      return state;
  }
};

export default reducer;
