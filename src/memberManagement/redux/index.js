// import libs
import { createActions, createReducer } from 'reduxsauce';
import moment from 'moment';
import Immutable from 'seamless-immutable';
// import { formatValue } from '../../utils/Validators';

// Define action creators
export const { Types, Creators } = createActions({
  getListMembers: ['params'],
  getListMembersSuccess: null,
  getListMembersFailed: null,
  getMemberDetail: ['params'],
  getMemberDetailSuccess: null,
  getMemberDetailFailed: null
});

// Initial state
export const INITIAL_STATE = Immutable({
  isProcessing: false,
  error: '',
  listMembers: []
});

const getListMembers = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type
  });
};

const getListMembersSuccess = (state, action) => {
  const { totalCustomer, userPoints, totalRows } = action.data;
  const dataTable =
    userPoints &&
    userPoints.map((item, index) => ({
      id: `${totalRows - action.currentPage * action.pageSize - index}` || '',
      phone: item && item.userPhone ? item.userPhone : '',
      // nameProduct: item && item.productName ? item.productName : '',
      // deviceCode: item && item.deviceCode ? item.deviceCode : '',
      payment:
        item && item.totalpricePayUser
          ? item.totalpricePayUser.toLocaleString('en')
          : '',
      reserves:
        item && item.totalPointUser
          ? item.totalPointUser.toLocaleString('en')
          : '',
      time: item && item.createdAt ? item.createdAt : ''
    }));

  return state.merge({
    isProcessing: false,
    listMembers: dataTable,
    totalCustomer: totalCustomer ? totalCustomer.toLocaleString('en') : 0,
    totalRows
  });
};

const getListMembersFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    error: action.error
  });
};

const getMemberDetail = (state, action) => {
  return state.merge({
    isProcessing: true,
    type: action.type
  });
};
const getMemberDetailSuccess = (state, action) => {
  const { inventories, customerPoit } = action.data;
  const dataTableFormat =
    inventories &&
    inventories.map((item, index) => ({
      id:
        `${action.data.totalRows - action.data.currentPage * 10 - index}` || '',
      nameProduct: item.name,
      deviceCode: item.deviceCode ? item.deviceCode : '',
      payment: item.amount && item.amount.toLocaleString('en'),
      reverses: item.point && item.point.toLocaleString('en'),
      time: moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss')
    }));
  return state.merge({
    isProcessing: false,
    type: action.type,
    dataMemberInfo: dataTableFormat,
    totalRows: action.data.totalRows,
    customerPoit: (customerPoit && customerPoit.toLocaleString('en')) || 0
  });
};
const getMemberDetailFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    type: action.type
  });
};

// Assign handler to types.
const HANDLERS = {
  [Types.GET_LIST_MEMBERS]: getListMembers,
  [Types.GET_LIST_MEMBERS_SUCCESS]: getListMembersSuccess,
  [Types.GET_LIST_MEMBERS_FAILED]: getListMembersFailed,
  [Types.GET_MEMBER_DETAIL]: getMemberDetail,
  [Types.GET_MEMBER_DETAIL_SUCCESS]: getMemberDetailSuccess,
  [Types.GET_MEMBER_DETAIL_FAILED]: getMemberDetailFailed
};

// Create reducers by pass state and handlers
export const membersReducer = createReducer(INITIAL_STATE, HANDLERS);
