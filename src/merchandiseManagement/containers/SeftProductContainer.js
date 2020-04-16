import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as CommonCreator } from 'commons/redux';
import SeftProduct from '../components/selfInputProduct';

import { Creators } from '../redux';

const mapStateToProps = state => {
  return {
    isProcessing: state.merchandiseReducer.isProcessing,
    type: state.merchandiseReducer.type,
    categories: state.merchandiseReducer.categories,
    deviceCodes: state.merchandiseReducer.deviceCodes,
    dataMerchandiseManual: state.merchandiseReducer.dataMerchandiseManual,
    totalRows: state.merchandiseReducer.totalRows,
    isOpenNotify: state.commonReducer.isOpenNotify
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...Creators,
      getImageCategory: Creators.getImageCategory,
      getCategories: Creators.getCategories,
      getDeviceCode: Creators.getDeviceCode,
      getMerchandiseManual: Creators.getMerchandiseManual,
      notifyAccountDenied: CommonCreator.notifyAccountDenied
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SeftProduct);
