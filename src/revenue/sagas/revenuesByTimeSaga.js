import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from 'utils/Apis';
import { Types as CommonTypes } from 'commons/redux';
import { Types } from '../redux';

// worker Saga: will be fired on GET_LIST_PAYMENT actions
function* getRevenueByTime(action) {
  try {
    /**
     * Example data
     * url: enpoint/payment
     *
     */
    const response = yield call(() =>
      API.get(ROUTES.REVENUE_TIME, action.params)
    );

    if (response.status === 403) {
      yield put({ type: CommonTypes.ACCOUNT_DENIED });
    }

    if (response.ok) {
      const { data } = response.data;
      // In case: request success
      yield put({
        type: Types.GET_REVENUES_BY_TIME_SUCCESS,
        data,
        currentPage: action.params.pageIndex - 1
      });
    } else {
      // In case: request failed
      yield put({
        type: Types.GET_REVENUES_BY_TIME_FAILED,
        error: response.error
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.GET_REVENUES_BY_TIME_FAILED, error });
  }
}

/*
  Starts get revenues list on each dispatched `GET_LIST_PAYMENT` action.
*/
function* revenuesByTimeSaga() {
  yield takeLatest(Types.GET_REVENUES_BY_TIME, getRevenueByTime);
}

export default revenuesByTimeSaga;
