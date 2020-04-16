import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from 'utils/Apis';
import { Types as CommonTypes } from 'commons/redux';
import { Types } from '../redux';

function* getMerchandiseManual(action) {
  try {
    /**
     * Example data
     * url: enpoint/revenues
     *
     */
    const response = yield call(() =>
      API.post(ROUTES.API_GET_MERCHANDISE_MANUAL, JSON.stringify(action.params))
    );

    if (response.status === 403) {
      yield put({ type: CommonTypes.ACCOUNT_DENIED });
    }

    if (response.ok) {
      // In case: request success
      const { data } = response.data;
      yield put({
        type: Types.GET_MERCHANDISE_MANUAL_SUCCESS,
        data,
        numberRows: action.params && action.params.pageNumber
      });
    } else {
      // In case: request failed
      yield put({
        type: Types.GET_MERCHANDISE_MANUAL_FAILED,
        error: response.error
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.GET_MERCHANDISE_MANUAL_FAILED, error });
  }
}

/*
  Starts get revenues list on each dispatched `GET_REVENUES` action.
*/
function* getMerchandiseManualSaga() {
  yield takeLatest(Types.GET_MERCHANDISE_MANUAL, getMerchandiseManual);
}

export default getMerchandiseManualSaga;
