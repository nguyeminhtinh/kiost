import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from 'utils/Apis';
import { Types as CommonTypes } from 'commons/redux';
import { Types } from '../redux';

function* updateImageProduct(action) {
  try {
    /**
     * Example data
     * url: enpoint/revenues
     *
     */
    // action.params
    const { id, name } = action.params;
    const params = `id=${id}&name=${name}`;

    const response = yield call(() =>
      API.post(ROUTES.UPDATE_IMAGE_PRODUCT_API(params))
    );

    if (response.status === 403) {
      yield put({ type: CommonTypes.ACCOUNT_DENIED });
    }

    if (response.ok) {
      // In case: request success
      const { data } = response.data;
      yield put({
        type: Types.UPDATE_IMAGE_PRODUCT_SUCCESS,
        data
      });
    } else {
      // In case: request failed
      yield put({
        type: Types.UPDATE_IMAGE_PRODUCT_FAILED,
        error: response.message
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.UPDATE_IMAGE_PRODUCT_FAILED, error });
  }
}

/*
  Starts get revenues list on each dispatched `GET_REVENUES` action.
*/
function* updateImageProductSaga() {
  yield takeLatest(Types.UPDATE_IMAGE_PRODUCT, updateImageProduct);
}

export default updateImageProductSaga;
