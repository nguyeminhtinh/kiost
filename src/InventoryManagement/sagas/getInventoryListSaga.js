import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from 'utils/Apis';
import { Types as CommonTypes } from 'commons/redux';
import { Types } from '../redux';

// worker Saga: will be fired on SEND_INVITE actions
function* getIventoryList(action) {
  try {
    /**
     * Example data
     * url: enpoint/revenues
     *
     */
    const response = yield call(() =>
      API.post(ROUTES.GET_INVENTORY, JSON.stringify(action.params))
    );

    if (response.status === 403) {
      yield put({ type: CommonTypes.ACCOUNT_DENIED });
    }

    if (response.ok) {
      // In case: request success
      yield put({
        type: Types.GET_INVENTORY_LIST_SUCCESS,
        data: response.data,
        pageSize: action.params.pageNumber
      });
    } else {
      // In case: request failed
      yield put({
        type: Types.GET_INVENTORY_LIST_FAILED,
        error: response.error
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.GET_INVENTORY_LIST_FAILED, error });
  }
}

/*
  Starts get revenues list on each dispatched `GET_REVENUES` action.
*/
function* getIventoryListSaga() {
  yield takeLatest(Types.GET_INVENTORY_LIST, getIventoryList);
}

export default getIventoryListSaga;
