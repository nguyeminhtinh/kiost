import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as MerchandiseCreator } from 'merchandiseManagement/redux';
import { Creators as CommonCreator } from 'commons/redux';
import Inventory from '../components';

import { Creators } from '../redux';

const mapStateToProps = state => {
  return {
    isProcessing: state.inventoryReducer.isProcessing,
    inventoryList: state.inventoryReducer.inventoryList,
    totalRows: state.inventoryReducer.totalRows,
    deviceCodes: state.merchandiseReducer.deviceCodes,
    isOpenNotify: state.commonReducer.isOpenNotify
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...Creators,
      getInventoryList: Creators.getInventoryList,
      getDeviceCode: MerchandiseCreator.getDeviceCode,
      notifyAccountDenied: CommonCreator.notifyAccountDenied
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Inventory);
