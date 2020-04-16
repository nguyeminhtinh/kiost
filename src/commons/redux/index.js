// import libs
import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

// Define action creators
export const { Types, Creators } = createActions({
  accountDenied: null,
  notifyAccountDenied: null,
  closeNotifyAccountDenied: null
});

// Initial state
export const INITIAL_STATE = Immutable({
  typpe: '',
  isOpenNotify: false
});

const accountDenied = (state, action) => {
  return state.merge({
    type: action.type,
    isOpenNotify: true
  });
};

const notifyAccountDenied = state => {
  return state.merge({
    isOpenNotify: true
  });
};

const closeNotifyAccountDenied = state => {
  return state.merge({
    isOpenNotify: false
  });
};

// Assign handler to types.
const HANDLERS = {
  [Types.ACCOUNT_DENIED]: accountDenied,
  [Types.NOTIFY_ACCOUNT_DENIED]: notifyAccountDenied,
  [Types.CLOSE_NOTIFY_ACCOUNT_DENIED]: closeNotifyAccountDenied
};

// Create reducers by pass state and handlers
export const commonReducer = createReducer(INITIAL_STATE, HANDLERS);
