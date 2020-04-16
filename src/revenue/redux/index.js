// import libs
import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import moment from 'moment';
import { formatPaymentType } from 'utils/helpers';

// Define action creators
export const { Types, Creators } = createActions({
  openModal: null,
  closeModal: null,
  getListPayment: ['params'],
  getListPaymentSuccess: null,
  getListPaymentFailed: null,
  getListPaymentDetail: ['orderId'],
  getListPaymentDetailSuccess: null,
  getListPaymentDetailFailed: null,
  getRevenuesByTime: ['params'],
  getRevenuesByTimeSuccess: null,
  getRevenuesByTimeFailed: null,
  getRevenuesByDate: ['params'],
  getRevenuesByDateSuccess: null,
  getRevenuesByDateFailed: null,
  getListYear: ['params'],
  getListYearSuccess: null,
  getListYearFailed: null,
  getRevenuesProduct: ['params'],
  getRevenuesProductSuccess: null,
  getRevenuesProductFailed: null,
  getAllListPaymentHistory: ['params'],
  getAllListPaymentHistorySuccess: null,
  getAllListPaymentHistoryFailed: null
});

// Initial state
export const INITIAL_STATE = Immutable({
  isOpenModal: false,
  getListPayment: [],
  getListPaymentDetail: [],
  listPaymentDetail: {},
  getListYear: [],
  revenuesData: {
    charts: [],
    table: [],
    totalRows: null
  },
  listAllPayment: []
});

/**
 *Action Payment
 */
const getListPayment = (state, action) => {
  return state.merge({
    type: action.type,
    isProcessing: true,
    isOpenModal: false
  });
};

const getListPaymentSuccess = (state, action) => {
  const dataPaymentFormat =
    action.table &&
    action.table.map((item, index) => {
      const { payType } = item;
      let type = '';
      switch (payType) {
        case 'creditcard':
          type = '카드결제';
          break;
        case 'kakaopay':
          type = 'QR결제(카카오페이)';
          break;
        case 'point':
          type = '쿠폰결제';
          break;
        default:
          break;
      }

      return {
        rowId:
          `${action.data.totalRows - (action.pageIndex - 1) * 10 - index}` ||
          '',
        id: item.orderId,
        type,
        time: moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss'),
        price: item.totalMoney && item.totalMoney.toLocaleString('en'),
        status: item.orderStatus === 'paid' ? 1 : 2,
        savings: item.point && item.point.toLocaleString('en')
      };
    });

  return state.merge({
    listPayment: dataPaymentFormat,
    isProcessing: false,
    totalRows: action.data.totalRows
  });
};

const getListPaymentFailed = (state, action) => {
  return state.merge({
    error: action.error,
    isProcessing: false
  });
};

const getAllListPaymentHistory = (state, action) => {
  return state.merge({
    type: action.type,
    isProcessing: true
  });
};

const getAllListPaymentHistorySuccess = (state, action) => {
  const dataPaymentFormat =
    action.table &&
    action.table.map((item, index) => ({
      순서:
        `${action.data.totalRows - (action.pageIndex - 1) * 10 - index}` || '',
      결제구분: formatPaymentType(item.payType),
      결제시간: moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss'),
      결제금액: item.totalMoney && item.totalMoney.toLocaleString('en'),
      결제상태: item.orderStatus === 'paid' ? '결제완료' : '결제취소',
      적립금: item.point && item.point.toLocaleString('en')
    }));

  return state.merge({
    type: action.type,
    isProcessing: false,
    listAllPayment: dataPaymentFormat
  });
};

const getAllListPaymentHistoryFailed = (state, action) => {
  return state.merge({
    type: action.type,
    isProcessing: false
  });
};

/**
 *Action Payment Detail
 */
const getListPaymentDetail = (state, action) => {
  return state.merge({
    type: action.type,
    isProcessing: false
  });
};

const getListPaymentDetailSuccess = (state, action) => {
  return state.merge({
    listPaymentDetail: action.data && action.data.data,
    isProcessing: false
  });
};

const getListPaymentDetailFailed = (state, action) => {
  return state.merge({
    error: action.error,
    isProcessing: false
  });
};

/**
 *End Action Payment Detail
 */
const openModal = (state, action) => {
  return state.merge({
    type: action.type,
    isOpenModal: true
  });
};

const closeModal = (state, action) => {
  return state.merge({
    type: action.type,
    isOpenModal: false
  });
};

const getRevenuesByTime = (state, action) => {
  return state.merge({
    type: action.type
  });
};

