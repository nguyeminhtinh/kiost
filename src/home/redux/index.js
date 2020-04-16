// import libs
import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import moment from 'moment';
import { formatNegativeDay } from 'utils/helpers';
// Define action creators
export const { Types, Creators } = createActions({
  getRevenues: ['pageIndex'],
  getRevenuesSuccess: null,
  getRevenuesFailed: null,
  handleClickMenu: ['itemClicking']
});

// Initial state
export const INITIAL_STATE = Immutable({
  isProcessing: false,
  error: ''
});

const getRevenues = state => {
  return state.merge({
    isProcessing: true
  });
};

const getRevenuesSuccess = (state, action) => {
  const { data } = action;
  const topRevenuesTime =
    data &&
    data.currents &&
    data.currents.map((item, index) => ({
      id: index,
      value: item.value,
      label: item.title
    }));
  const days = moment(new Date()).get('date');
  const topRevenuesDay = [];
  // eslint-disable-next-line no-plusplus
  for (let index = days - 6; index <= days; index++) {
    // eslint-disable-next-line no-unused-expressions
    data &&
      data.revenuesDays &&
      // eslint-disable-next-line no-loop-func
      data.revenuesDays.forEach(item => {
        if (
          parseInt(item.day, 10) === formatNegativeDay(index) ||
          parseInt(item.day, 10) === index
        ) {
          topRevenuesDay.push({
            id: index,
            value: item.totalMoney,
            label: `${parseInt(item.day, 10)}일`
          });
        }
      });

    if (!topRevenuesDay[index - (days - 6)]) {
      topRevenuesDay.push({
        id: index,
        value: 0,
        label: `${index <= 0 ? formatNegativeDay(index) : index}일`
      });
    }
  }
  const topProducts =
    data &&
    data.topTen &&
    data.topTen.map((item, index) => ({
      id: index,
      value: item.no,
      label: item.productName
    }));
  const dataExpiration =
    data &&
    data.table &&
    data.table.map((item, index) => {
      const statusDay =
        item.expirationDate && parseInt(item.expirationDate, 10);
      let dateD = '';
      switch (statusDay) {
        case -1:
          dateD = 1;
          break;
        case 1:
          dateD = 2;
          break;
        case 2:
          dateD = 3;
          break;
        case 3:
          dateD = 4;
          break;
        default:
          dateD = '';
          break;
      }
      return {
        id: index + 1,
        companyName: item.companyName,
        productName: item.productName,
        deviceCode: item.deviceCode,
        slot: `${item.slotY + 1}층 ${item.slotX + 1}열`,
        status: dateD
      };
    });
  return state.merge({
    data: action.data,
    isProcessing: false,
    topRevenuesTime,
    topRevenuesDay,
    topProducts,
    dataExpiration,
    totalRows: data.totalRows
  });
};

const getRevenuesFailed = (state, action) => {
  return state.merge({
    error: action.error,
    isProcessing: false
  });
};

const handleClickMenu = (state, action) => {
  return state.merge({
    activeItem: action.itemClicking
  });
};

// Assign handler to types.
const HANDLERS = {
  [Types.GET_REVENUES]: getRevenues,
  [Types.GET_REVENUES_SUCCESS]: getRevenuesSuccess,
  [Types.GET_REVENUES_FAILED]: getRevenuesFailed,
  [Types.HANDLE_CLICK_MENU]: handleClickMenu
};

// Create reducers by pass state and handlers
export const homeReducer = createReducer(INITIAL_STATE, HANDLERS);
