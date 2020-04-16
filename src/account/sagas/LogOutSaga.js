import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from 'utils/Apis';

import { Types } from 'account/redux';

function* logOut() {
  try {
    /**
     * Example data
     * url: enpoint/logOut
     * params:
     *  {
     *    username: 'Lorem'
     *    password: 'Lorem',
     *    isRemeberMe: true | false,
     *  }
     *
     */
    const response = yield call(() => API.get(ROUTES.LOG_OUT));

    if (response.ok) {
      const { data } = response.data;
      // In case: Login request success
      yield put({ type: Types.LOG_OUT_SUCCESS, data });
    } else {
      // In case: Login request failed
      yield put({ type: Types.LOG_OUT_FAILED, error: response.error });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.LOG_OUT_FAILED, error });
  }
}

/*
  Starts login on each dispatched `SIGN_IN` action.
*/
function* logOutSaga() {
  yield takeLatest(Types.LOG_OUT, logOut);
}

export default logOutSaga;