const getRevenuesByTimeSuccess = (state, action) => {
  const formatDataTable =
    action.data &&
    action.data.table &&
    action.data.table.map((item, index) => ({
      id: `${action.data.totalRows - action.currentPage * 10 - index}` || '',
      dateTime: item.createdAt,
      revenue: item.totalMoney && item.totalMoney.toLocaleString('en'),
      interestRate: item.profit && item.profit.toLocaleString('en')
    }));
  return state.merge({
    type: action.type,
    revenuesData: action.data,
    dataTable: formatDataTable
  });
};

const getRevenuesByTimeFailed = (state, action) => {
  return state.merge({
    type: action.type,
    error: action.error
  });
};

const getRevenuesByDate = (state, action) => {
  return state.merge({
    type: action.type
  });
};

const getRevenuesByDateSuccess = (state, action) => {
  return state.merge({
    dataRevenueDate: action.data,
    type: action.type
  });
};

const getRevenuesByDateFailed = (state, action) => {
  return state.merge({
    type: action.type,
    error: action.error
  });
};

/**
 *Action getListYear
 */
const getListYear = (state, action) => {
  return state.merge({
    type: action.type,
    isProcessing: true
  });
};

const getListYearSuccess = (state, action) => {
  const { data } = action;

  const dataYear =
    data &&
    data.data &&
    data.data.charts.map((item, index) => ({
      id: index,
      value: parseInt(item.year, 10),
      label: `${item.year}년`
    }));
  return state.merge({
    listYear: [...dataYear],
    isProcessing: false
  });
};

const getListYearFailed = (state, action) => {
  return state.merge({
    error: action.error,
    isProcessing: false
  });
};

/**
 *End Action getListYear
 */

const getRevenuesProduct = (state, action) => {
  return state.merge({
    type: action.type
  });
};

const getRevenuesProductSuccess = (state, action) => {
  const dataTable = action.data.table.map((item, index) => ({
    id: 10 * (action.pageIndex - 1) + index + 1,
    productName: item.productName,
    amount: item.amount && item.amount.toLocaleString('en'),
    numPrice: item.totalMoney && item.totalMoney.toLocaleString('en'),
    salesProfit: item.profit && item.profit.toLocaleString('en')
  }));
  return state.merge({
    totalAmount: action.data.totalAmount
      ? action.data.totalAmount.toLocaleString('en')
      : 0,
    totalMoney: action.data.totalMoney
      ? action.data.totalMoney.toLocaleString('en')
      : 0,
    totalRows: action.data.totalRows,
    dataTable,
    type: action.type
  });
};

const getRevenuesProductFailed = (state, action) => {
  return state.merge({
    type: action.type,
    error: action.error
  });
};

// Assign handler to types.
const HANDLERS = {
  [Types.OPEN_MODAL]: openModal,
  [Types.CLOSE_MODAL]: closeModal,
  [Types.GET_LIST_PAYMENT]: getListPayment,
  [Types.GET_LIST_PAYMENT_SUCCESS]: getListPaymentSuccess,
  [Types.GET_LIST_PAYMENT_FAILED]: getListPaymentFailed,
  [Types.GET_ALL_LIST_PAYMENT_HISTORY]: getAllListPaymentHistory,
  [Types.GET_ALL_LIST_PAYMENT_HISTORY_SUCCESS]: getAllListPaymentHistorySuccess,
  [Types.GET_ALL_LIST_PAYMENT_HISTORY_FAILED]: getAllListPaymentHistoryFailed,
  [Types.GET_LIST_PAYMENT_DETAIL]: getListPaymentDetail,
  [Types.GET_LIST_PAYMENT_DETAIL_SUCCESS]: getListPaymentDetailSuccess,
  [Types.GET_LIST_PAYMENT_DETAIL_FAILED]: getListPaymentDetailFailed,
  [Types.GET_REVENUES_BY_TIME]: getRevenuesByTime,
  [Types.GET_REVENUES_BY_TIME_SUCCESS]: getRevenuesByTimeSuccess,
  [Types.GET_REVENUES_BY_TIME_FAILED]: getRevenuesByTimeFailed,
  [Types.GET_REVENUES_BY_DATE]: getRevenuesByDate,
  [Types.GET_REVENUES_BY_DATE_SUCCESS]: getRevenuesByDateSuccess,
  [Types.GET_REVENUES_BY_DATE_FAILED]: getRevenuesByDateFailed,
  [Types.GET_LIST_YEAR]: getListYear,
  [Types.GET_LIST_YEAR_SUCCESS]: getListYearSuccess,
  [Types.GET_LIST_YEAR_FAILED]: getListYearFailed,
  [Types.GET_REVENUES_PRODUCT]: getRevenuesProduct,
  [Types.GET_REVENUES_PRODUCT_SUCCESS]: getRevenuesProductSuccess,
  [Types.GET_REVENUES_PRODUCT_FAILED]: getRevenuesProductFailed
};

// Create reducers by pass state and handlers
export const revenuesReducer = createReducer(INITIAL_STATE, HANDLERS);
