import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from 'utils/Apis';
import { Types as CommonTypes } from 'commons/redux';
import { Types } from '../redux';

function* getMerchandiseDetail(action) {
  try {
    /**
     * Example data
     * url: enpoint/revenues
     *
     */
    const response = yield call(() =>
      API.get(ROUTES.GET_PRODUCTS_DETAIL, action.params)
    );

    if (response.status === 403) {
      yield put({ type: CommonTypes.ACCOUNT_DENIED });
    }

    if (response.ok) {
      // In case: request success
      const { data } = response.data;
      yield put({
        type: Types.GET_MERCHANDISE_DETAIL_SUCCESS,
        data
      });
    } else {
      // In case: request failed
      yield put({
        type: Types.GET_MERCHANDISE_DETAIL_FAILED,
        error: response.error
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.GET_MERCHANDISE_DETAIL_FAILED, error });
  }
}

/*
  Starts get revenues list on each dispatched `GET_REVENUES` action.
*/
function* getMerchandiseDetailSaga() {
  yield takeLatest(Types.GET_MERCHANDISE_DETAIL, getMerchandiseDetail);
}

export default getMerchandiseDetailSaga;
