import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as CommonCreator } from 'commons/redux';
import RegisterProduct from '../components/selfInputProduct/RegisterSeftProduct';

import { Creators } from '../redux';

const mapStateToProps = state => {
  return {
    isProcessing: state.merchandiseReducer.isProcessing,
    type: state.merchandiseReducer.type,
    imageList: state.merchandiseReducer.imageList,
    imageListAuthor: state.merchandiseReducer.imageListAuthor,
    errorMess: state.merchandiseReducer.errorMess,
    isOpenNotify: state.commonReducer.isOpenNotify,
    dataImage: state.merchandiseReducer.dataImage
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...Creators,
      addProductSeft: Creators.addProductSeft,
      getImageCategory: Creators.getImageCategory,
      getImageCategoryAuthor: Creators.getImageCategoryAuthor,
      notifyAccountDenied: CommonCreator.notifyAccountDenied
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterProduct);
