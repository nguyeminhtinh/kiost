import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as MerchandiseCreator } from 'merchandiseManagement/redux';
import { Creators as CommonCreator } from 'commons/redux';
import Devices from '../components/Device';

import { Creators } from '../redux';

const mapStateToProps = state => {
  return {
    listDevices: state.devicesReducer.listDevices,
    isProcessing: state.devicesReducer.isProcessing,
    deviceCodes: state.merchandiseReducer.deviceCodes,
    totalRows: state.devicesReducer.totalRows,
    devicesInfo: state.devicesReducer.devicesInfo,
    isOpenNotify: state.commonReducer.isOpenNotify
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...Creators,
      getDeviceCode: MerchandiseCreator.getDeviceCode,
      notifyAccountDenied: CommonCreator.notifyAccountDenied
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Devices);
