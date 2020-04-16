import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from 'utils/Apis';
import { Types as CommonTypes } from 'commons/redux';
import { Types } from '../redux';

// worker Saga: will be fired on GET_LIST_MEMBERS actions
function* getListMembers(action) {
  try {
    /**
     * Example data
     * url: enpoint/members
     *
     */
    const response = yield call(() =>
      API.post(ROUTES.GET_LIST_MEMBER, JSON.stringify(action.params))
    );

    if (response.status === 403) {
      yield put({ type: CommonTypes.ACCOUNT_DENIED });
    }

    if (response.ok) {
      const { data } = response.data;
      // In case: request success
      yield put({
        type: Types.GET_LIST_MEMBERS_SUCCESS,
        data,
        currentPage: action.params.pageIndex,
        pageSize: action.params.pageSize
      });
    } else {
      // In case: request failed
      yield put({
        type: Types.GET_LIST_MEMBERS_FAILED,
        error: response.error
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.GET_LIST_MEMBERS_FAILED, error });
  }
}

/*
  Starts get revenues list on each dispatched `GET_LIST_MEMBERS` action.
*/
function* getListMembersSaga() {
  yield takeLatest(Types.GET_LIST_MEMBERS, getListMembers);
}

export default getListMembersSaga;
