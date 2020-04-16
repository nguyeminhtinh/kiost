import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from 'utils/Apis';
import { Types as CommonTypes } from 'commons/redux';
import { Types } from '../redux';

function* registerProduct(action) {
  try {
    /**
     * Example data
     * url: API
     *
     */
    const response = yield call(() =>
      API.post(ROUTES.REGISTER_PRODUCT_API, JSON.stringify(action.body))
    );

    if (response.status === 403) {
      yield put({ type: CommonTypes.ACCOUNT_DENIED });
    }

    if (response.ok) {
      const { data } = response.data;
      // In case: request success
      yield put({
        type: Types.REGISTER_PRODUCT_SUCCESS,
        data
      });
    } else {
      // In case: request failed
      yield put({
        type: Types.REGISTER_PRODUCT_FAILED,
        error: response.error
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.REGISTER_PRODUCT_FAILED, error });
  }
}

/*
  Starts get revenues list on each dispatched `GET_REVENUES` action.
*/
function* registerProductSaga() {
  yield takeLatest(Types.REGISTER_PRODUCT, registerProduct);
}

export default registerProductSaga;
