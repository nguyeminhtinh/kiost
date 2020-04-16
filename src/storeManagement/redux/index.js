// import libs
import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { getFormatBlock } from '../../constants/validate';

// Define action creators
export const { Types, Creators } = createActions({
  getAddressOptions: null,
  getAddressOptionsSuccess: null,
  getAddressOptionsFailed: null,
  getStoreDetail: ['params'],
  getStoreDetailSuccess: null,
  getStoreDetailFailed: null
});

// Initial state
export const INITIAL_STATE = Immutable({
  isProcessing: false,
  error: '',
  dataDetail: {},
  listDevice: []
});

const getAddressOptions = (state, action) => {
  return state.merge({
    type: action.type
  });
};

const getAddressOptionsSuccess = (state, action) => {
  return state.merge({
    addressOptions: action.data
  });
};

const getAddressOptionsFailed = (state, action) => {
  return state.merge({
    error: action.error
  });
};
/**
 *
 * API Get stores detail
 */
const getStoreDetail = state => {
  return state.merge({
    isProcessing: true
  });
};

const getStoreDetailSuccess = (state, action) => {
  const { data } = action.data;
  const niceYN = data.store.niceYn === 'Y' ? '자동발행' : '수동발행';
  const dataDetail = {
    businessReg:
      data.store && getFormatBlock(data.store.businessReg, 4, 8, 13, '-'),
    ddUserNo: data.store && data.store.ddUserNo,
    erpTraderCode: data.store && data.store.erpTraderCode,
    companyName: data.store && data.store.companyName,
    address: data.store && data.store.address,
    addressDetail: data.store && data.store.addressDetail,
    phoneFirst:
      data.store &&
      data.store.tel &&
      data.store.tel.replace(/-/gi, '') &&
      data.store.tel.slice(0, 3),
    phoneSecond:
      data.store &&
      data.store.tel &&
      data.store.tel.replace(/-/gi, '') &&
      data.store.tel.slice(3, 7),
    phoneEnd:
      data.store &&
      data.store.tel &&
      data.store.tel.replace(/-/gi, '') &&
      data.store.tel.slice(7, 11),
    ceoName: data.store && data.store.ceoName,
    taxBusinessType: data.store && data.store.taxBusinessType,
    taxEmail: data.store && data.store.taxEmail,
    taxBusinessCategory: data.store && data.store.taxBusinessCategory,
    traderMemo: data.store && data.store.traderMemo,
    niceYN
  };

  const storeDetail = data.store ? dataDetail : {};
  const listDevice = data.devices.map((device, index) => ({
    rowId: `${data.totalRows - (action.pageIndex - 1) * 10 - index}`,
    id: device.id,
    deviceType:
      // eslint-disable-next-line no-nested-ternary
      device.deviceType && device.deviceType === 'single'
        ? '싱글'
        : device.deviceType === 'slim'
        ? '슬림'
        : '더블',
    deviceCode: device.deviceCode ? device.deviceCode : '',
    frozen: device && device.frozenType === 'frozen' ? '냉동' : '냉장'
  }));

  return state.merge({
    isProcessing: false,
    dataStoreDetail: storeDetail,
    listDevice: action.data && listDevice,
    totalRows: action.data.data.totalRows
  });
};

const getStoreDetailFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    error: action.error
  });
};

// Assign handler to types.
const HANDLERS = {
  [Types.GET_ADDRESS_OPTIONS]: getAddressOptions,
  [Types.GET_ADDRESS_OPTIONS_SUCCESS]: getAddressOptionsSuccess,
  [Types.GET_ADDRESS_OPTIONS_FAILED]: getAddressOptionsFailed,
  [Types.GET_STORE_DETAIL]: getStoreDetail,
  [Types.GET_STORE_DETAIL_SUCCESS]: getStoreDetailSuccess,
  [Types.GET_STORE_DETAIL_FAILED]: getStoreDetailFailed
};

// Create reducers by pass state and handlers
export const storesReducer = createReducer(INITIAL_STATE, HANDLERS);
