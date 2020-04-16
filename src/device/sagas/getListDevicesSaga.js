import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from 'utils/Apis';
import { Types as CommonTypes } from 'commons/redux';
import { Types } from '../redux';

// worker Saga: will be fired on SEND_INVITE actions
function* getListDevices(action) {
  try {
    /**
     * Example data
     * url: enpoint/address-options
     *
     */
    const response = yield call(() =>
      API.post(ROUTES.GET_LIST_DEVICES, JSON.stringify(action.params))
    );

    if (response.status === 403) {
      yield put({ type: CommonTypes.ACCOUNT_DENIED });
    }

    if (response.ok) {
      // In case: request success
      const { data } = response.data;
      yield put({
        type: Types.GET_LIST_DEVICES_SUCCESS,
        data,
        pageSize: action.params.pageSize
      });
    } else {
      // In case: request failed
      yield put({
        type: Types.GET_LIST_DEVICES_FAILED,
        error: response.error
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.GET_LIST_DEVICES_FAILED, error });
  }
}

/*
  Starts get revenues list on each dispatched `GET_REVENUES` action.
*/
function* getListDevicesSaga() {
  yield takeLatest(Types.GET_LIST_DEVICES, getListDevices);
}

export default getListDevicesSaga;
