import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as storeCreator } from 'storeManagement/redux';
import { Creators as MerchandiseCreator } from 'merchandiseManagement/redux';
import { Creators as CommonCreator } from 'commons/redux';
// eslint-disable-next-line import/no-duplicates
import { Creators } from '../redux';
import MemberManagement from '../components';

const mapStateToProps = state => {
  return {
    addressOptions: state.storesReducer.addressOptions,
    listMembers: state.membersReducer.listMembers,
    isProcessing: state.membersReducer.isProcessing,
    deviceCodes: state.merchandiseReducer.deviceCodes,
    totalCustomer: state.membersReducer.totalCustomer,
    totalRows: state.membersReducer.totalRows,
    isOpenNotify: state.commonReducer.isOpenNotify
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...Creators,
      getListMembers: Creators.getListMembers,
      getAddressOptions: storeCreator.getAddressOptions,
      getDeviceCode: MerchandiseCreator.getDeviceCode,
      notifyAccountDenied: CommonCreator.notifyAccountDenied
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MemberManagement);
