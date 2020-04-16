// import libs
import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import {
  formatTypeDevice,
  formatPreservationType,
  formatValueStatus,
  formatValuesStatus
} from 'utils/helpers';
// Define action creators
export const { Types, Creators } = createActions({
  getListDevices: ['params'],
  getListDevicesSuccess: null,
  getListDevicesFailed: null,
  getDeviceDetail: ['params'],
  getDeviceDetailSuccess: null,
  getDeviceDetailFailed: null,
  updateDevice: ['id', 'body'],
  updateDeviceSuccess: null,
  updateDeviceFailed: null
});

// Initial state
export const INITIAL_STATE = Immutable({
  isProcessing: false,
  error: ''
});

const getListDevices = (state, action) => {
  return state.merge({
    type: action.type,
    isProcessing: true
  });
};

const getListDevicesSuccess = (state, action) => {
  const { data } = action;
  const dataDevice =
    data &&
    data.devices.map((item, index) => ({
      rowId: `${data.totalRows - data.currentPage * action.pageSize - index}`,
      id: item.id,
      model: formatTypeDevice(item && item.nameDivice),
      preservationType: formatPreservationType(item && item.type),
      code: item && item.codeDivice,
      temperature: `최저: ${
        item.temperatureMin ? item.temperatureMin : 0
      }ºC 최고: ${item.temperatureMax ? item.temperatureMax : 0}ºC`,
      status: formatValueStatus(item.state)
    }));

  return state.merge({
    listDevices: dataDevice,
    isProcessing: false,
    devicesInfo: {
      countAll: data.countAll && data.countAll.toLocaleString('en'),
      countInUse: data.countInUse && data.countInUse.toLocaleString('en'),
      countUsed: data.countUsed && data.countUsed.toLocaleString('en')
    },
    totalRows: data.totalRows
  });
};

const getListDevicesFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    error: action.error
  });
};

// Device Detail
const getDeviceDetail = (state, action) => {
  return state.merge({
    type: action.type,
    isProcessing: true
  });
};

const getDeviceDetailSuccess = (state, action) => {
  const { data } = action;
  const dataDevice = action.data.device;
  const dataDetail = {
    // nameDevice: data.device.deviceCode ,
    deviceCode: dataDevice && dataDevice.codeDivice && dataDevice.codeDivice,
    modelDevice: dataDevice && dataDevice.deviceType,
    statusDevice: dataDevice && dataDevice.frozenType,
    nameStore: dataDevice && dataDevice.nameStore,
    phone:
      dataDevice && dataDevice.phone && dataDevice.phone.replace(/-/gi, ''),
    address: dataDevice && dataDevice.address,
    layer: dataDevice && dataDevice.addressDetail,
    temperatureDown1: dataDevice && `${dataDevice.temperatureMin}ºC`,
    temperatureUp1: dataDevice && `${dataDevice.temperatureMax}ºC`,
    temperatureDown2: dataDevice && `${dataDevice.temperatureMinRight}ºC`,
    temperatureUp2: dataDevice && `${dataDevice.temperatureMaxRight}ºC`,
    temperatureDown3: dataDevice && `${dataDevice.setTemperatureMin}ºC`,
    temperatureUp3: dataDevice && `${dataDevice.setTemperatureMax}ºC`,
    temperatureDown4: dataDevice && `${dataDevice.setTemperatureMinRight}ºC`,
    temperatureUp4: dataDevice && `${dataDevice.setTemperatureMaxRight}ºC`,
    status: formatValuesStatus(dataDevice && dataDevice.deviceStatus),
    password: dataDevice && dataDevice.devicePassword,
    other: dataDevice && dataDevice.deviceMemo
  };

  const dataHistory =
    data &&
    data.maintainances.map((item, index) => ({
      rowId:
        action.data.totalRows -
        action.numberRows * (action.pageIndex - 1) -
        index,
      id: item.id,
      writer: item.writer,
      content: item.content,
      time: item.time
    }));
  return state.merge({
    deviceDetail: dataDetail,
    maintenances: data.maintainances && dataHistory,
    isProcessing: false,
    totalRows: data.totalRows
  });
};

const getDeviceDetailFailed = (state, action) => {
  return state.merge({
    isProcessing: false,
    error: action.error
  });
};

/*
Update Device
*/
const updateDevice = (state, action) => {
  return state.merge({
    type: action.type
  });
};
const updateDeviceSuccess = (state, action) => {
  return state.merge({
    type: action.type,
    error: action
  });
};
const updateDeviceFailed = (state, action) => {
  return state.merge({
    type: action.type
  });
};

// Assign handler to types.
const HANDLERS = {
  [Types.GET_LIST_DEVICES]: getListDevices,
  [Types.GET_LIST_DEVICES_SUCCESS]: getListDevicesSuccess,
  [Types.GET_LIST_DEVICES_FAILED]: getListDevicesFailed,
  [Types.GET_DEVICE_DETAIL]: getDeviceDetail,
  [Types.GET_DEVICE_DETAIL_SUCCESS]: getDeviceDetailSuccess,
  [Types.GET_DEVICE_DETAIL_FAILED]: getDeviceDetailFailed,
  [Types.UPDATE_DEVICE]: updateDevice,
  [Types.UPDATE_DEVICE_SUCCESS]: updateDeviceSuccess,
  [Types.UPDATE_DEVICE_FAILED]: updateDeviceFailed
};

// Create reducers by pass state and handlers
export const devicesReducer = createReducer(INITIAL_STATE, HANDLERS);
