// import libs
import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

// Define action creators
export const { Types, Creators } = createActions({
  signIn: ['loginInfo'],
  signInSuccess: null,
  signInFailed: null,
  logOut: null,
  logOutSuccess: null,
  logOutFailed: null
});

// Initial state
export const INITIAL_STATE = Immutable({
  userInfo: {},
  isProcessing: false,
  errors: '',
  type: '',
  token: '',
  accountInfo: {}
});

const signIn = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type,
    errors: ''
  });
};

const signInSuccess = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
    token: action.data.access_token,
    accountInfo: action.data.user,
    errors: ''
  });
};

const signInFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type,
    errors: action.errors
  });
};

const logOut = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type
  });
};

const logOutSuccess = state => {
  return state.merge({
    ...INITIAL_STATE
  });
};
const logOutFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type
  });
};

// Assign handler to types.
const HANDLERS = {
  [Types.SIGN_IN]: signIn,
  [Types.SIGN_IN_SUCCESS]: signInSuccess,
  [Types.SIGN_IN_FAILED]: signInFailed,
  [Types.LOG_OUT]: logOut,
  [Types.LOG_OUT_SUCCESS]: logOutSuccess,
  [Types.LOG_OUT_FAILED]: logOutFailed
};

// Create reducers by pass state and handlers
export const accountReducer = createReducer(INITIAL_STATE, HANDLERS);
