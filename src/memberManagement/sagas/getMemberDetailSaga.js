import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from 'utils/Apis';
import { Types as CommonTypes } from 'commons/redux';
import { Types } from '../redux';

// worker Saga: will be fired on GET_MEMBER_DETAIL actions
function* getMemberDetail(action) {
  try {
    /**
     * Example data
     * url: enpoint/members
     *
     */
    const response = yield call(() =>
      API.post(ROUTES.GET_MEMBER_DETAIL, JSON.stringify(action.params))
    );

    if (response.status === 403) {
      yield put({ type: CommonTypes.ACCOUNT_DENIED });
    }

    if (response.ok) {
      const { data } = response.data;
      // In case: request success
      yield put({
        type: Types.GET_MEMBER_DETAIL_SUCCESS,
        data,
        currentPage: action.params.pageIndex
      });
    } else {
      // In case: request failed
      yield put({
        type: Types.GET_MEMBER_DETAIL_FAILED,
        error: response.error
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.GET_MEMBER_DETAIL_FAILED, error });
  }
}

/*
  Starts get revenues list on each dispatched `GET_MEMBER_DETAIL` action.
*/
function* getMemberDetailSaga() {
  yield takeLatest(Types.GET_MEMBER_DETAIL, getMemberDetail);
}

export default getMemberDetailSaga;
