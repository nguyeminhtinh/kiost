import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from 'utils/Apis';
import { Types as CommonTypes } from 'commons/redux';
import { Types } from '../redux';

function* getMerchandise(action) {
  try {
    /**
     * Example data
     * url: enpoint/revenues
     *
     */
    const response = yield call(() =>
      API.post(ROUTES.GET_PRODUCTS, JSON.stringify(action.params))
    );

    if (response.status === 403) {
      yield put({ type: CommonTypes.ACCOUNT_DENIED });
    }

    if (response.ok) {
      const { data } = response.data;
      // In case: request success
      yield put({
        type: Types.GET_MERCHANDISE_SUCCESS,
        data,
        numberRows: action.params && action.params.numberRows
      });
    } else {
      // In case: request failed
      yield put({
        type: Types.GET_MERCHANDISE_FAILED,
        error: response.error
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.GET_MERCHANDISE_FAILED, error });
  }
}

/*
  Starts get revenues list on each dispatched `GET_REVENUES` action.
*/
function* getMerchandiseSaga() {
  yield takeLatest(Types.GET_MERCHANDISE, getMerchandise);
}

export default getMerchandiseSaga;
