import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from 'utils/Apis';
import { Types as CommonTypes } from 'commons/redux';
import { Types } from '../redux';

// worker Saga: will be fired on GET_LIST_PAYMENT actions
function* getRevenueByDate(action) {
  try {
    /**
     * Example data
     * url: enpoint/payment
     *
     */
    const response = yield call(() =>
      API.post(ROUTES.REVENUE_DATE, JSON.stringify(action.params))
    );

    if (response.status === 403) {
      yield put({ type: CommonTypes.ACCOUNT_DENIED });
    }

    if (response.ok) {
      // In case: request success
      yield put({
        type: Types.GET_REVENUES_BY_DATE_SUCCESS,
        data: response.data
      });
    } else {
      // In case: request failed
      yield put({
        type: Types.GET_REVENUES_BY_DATE_FAILED,
        error: response.error
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.GET_REVENUES_BY_DATE_FAILED, error });
  }
}

/*
  Starts get revenues list on each dispatched `GET_LIST_PAYMENT` action.
*/
function* revenuesByDateSaga() {
  yield takeLatest(Types.GET_REVENUES_BY_DATE, getRevenueByDate);
}

export default revenuesByDateSaga;
