import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as CommonCreator } from 'commons/redux';
import InventoryDetail from '../components/inventoryDetail';

import { Creators } from '../redux';

const mapStateToProps = state => {
  return {
    isProcessing: state.inventoryReducer.isProcessing,
    inventoryListDetail: state.inventoryReducer.inventoryListDetail,
    inventoryProductDetail: state.inventoryReducer.inventoryProductDetail,
    isOpenNotify: state.commonReducer.isOpenNotify
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...Creators,
      getInventoryListDetail: Creators.getInventoryListDetail,
      getInventoryProductDetail: Creators.getInventoryProductDetail,
      notifyAccountDenied: CommonCreator.notifyAccountDenied
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InventoryDetail);
