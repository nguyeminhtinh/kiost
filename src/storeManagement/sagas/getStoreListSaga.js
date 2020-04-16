import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from 'utils/Apis';

import { Types } from '../redux';

// worker Saga: will be fired on GET_LIST_STORES actions
function* getStoreList(action) {
  try {
    /**
     * Example data
     * url: enpoint/stores
     *
     */
    const response = yield call(() =>
      API.get(ROUTES.GET_STORES, action.params)
    );

    if (response.ok) {
      // In case: request success
      yield put({
        type: Types.GET_LIST_STORES_SUCCESS,
        data: response.data
      });
    } else {
      // In case: request failed
      yield put({
        type: Types.GET_LIST_STORES_FAILED,
        error: response.error
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.GET_LIST_STORES_FAILED, error });
  }
}

/*
  Starts get revenues list on each dispatched `GET_LIST_STORES` action.
*/
function* getStoreListSaga() {
  yield takeLatest(Types.GET_LIST_STORES, getStoreList);
}

export default getStoreListSaga;
