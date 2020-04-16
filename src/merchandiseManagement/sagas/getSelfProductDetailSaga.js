import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from 'utils/Apis';
import { Types as CommonTypes } from 'commons/redux';
import { Types } from '../redux';

function* getSelfInputProductDetail(action) {
  try {
    /**
     * Example data
     * url: enpoint/revenues
     *
     */
    // if (action.id) {
    const response = yield call(() =>
      API.post(ROUTES.API_GET_SELF_PRODUCT_DETAIL(action.id))
    );

    if (response.status === 403) {
      yield put({ type: CommonTypes.ACCOUNT_DENIED });
    }

    if (response.ok) {
      const { data } = response.data;
      // In case: request success
      yield put({
        type: Types.GET_API_SELF_PRODUCT_DETAIL_SUCCESS,
        data
      });
    } else {
      // In case: request failed
      yield put({
        type: Types.GET_API_SELF_PRODUCT_DETAIL_FAILED,
        error: response.error
      });
    }
    // }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.GET_API_SELF_PRODUCT_DETAIL_FAILED, error });
  }
}

/*
  Starts get revenues list on each dispatched `GET_REVENUES` action.
*/
function* getSelfProductDetailSaga() {
  yield takeLatest(
    Types.GET_API_SELF_PRODUCT_DETAIL,
    getSelfInputProductDetail
  );
}

export default getSelfProductDetailSaga;
