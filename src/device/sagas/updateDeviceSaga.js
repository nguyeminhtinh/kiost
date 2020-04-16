import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from 'utils/Apis';
import { Types as CommonTypes } from 'commons/redux';
import { Types } from '../redux';

// worker Saga: will be fired on SEND_INVITE actions
function* updateDevice(action) {
  try {
    /**
     * Example data
     * url: /get-device/{id}
     *
     */
    const response = yield call(() =>
      API.put(ROUTES.UPDATE_DEVICE(action.id), JSON.stringify(action.body))
    );

    if (response.status === 403) {
      yield put({ type: CommonTypes.ACCOUNT_DENIED });
    }

    if (response.ok) {
      // In case: request success
      const { data } = response.data;
      yield put({
        type: Types.UPDATE_DEVICE_SUCCESS,
        data,
        error: response.data && response.data
      });
    } else {
      // In case: request failed
      yield put({
        type: Types.UPDATE_DEVICE_FAILED,
        error: response.error
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.UPDATE_DEVICE_FAILED, error });
  }
}

/*
  Starts get revenues list on each dispatched `UPDATE_DEVICE` action.
*/
function* updateDeviceSaga() {
  yield takeLatest(Types.UPDATE_DEVICE, updateDevice);
}

export default updateDeviceSaga;
