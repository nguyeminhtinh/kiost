import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from 'utils/Apis';

import { Types } from '../redux';

// worker Saga: will be fired on SEND_INVITE actions
function* getListYear(action) {
  try {
    /**
     * Example data
     * url: /revenues/store
     *
     */
    const response = yield call(() =>
      API.post(ROUTES.REVENUE_DATE, JSON.stringify(action.params))
    );

    if (response.ok) {
      // In case: request success
      yield put({
        type: Types.GET_LIST_YEAR_SUCCESS,
        data: response.data
      });
    } else {
      // In case: request failed
      yield put({
        type: Types.GET_LIST_YEAR_FAILED,
        error: response.error
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.GET_LIST_YEAR_FAILED, error });
  }
}

/*
  Starts get revenues list on each dispatched `GET_REVENUES_DAY` action.
*/
function* getListYearSaga() {
  yield takeLatest(Types.GET_LIST_YEAR, getListYear);
}

export default getListYearSaga;
