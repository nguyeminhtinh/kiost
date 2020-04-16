import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from 'utils/Apis';

import { Types as CommonTypes } from 'commons/redux';
import { Types } from '../redux';

// worker Saga: will be fired on SEND_INVITE actions
function* getRevenues(action) {
  try {
    /**
     * Example data
     * url: enpoint/revenues
     *
     */
    const response = yield call(() =>
      API.get(ROUTES.GET_REVENUES, { pageIndex: action.pageIndex })
    );

    if (response.status === 403) {
      yield put({ type: CommonTypes.ACCOUNT_DENIED });
    }

    if (response.ok) {
      // In case: request success
      const { data } = response.data;
      yield put({ type: Types.GET_REVENUES_SUCCESS, data });
    } else {
      // In case: request failed
      yield put({ type: Types.GET_REVENUES_FAILED, error: response.error });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.GET_REVENUES_FAILED, error });
  }
}

/*
  Starts get revenues list on each dispatched `GET_REVENUES` action.
*/
function* getRevenuesSaga() {
  yield takeLatest(Types.GET_REVENUES, getRevenues);
}

export default getRevenuesSaga;
