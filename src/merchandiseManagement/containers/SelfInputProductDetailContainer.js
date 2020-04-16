import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as CommonCreator } from 'commons/redux';
import SelfProductDetail from '../components/selfInputProduct/selfProductDetail';

import { Creators } from '../redux';

const mapStateToProps = state => {
  return {
    isProcessing: state.merchandiseReducer.isProcessing,
    isProcessingDetail: state.merchandiseReducer.isProcessingDetail,
    type: state.merchandiseReducer.type,
    imageList: state.merchandiseReducer.imageList,
    errorMess: state.merchandiseReducer.errorMess,
    selfProductDetail: state.merchandiseReducer.selfProductDetail,
    imageListAuthor: state.merchandiseReducer.imageListAuthor,
    isOpenNotify: state.commonReducer.isOpenNotify,
    dataImage: state.merchandiseReducer.dataImage
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...Creators,
      updateSelfProductDetail: Creators.updateSelfProductDetail,
      getImageCategory: Creators.getImageCategory,
      getAPISelfProductDetail: Creators.getAPISelfProductDetail,
      getImageCategoryAuthor: Creators.getImageCategoryAuthor,
      notifyAccountDenied: CommonCreator.notifyAccountDenied
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelfProductDetail);
