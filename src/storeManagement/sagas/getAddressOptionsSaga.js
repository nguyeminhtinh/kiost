import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from 'utils/Apis';

import { Types } from '../redux';

// worker Saga: will be fired on SEND_INVITE actions
function* getAddressOptions() {
  try {
    /**
     * Example data
     * url: enpoint/address-options
     *
     */
    const response = yield call(() => API.get(ROUTES.GET_ADDRESS_OPTIONS));

    if (response.ok) {
      // In case: request success
      yield put({
        type: Types.GET_ADDRESS_OPTIONS_SUCCESS,
        data: response.data
      });
    } else {
      // In case: request failed
      yield put({
        type: Types.GET_ADDRESS_OPTIONS_FAILED,
        error: response.error
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.GET_ADDRESS_OPTIONS_FAILED, error });
  }
}

/*
  Starts get revenues list on each dispatched `GET_REVENUES` action.
*/
function* getAddressOptionsSaga() {
  yield takeLatest(Types.GET_ADDRESS_OPTIONS, getAddressOptions);
}

export default getAddressOptionsSaga;
