import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from 'utils/Apis';
import { Types as CommonTypes } from 'commons/redux';
import { Types } from '../redux';

function* getProductCodeByCategory(action) {
  try {
    /**
     * Example data
     * url: enpoint/revenues
     *
     */
    const response = yield call(() =>
      API.get(ROUTES.GET_PRODUCT_CODE_BY_CATEGORY(action.categoryId))
    );

    if (response.status === 403) {
      yield put({ type: CommonTypes.ACCOUNT_DENIED });
    }

    if (response.ok) {
      const { data } = response.data;
      // In case: request success
      yield put({
        type: Types.GET_PRODUCT_CODE_BY_CATEGORY_SUCCESS,
        data
      });
    } else {
      // In case: request failed
      yield put({
        type: Types.GET_PRODUCT_CODE_BY_CATEGORY_FAILED,
        error: response.error
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.GET_PRODUCT_CODE_BY_CATEGORY_FAILED, error });
  }
}

/*
  Starts get revenues list on each dispatched `GET_REVENUES` action.
*/
function* getMerchadiseByCategorySaga() {
  yield takeLatest(
    Types.GET_PRODUCT_CODE_BY_CATEGORY,
    getProductCodeByCategory
  );
}

export default getMerchadiseByCategorySaga;
