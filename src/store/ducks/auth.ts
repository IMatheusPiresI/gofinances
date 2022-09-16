// Action Types

import { IAuthData } from "../../@types";

export const Types = {
  LOGIN_GOOGLE: "AUTH/LOGIN_GOOGLE",
  LOGOUT: "AUTH/LOGOUT",
};

// Reducer

const initialState: IAuthData = {
  user: {
    id: "",
    name: "",
    email: "",
    photo: null,
  },
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case Types.LOGIN_GOOGLE:
      return (state = action.payload);

    case Types.LOGOUT:
      return (state = initialState);

    default:
      return state;
  }
}

// Action Creators

export const Creators = {
  login: (login: IAuthData) => ({
    type: Types.LOGIN_GOOGLE,
    payload: {
      login,
    },
  }),

  logout: () => ({
    type: Types.LOGOUT,
  }),
};
