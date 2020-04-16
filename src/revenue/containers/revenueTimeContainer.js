import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as MerchandiseManagementCreator } from 'merchandiseManagement/redux';
import { Creators as CommonCreator } from 'commons/redux';
import { Creators } from '../redux';
import RevenueTime from '../components/revenueTime';

const mapStateToProps = state => {
  return {
    userInfo: state.accountReducer.userInfo,
    type: state.revenuesReducer.type,
    isProcessing: state.revenuesReducer.isProcessing,
    deviceCodes: state.merchandiseReducer.deviceCodes,
    revenuesData: state.revenuesReducer.revenuesData,
    dataTable: state.revenuesReducer.dataTable,
    isOpenNotify: state.commonReducer.isOpenNotify
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...Creators,
      getRevenuesByTime: Creators.getRevenuesByTime,
      getDeviceCode: MerchandiseManagementCreator.getDeviceCode,
      notifyAccountDenied: CommonCreator.notifyAccountDenied
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RevenueTime);
