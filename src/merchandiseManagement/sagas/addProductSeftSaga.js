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
      API.post(ROUTES.ADD_PRODUCT_SEFT, JSON.stringify(action.params))
    );

    if (response.status === 403) {
      yield put({ type: CommonTypes.ACCOUNT_DENIED });
    }

    if (response.ok) {
      const { data } = response.data;
      // In case: request success
      yield put({
        type: Types.ADD_PRODUCT_SEFT_SUCCESS,
        data,
        error: response && response.data && response.data
      });
    } else {
      // In case: request failed
      yield put({
        type: Types.ADD_PRODUCT_SEFT_FAILED,
        error: response && response.data && response.data
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.ADD_PRODUCT_SEFT_FAILED, error });
  }
}

/*
  Starts get revenues list on each dispatched `GET_REVENUES` action.
*/
function* registerProductSaga() {
  yield takeLatest(Types.ADD_PRODUCT_SEFT, registerProduct);
}

export default registerProductSaga;
