import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as CommonCreator } from 'commons/redux';
import MerchandiseManagement from '../components';
import { Creators } from '../redux';

const mapStateToProps = state => {
  return {
    productList: state.merchandiseReducer.productList,
    statusProducts: state.merchandiseReducer.statusProducts,
    totalRows: state.merchandiseReducer.totalRows,
    categories: state.merchandiseReducer.categories,
    deviceCodes: state.merchandiseReducer.deviceCodes,
    isProcessing: state.merchandiseReducer.isProcessing,
    isOpenNotify: state.commonReducer.isOpenNotify
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...Creators,
      getMerchandise: Creators.getMerchandise,
      getMerchandiseDetail: Creators.getMerchandiseDetail,
      getCategories: Creators.getCategories,
      getDeviceCode: Creators.getDeviceCode,
      getCheckExpiresProduct: Creators.getCheckExpiresProduct,
      notifyAccountDenied: CommonCreator.notifyAccountDenied
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MerchandiseManagement);
