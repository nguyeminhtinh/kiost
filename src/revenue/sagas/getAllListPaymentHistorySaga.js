import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from 'utils/Apis';
import { Types as CommonTypes } from 'commons/redux';
import { Types } from '../redux';

// worker Saga: will be fired on SEND_INVITE actions
function* getAllListPaymentHistory(action) {
  try {
    /**
     * Example data
     * url: /revenues/store
     *
     */
    const response = yield call(() =>
      API.post(ROUTES.GET_PAYMENT, JSON.stringify(action.params))
    );

    if (response.status === 403) {
      yield put({ type: CommonTypes.ACCOUNT_DENIED });
    }

    if (response.ok) {
      const { data } = response.data;

      // In case: request success
      yield put({
        type: Types.GET_ALL_LIST_PAYMENT_HISTORY_SUCCESS,
        data,
        table: data.table,
        pageIndex: action.params.pageIndex
      });
    } else {
      // In case: request failed
      yield put({
        type: Types.GET_ALL_LIST_PAYMENT_HISTORY_FAILED,
        error: response.error
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.GET_ALL_LIST_PAYMENT_HISTORY_FAILED, error });
  }
}

/*
  Starts get revenues list on each dispatched `GET_PAYMENT_HISTORY` action.
*/
function* getAllListPaymentHistorySaga() {
  yield takeLatest(
    Types.GET_ALL_LIST_PAYMENT_HISTORY,
    getAllListPaymentHistory
  );
}

export default getAllListPaymentHistorySaga;
