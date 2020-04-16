import { all } from 'redux-saga/effects';

/** login */
import LoginSaga from 'account/sagas/LoginSaga';
import LogOutSaga from 'account/sagas/LogOutSaga';
import getRevenuesSaga from 'home/sagas/getRevenuesSaga';
import getListMembersSaga from 'memberManagement/sagas/getListMembersSaga';
import getInventoryListSaga from 'InventoryManagement/sagas/getInventoryListSaga';
import getInventoryListDetailSaga from 'InventoryManagement/sagas/getInventoryListDetailSaga';
import getInventoryProductDetailSaga from 'InventoryManagement/sagas/getInventoryProductDetailSaga';
import revenuesByTimeSaga from 'revenue/sagas/revenuesByTimeSaga';
import revenuesByDateSaga from 'revenue/sagas/revenuesByDateSaga';
import revenuesProductSagas from 'revenue/sagas/revenuesProductSagas';
import getMerchandiseDetailSaga from 'merchandiseManagement/sagas/getMerchandiseDetailSaga';
import getAddressOptionsSaga from 'storeManagement/sagas/getAddressOptionsSaga';
import getListYearSaga from '../revenue/sagas/getYearSaga';
import getListDevicesSaga from '../device/sagas/getListDevicesSaga';
import getDeviceDetailSaga from '../device/sagas/getDeviceDetailSaga';
import getStoreDetailSaga from '../storeManagement/sagas/getStoreDetailSaga';
import getCategoriesSaga from '../merchandiseManagement/sagas/getCategoriesSaga';
import getPaymentSaga from '../revenue/sagas/paymentSaga';
import getPaymentDetailSaga from '../revenue/sagas/paymentDetailSaga';
import getMerchandiseSaga from '../merchandiseManagement/sagas/getMerchandiseSaga';
import getDeviceCodeSaga from '../merchandiseManagement/sagas/getDeviceCodeSaga';
import getMerchadiseByCategorySaga from '../merchandiseManagement/sagas/getMerchadiseByCategorySaga';
import registerProductSaga from '../merchandiseManagement/sagas/addProductSaga';
import deleteProductSaga from '../merchandiseManagement/sagas/deleteProductSaga';
import updateDeviceSaga from '../device/sagas/updateDeviceSaga';
import updateProductSaga from '../merchandiseManagement/sagas/updateProductSaga';
import getMemberDetailSaga from '../memberManagement/sagas/getMemberDetailSaga';
import addProductSeftSaga from '../merchandiseManagement/sagas/addProductSeftSaga';
import getImageCategorySaga from '../merchandiseManagement/sagas/getImageCategorySaga';
import getAllListPaymentHistory from '../revenue/sagas/getAllListPaymentHistorySaga';
import getSelfProductDetailSaga from '../merchandiseManagement/sagas/getSelfProductDetailSaga';
import updateSelfProductDetailSaga from '../merchandiseManagement/sagas/updateSelfProductDetailSaga';

import getMerchandiseManualSaga from '../merchandiseManagement/sagas/getMerchandiseManualSaga';
import registerImageProductSaga from '../merchandiseManagement/sagas/RegisterPageImageSaga';
import getImageCategoryAuthorSaga from '../merchandiseManagement/sagas/getImageCategoryAuthorSaga';
import updatePageImageSaga from '../merchandiseManagement/sagas/UpdatePageImageSaga';

export default function* RootSagas() {
  yield all([
    // account sagas
    LoginSaga(),
    LogOutSaga(),
    // home sagas
    getRevenuesSaga(),
    // store
    getAddressOptionsSaga(),
    getStoreDetailSaga(),
    // device
    getListDevicesSaga(),
    getDeviceDetailSaga(),
    // inventory
    getInventoryListSaga(),
    getInventoryListDetailSaga(),
    getInventoryProductDetailSaga(),

    // members
    getListMembersSaga(),
    getMemberDetailSaga(),

    // merchandise
    getMerchandiseDetailSaga(),
    getMerchandiseSaga(),
    getCategoriesSaga(),
    getDeviceCodeSaga(),
    getMerchadiseByCategorySaga(),
    registerProductSaga(),
    deleteProductSaga(),
    updateProductSaga(),
    addProductSeftSaga(),
    getImageCategorySaga(),
    getSelfProductDetailSaga(),
    updateSelfProductDetailSaga(),
    getMerchandiseManualSaga(),
    // revenue
    getPaymentSaga(),
    getAllListPaymentHistory(),
    getPaymentDetailSaga(),
    updateDeviceSaga(),
    revenuesByTimeSaga(),
    revenuesByDateSaga(),
    revenuesProductSagas(),
    getListYearSaga(),
    registerImageProductSaga(),
    getImageCategoryAuthorSaga(),
    updatePageImageSaga()
  ]);
}
