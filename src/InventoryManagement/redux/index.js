// import libs
import { createActions, createReducer } from 'reduxsauce';
import moment from 'moment';
import appConfig from 'config/appConfig';
import Immutable from 'seamless-immutable';

// Define action creators
export const { Types, Creators } = createActions({
  getInventoryList: ['params'],
  getInventoryListSuccess: null,
  getInventoryListFailed: null,
  getInventoryListDetail: ['id'],
  getInventoryListDetailSuccess: null,
  getInventoryListDetailFailed: null,
  getInventoryProductDetail: ['id'],
  getInventoryProductDetailSuccess: null,
  getInventoryProductDetailFailed: null
});

// Initial state
export const INITIAL_STATE = Immutable({
  isProcessing: false,
  error: '',
  inventoryList: [],
  inventoryListDetail: [],
  inventoryProductDetail: {}
});

const getInventoryList = state => {
  return state.merge({
    isProcessing: true
  });
};

const getInventoryListSuccess = (state, action) => {
  const { data } = action;
  const inventoryList =
    data &&
    data.data.inventories.map((item, index) => {
      const { deviceType } = item;
      let textDeviceType = '';
      switch (deviceType) {
        case 'single':
          textDeviceType = '싱글';
          break;
        case 'slim':
          textDeviceType = '슬림';
          break;
        case 'double':
          textDeviceType = '더블';
          break;
        default:
          break;
      }
      return {
        rowId:
          `${data.data.totalRows -
            data.data.currentPage * action.pageSize -
            index}` || '',
        id: item.deviceId,
        storeName: item.storeName,
        deviceType: textDeviceType,
        frozenType:
          item.frozenType && item.frozenType === 'frozen' ? '냉동' : '냉장',
        deviceCode: item.deviceCode
      };
    });
  return state.merge({
    inventoryList,
    isProcessing: false,
    totalRows: data.data.totalRows
  });
};

const getInventoryListFailed = (state, action) => {
  return state.merge({
    error: action.error,
    isProcessing: false
  });
};

const getInventoryListDetail = state => {
  return state.merge({
    isProcessing: true
  });
};

const getInventoryListDetailSuccess = (state, action) => {
  const { data } = action;
  const newDate = moment(new Date()).format('YYYY-MM-DD');
  const inventoryListDetail =
    data &&
    data.data.map(item => {
      const dayExpiration =
        item.expirationDate && moment(item.expirationDate).format('YYYY-MM-DD');
      const DNew = moment(newDate);
      const DEnd = moment(dayExpiration);
      const compare = DEnd.diff(DNew, 'days');
      let dateD = '';
      if (compare > 2) {
        dateD = '';
      }
      if (compare === 2) {
        dateD = 'D-3';
      }
      if (compare === 1) {
        dateD = 'D-2';
      }
      if (compare === 0) {
        dateD = 'D-1';
      }
      if (compare < 0 && item.stock !== 0) {
        dateD = `D++`;
      }
      return {
        id: item.id,
        title: item.productName,
        wearing: item.goodReceipt,
        sale: item.quantitySold,
        stock: item.stock,
        status: item.slotStatus,
        useStatus: item.useStatus,
        statusDay: dateD,
        slotX: item.slotX + 1,
        slotY: item.slotY + 1
      };
    });
  return state.merge({
    inventoryListDetail,
    isProcessing: false
  });
};
const getInventoryListDetailFailed = (state, action) => {
  return state.merge({
    error: action.error,
    isProcessing: false
  });
};

const getInventoryProductDetail = state => {
  return state.merge({
    isProcessing: false
  });
};

const getInventoryProductDetailSuccess = (state, action) => {
  const { data } = action;
  const dataInventoryDetail = data.data;
  const dayExpiration =
    dataInventoryDetail.expirationDate &&
    moment(dataInventoryDetail.expirationDate).format('YYYY.MM.DD');

  const inventoryProductDetail = {
    url_image: dataInventoryDetail.imagePath
      ? appConfig.IMG_URL + dataInventoryDetail.imagePath
      : '',
    name_product: dataInventoryDetail.name && dataInventoryDetail.name,
    price: dataInventoryDetail.price
      ? dataInventoryDetail.price.toLocaleString('en')
      : 0,
    weight: dataInventoryDetail.mass
      ? dataInventoryDetail.mass.toLocaleString('en')
      : 0,
    // eslint-disable-next-line no-nested-ternary
    origin: dataInventoryDetail.origin
      ? dataInventoryDetail.origin === 'imported'
        ? '수입산'
        : '국내산'
      : '',
    rank: dataInventoryDetail.productLevel
      ? dataInventoryDetail.productLevel
      : '',
    expiration_date: dayExpiration,
    goods_receipt: dataInventoryDetail.insertedAmount
      ? dataInventoryDetail.insertedAmount.toLocaleString('en')
      : 0,
    location: `${
      dataInventoryDetail.slotY !== null
        ? `${dataInventoryDetail.slotY + 1}층`
        : ''
    } ${
      dataInventoryDetail.slotX !== null
        ? `${dataInventoryDetail.slotX + 1}열`
        : ''
    }`
  };
  return state.merge({
    inventoryProductDetail,
    isProcessing: false
  });
};

const getInventoryProductDetailFailed = (state, action) => {
  return state.merge({
    error: action.error,
    isProcessing: false
  });
};
// Assign handler to types.
const HANDLERS = {
  [Types.GET_INVENTORY_LIST]: getInventoryList,
  [Types.GET_INVENTORY_LIST_SUCCESS]: getInventoryListSuccess,
  [Types.GET_INVENTORY_LIST_FAILED]: getInventoryListFailed,
  [Types.GET_INVENTORY_LIST_DETAIL]: getInventoryListDetail,
  [Types.GET_INVENTORY_LIST_DETAIL_SUCCESS]: getInventoryListDetailSuccess,
  [Types.GET_INVENTORY_LIST_DETAIL_FAILED]: getInventoryListDetailFailed,
  [Types.GET_INVENTORY_PRODUCT_DETAIL]: getInventoryProductDetail,
  [Types.GET_INVENTORY_PRODUCT_DETAIL_SUCCESS]: getInventoryProductDetailSuccess,
  [Types.GET_INVENTORY_PRODUCT_DETAIL_FAILED]: getInventoryProductDetailFailed
};

// Create reducers by pass state and handlers
export const inventoryReducer = createReducer(INITIAL_STATE, HANDLERS);
