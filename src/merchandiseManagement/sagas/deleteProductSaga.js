import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from 'utils/Apis';
import { Types as CommonTypes } from 'commons/redux';
import { Types } from '../redux';

function* deleteProduct(action) {
  try {
    /**
     * Example data
     * url: API
     *
     */

    const response = yield call(() =>
      API.delete(ROUTES.DELETE_PRODUCT_API(action.id))
    );

    if (response.status === 403) {
      yield put({ type: CommonTypes.ACCOUNT_DENIED });
    }

    if (response.ok) {
      const { data } = response.data;
      // In case: request success
      yield put({
        type: Types.DELETE_PRODUCT_SUCCESS,
        data,
        error: response.data && response.data
      });
    } else {
      // In case: request failed
      yield put({
        type: Types.DELETE_PRODUCT_FAILED,
        error: response.error
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.DELETE_PRODUCT_FAILED, error });
  }
}

/*
  Starts get revenues list on each dispatched `GET_REVENUES` action.
*/
function* deleteProductSaga() {
  yield takeLatest(Types.DELETE_PRODUCT, deleteProduct);
}

export default deleteProductSaga;
