import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from 'utils/Apis';
import { Types as CommonTypes } from 'commons/redux';
import { Types } from '../redux';

// worker Saga: will be fired on GET_LIST_STORES actions
function* getImageCategoryAuthor(action) {
  try {
    /**
     * Example data
     * url: enpoint/stores
     *
     */

    const response = yield call(() =>
      API.get(ROUTES.GET_IMAGES_BY_CATEGORY_AUTHOR(action.id))
    );

    if (response.status === 403) {
      yield put({ type: CommonTypes.ACCOUNT_DENIED });
    }

    if (response.ok) {
      const { data } = response.data;
      // In case: request success
      yield put({
        type: Types.GET_IMAGE_CATEGORY_AUTHOR_SUCCESS,
        data
      });
    } else {
      // In case: request failed
      yield put({
        type: Types.GET_IMAGE_CATEGORY_AUTHOR_FAILED,
        error: response.error
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.GET_IMAGE_CATEGORY_AUTHOR_FAILED, error });
  }
}
/*
  Starts get revenues list on each dispatched `GET_LIST_STORES` action.
*/
function* getImageCategoryAuthorSaga() {
  yield takeLatest(Types.GET_IMAGE_CATEGORY_AUTHOR, getImageCategoryAuthor);
}

export default getImageCategoryAuthorSaga;
