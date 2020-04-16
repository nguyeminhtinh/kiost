import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from 'utils/Apis';
import { Types as CommonTypes } from 'commons/redux';
import { Types } from '../redux';

function* getCategories() {
  try {
    /**
     * Example data
     * url: enpoint/revenues
     *
     */
    const response = yield call(() => API.get(ROUTES.GET_CATEGORIES));

    if (response.status === 403) {
      yield put({ type: CommonTypes.ACCOUNT_DENIED });
    }

    if (response.ok) {
      const { data } = response.data;
      // In case: request success
      yield put({ type: Types.GET_CATEGORIES_SUCCESS, data });
    } else {
      // In case: request failed
      yield put({
        type: Types.GET_CATEGORIES_FAILED,
        error: response.error
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.GET_CATEGORIES_FAILED, error });
  }
}

/*
  Starts get revenues list on each dispatched `GET_REVENUES` action.
*/
function* getCategorieseSaga() {
  yield takeLatest(Types.GET_CATEGORIES, getCategories);
}

export default getCategorieseSaga;
