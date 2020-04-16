import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from 'utils/Apis';
import { Types as CommonTypes } from 'commons/redux';
import { Types } from '../redux';

function* updateSelfProductDetail(action) {
  try {
    /**
     * Example data
     * url: API
     *
     */
    const response = yield call(() =>
      API.post(
        ROUTES.API_UPDATE_SELF_PRODUCT_DETAIL(action.id),
        JSON.stringify(action.body)
      )
    );

    if (response.status === 403) {
      yield put({ type: CommonTypes.ACCOUNT_DENIED });
    }

    if (response.ok) {
      const { data } = response.data;
      // In case: request success
      yield put({
        type: Types.UPDATE_SELF_PRODUCT_DETAIL_SUCCESS,
        data,
        error: response && response.data && response.data
      });
    } else {
      // In case: request failed
      yield put({
        type: Types.UPDATE_SELF_PRODUCT_DETAIL_FAILED,
        error: response && response.data && response.data
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.UPDATE_SELF_PRODUCT_DETAIL_FAILED, error });
  }
}

/*
  Starts get revenues list on each dispatched `GET_REVENUES` action.
*/
function* updateSelfProductDetailSaga() {
  yield takeLatest(Types.UPDATE_SELF_PRODUCT_DETAIL, updateSelfProductDetail);
}

export default updateSelfProductDetailSaga;
