import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as CommonCreator } from 'commons/redux';
import DevicesDetail from '../components/form';
import { Creators } from '../redux';

const mapStateToProps = state => {
  return {
    isProcessing: state.devicesReducer.isProcessing,
    deviceDetail: state.devicesReducer.deviceDetail,
    maintenances: state.devicesReducer.maintenances,
    type: state.devicesReducer.type,
    totalRows: state.devicesReducer.totalRows,
    isOpenNotify: state.commonReducer.isOpenNotify
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...Creators,
      getDeviceDetail: Creators.getDeviceDetail,
      updateDevice: Creators.updateDevice,
      notifyAccountDenied: CommonCreator.notifyAccountDenied
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DevicesDetail);
