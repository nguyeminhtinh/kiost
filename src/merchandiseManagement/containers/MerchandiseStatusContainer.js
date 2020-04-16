import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as CommonCreator } from 'commons/redux';
import EditProduct from '../components/productDetail';
import { Creators } from '../redux';

const mapStateToProps = state => {
  return {
    merchandiseDetail: state.merchandiseReducer.merchandiseDetail,
    isProcessing: state.merchandiseReducer.isProcessing,
    type: state.merchandiseReducer.type,
    statusDetail: state.merchandiseReducer.statusDetail,
    statusRepose: state.merchandiseReducer.statusRepose,
    isOpenNotify: state.commonReducer.isOpenNotify
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...Creators,
      getMerchandiseDetail: Creators.getMerchandiseDetail,
      deleteProduct: Creators.deleteProduct,
      updateProduct: Creators.updateProduct,
      notifyAccountDenied: CommonCreator.notifyAccountDenied
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProduct);
