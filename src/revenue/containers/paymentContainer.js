import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as CommonCreator } from 'commons/redux';
import HistoryPayment from '../components/payment';
import { Creators } from '../redux';

const mapStateToProps = state => {
  return {
    listPayment: state.revenuesReducer.listPayment,
    isProcessing: state.revenuesReducer.isProcessing,
    isOpenModal: state.revenuesReducer.isOpenModal,
    totalRows: state.revenuesReducer.totalRows,
    listPaymentDetail: state.revenuesReducer.listPaymentDetail,
    isOpenNotify: state.commonReducer.isOpenNotify,
    listAllPayment: state.revenuesReducer.listAllPayment
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...Creators,
      openModal: Creators.openModal,
      closeModal: Creators.closeModal,
      getListPaymentDetail: Creators.getListPaymentDetail,
      notifyAccountDenied: CommonCreator.notifyAccountDenied,
      getAllListPaymentHistory: Creators.getAllListPaymentHistory
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HistoryPayment);
