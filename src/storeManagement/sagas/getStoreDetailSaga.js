import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from 'utils/Apis';
import { Types as CommonTypes } from 'commons/redux';
import { Types } from '../redux';

// worker Saga: will be fired on GET_STORE_DETAIL actions
function* getStoreDetail(action) {
  try {
    /**
     * Example data
     * url: endpoint/stores/{id}
     *
     */
    const response = yield call(() =>
      API.get(ROUTES.GET_STORE_DETAIL, action.params)
    );

    if (response.status === 403) {
      yield put({ type: CommonTypes.ACCOUNT_DENIED });
    }

    if (response.ok) {
      // In case: request success
      yield put({
        type: Types.GET_STORE_DETAIL_SUCCESS,
        data: response.data,
        pageIndex: action.params.pageIndex,
        numberRows: action.params.numberRows
      });
    } else {
      // In case: request failed
      yield put({
        type: Types.GET_STORE_DETAIL_FAILED,
        error: response.error
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.GET_STORE_DETAIL_FAILED, error });
  }
}

/*
  Starts get revenues list on each dispatched `GET_STORE_DETAIL` action.
*/
function* getStoreDetailSaga() {
  yield takeLatest(Types.GET_STORE_DETAIL, getStoreDetail);
}

export default getStoreDetailSaga;
