import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from 'utils/Apis';
import { Types as CommonTypes } from 'commons/redux';
import { Types } from '../redux';

// worker Saga: will be fired on SEND_INVITE actions
function* getDeviceDetail(action) {
  try {
    /**
     * Example data
     * url: /get-device/{id}
     *
     */
    const dataBody = {
      pageIndex: action.params.pageIndex,
      numberRows: action.params.numberRows
    };

    const response = yield call(() =>
      API.get(ROUTES.GET_DEVICE_DETAIL(action.params.id), dataBody)
    );

    if (response.status === 403) {
      yield put({ type: CommonTypes.ACCOUNT_DENIED });
    }

    if (response.ok) {
      // In case: request success
      const { data } = response.data;
      yield put({
        type: Types.GET_DEVICE_DETAIL_SUCCESS,
        data,
        pageIndex: action.params.pageIndex,
        numberRows: action.params.numberRows
      });
    } else {
      // In case: request failed
      yield put({
        type: Types.GET_DEVICE_DETAIL_FAILED,
        error: response.error
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.GET_DEVICE_DETAIL_FAILED, error });
  }
}

/*
  Starts get revenues list on each dispatched `GET_DEVICE_DETAIL` action.
*/
function* getDeviceDetailSaga() {
  yield takeLatest(Types.GET_DEVICE_DETAIL, getDeviceDetail);
}

export default getDeviceDetailSaga;
