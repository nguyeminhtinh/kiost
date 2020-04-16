import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as CommonCreator } from 'commons/redux';
import ProductRegister from '../components/productAdd';
import { Creators } from '../redux';

const mapStateToProps = state => {
  return {
    categories: state.merchandiseReducer.categories,
    isProcessing: state.merchandiseReducer.isProcessing,
    productName: state.merchandiseReducer.productName,
    productSelecting: state.merchandiseReducer.productSelecting,
    type: state.merchandiseReducer.type,
    userInfo: state.accountReducer.accountInfo,
    statusRepose: state.merchandiseReducer.statusRepose,
    products: state.merchandiseReducer.products,
    isOpenNotify: state.commonReducer.isOpenNotify
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...Creators,
      getCategories: Creators.getCategories,
      getProductCodeByCategory: Creators.getProductCodeByCategory,
      getProductSelecting: Creators.getProductSelecting,
      registerProduct: Creators.registerProduct,
      notifyAccountDenied: CommonCreator.notifyAccountDenied
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductRegister);
